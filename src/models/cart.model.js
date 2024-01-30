'use strict';
const { Model, DataTypes, ARRAY } = require('sequelize');

module.exports = (sequelize) => {
    class Cart extends Model {
        static associate(models) {
            Cart.hasMany(models.CartDetails, { foreignKey: 'cart_id', as: 'cartDetails' });
        }
    }
    Cart.init({
        cart_state: {
            type: DataTypes.STRING,
            defaultValue: 'active',
            validate: {
                isIn: [['completed', 'active', 'failed', 'pending']], // Giới hạn giá trị chỉ được là 'inactive' hoặc 'active'
            },
        },
        cart_count_prod: {
            type: DataTypes.NUMBER,
        },
        cart_user_id: {
            type: DataTypes.NUMBER,
            allowNull: false,
        }

    }, {
        sequelize,
        modelName: 'Cart',
    });

    return Cart;
};
