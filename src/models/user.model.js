'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Users extends Model {
        static associate(models) {

        }
    }

    Users.init({
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'inactive',
            validate: {
                isIn: [['inactive', 'active']], 
            },
        },
        verify: {
            type: DataTypes.BOOLEAN,
        }
    }, {
        sequelize,
        modelName: 'Users',
    });

    return Users;
};


