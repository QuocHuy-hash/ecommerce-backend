'use strict';

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const ApiKeyModel = sequelize.define('ApiKeyModel', {
        key: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        permissions: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['0000', '1111', '2222']],
            },
        },
    }, {
        sequelize,
        tableName: 'apiKeys',
    });

    return ApiKeyModel;
};
