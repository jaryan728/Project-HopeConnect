const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const volunteers = sequelize.define(
    'volunteers',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      skills: {
        type: DataTypes.TEXT,
      },

      availability: {
        type: DataTypes.TEXT,
      },

      preferred_method: {
        type: DataTypes.ENUM,

        values: ['online', 'offline'],
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  volunteers.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.volunteers.belongsTo(db.users, {
      as: 'user',
      foreignKey: {
        name: 'userId',
      },
      constraints: false,
    });

    db.volunteers.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.volunteers.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return volunteers;
};
