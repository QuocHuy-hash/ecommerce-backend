'use strict';
const { Model, DataTypes, ARRAY } = require('sequelize');

module.exports = (sequelize) => {
    class Inventory extends Model {
        static associate(models) {

        }
    }
    Inventory.init({
        inven_product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Products', // Tham chiếu đến model 'Products'
                key: 'id', // Tham chiếu đến trường 'id' của model 'Products'
            },
        },
        inven_location: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'unKnow'
        },
        inven_location: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'unKnow'
        },
        inven_stock: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        inven_shopId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Shops', // Tham chiếu đến model 'Shops'
                key: 'id', // Tham chiếu đến trường 'id' của model 'Shops'
            },
        },
        inven_temporary_order: {
            type: DataTypes.JSON,
            defaultValue: []
        },

    }, {
        sequelize,
        modelName: 'Inventory',
    });

    return Inventory;
};
