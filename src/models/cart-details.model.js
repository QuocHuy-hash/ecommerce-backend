'use strict';
const { Model, DataTypes, ARRAY } = require('sequelize');

module.exports = (sequelize) => {
    class CartDetails extends Model {
        static associate(models) {
            CartDetails.belongsTo(models.Cart, { foreignKey: 'cart_id', as: 'carts' });
            CartDetails.belongsTo(models.Products, { foreignKey: 'product_id', as: 'products' });
        }
    }
    CartDetails.init({
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cart_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        total: {
            type: DataTypes.NUMBER,
            allowNull: false,
        }

    }, {
        sequelize,
        modelName: 'CartDetails',
    });

    return CartDetails;
};
