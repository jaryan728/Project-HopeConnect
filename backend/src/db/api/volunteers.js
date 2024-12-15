const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class VolunteersDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const volunteers = await db.volunteers.create(
      {
        id: data.id || undefined,

        skills: data.skills || null,
        availability: data.availability || null,
        preferred_method: data.preferred_method || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await volunteers.setUser(data.user || null, {
      transaction,
    });

    return volunteers;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const volunteersData = data.map((item, index) => ({
      id: item.id || undefined,

      skills: item.skills || null,
      availability: item.availability || null,
      preferred_method: item.preferred_method || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const volunteers = await db.volunteers.bulkCreate(volunteersData, {
      transaction,
    });

    // For each item created, replace relation files

    return volunteers;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const volunteers = await db.volunteers.findByPk(id, {}, { transaction });

    await volunteers.update(
      {
        skills: data.skills || null,
        availability: data.availability || null,
        preferred_method: data.preferred_method || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await volunteers.setUser(data.user || null, {
      transaction,
    });

    return volunteers;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const volunteers = await db.volunteers.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of volunteers) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of volunteers) {
        await record.destroy({ transaction });
      }
    });

    return volunteers;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const volunteers = await db.volunteers.findByPk(id, options);

    await volunteers.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await volunteers.destroy({
      transaction,
    });

    return volunteers;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const volunteers = await db.volunteers.findOne({ where }, { transaction });

    if (!volunteers) {
      return volunteers;
    }

    const output = volunteers.get({ plain: true });

    output.user = await volunteers.getUser({
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
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.skills) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('volunteers', 'skills', filter.skills),
        };
      }

      if (filter.availability) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'volunteers',
            'availability',
            filter.availability,
          ),
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

      if (filter.preferred_method) {
        where = {
          ...where,
          preferred_method: filter.preferred_method,
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
          count: await db.volunteers.count({
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
      : await db.volunteers.findAndCountAll({
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
          Utils.ilike('volunteers', 'skills', query),
        ],
      };
    }

    const records = await db.volunteers.findAll({
      attributes: ['id', 'skills'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['skills', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.skills,
    }));
  }
};
