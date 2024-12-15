const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class ReportsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const reports = await db.reports.create(
      {
        id: data.id || undefined,

        description: data.description || null,
        location: data.location || null,
        status: data.status || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await reports.setUser(data.user || null, {
      transaction,
    });

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.reports.getTableName(),
        belongsToColumn: 'image_url',
        belongsToId: reports.id,
      },
      data.image_url,
      options,
    );

    return reports;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const reportsData = data.map((item, index) => ({
      id: item.id || undefined,

      description: item.description || null,
      location: item.location || null,
      status: item.status || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const reports = await db.reports.bulkCreate(reportsData, { transaction });

    // For each item created, replace relation files

    for (let i = 0; i < reports.length; i++) {
      await FileDBApi.replaceRelationFiles(
        {
          belongsTo: db.reports.getTableName(),
          belongsToColumn: 'image_url',
          belongsToId: reports[i].id,
        },
        data[i].image_url,
        options,
      );
    }

    return reports;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const reports = await db.reports.findByPk(id, {}, { transaction });

    await reports.update(
      {
        description: data.description || null,
        location: data.location || null,
        status: data.status || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await reports.setUser(data.user || null, {
      transaction,
    });

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.reports.getTableName(),
        belongsToColumn: 'image_url',
        belongsToId: reports.id,
      },
      data.image_url,
      options,
    );

    return reports;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const reports = await db.reports.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of reports) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of reports) {
        await record.destroy({ transaction });
      }
    });

    return reports;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const reports = await db.reports.findByPk(id, options);

    await reports.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await reports.destroy({
      transaction,
    });

    return reports;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const reports = await db.reports.findOne({ where }, { transaction });

    if (!reports) {
      return reports;
    }

    const output = reports.get({ plain: true });

    output.image_url = await reports.getImage_url({
      transaction,
    });

    output.user = await reports.getUser({
      transaction,
    });

    return output;
  }

  static async findAll(filter, options) {
    const limit = filter.limit || 0;
    let offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    const orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.users,
        as: 'user',
      },

      {
        model: db.file,
        as: 'image_url',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('reports', 'description', filter.description),
        };
      }

      if (filter.location) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('reports', 'location', filter.location),
        };
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.status) {
        where = {
          ...where,
          status: filter.status,
        };
      }

      if (filter.user) {
        const listItems = filter.user.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          userId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.reports.count({
            where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.reports.findAndCountAll({
          where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('reports', 'description', query),
        ],
      };
    }

    const records = await db.reports.findAll({
      attributes: ['id', 'description'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['description', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.description,
    }));
  }
};
