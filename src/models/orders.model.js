'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Order extends Model {
        static associate(models) {
            Order.hasMany(models.OrdersDetails, { foreignKey: 'order_id', as: 'orderDetails' });

        }
    }

    Order.init({
        order_userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        order_shopId: {
            type: DataTypes.INTEGER,
        },
        order_total_price: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        order_total_discount: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        order_freeShip: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        order_ship_street: {
            type: DataTypes.STRING,
            allowNull: false
        },
        order_ship_wards: {
            type: DataTypes.STRING,
            allowNull: false
        },
        order_ship_district: {
            type: DataTypes.STRING,
            allowNull: false
        },
        order_ship_city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        order_ship_country: {
            type: DataTypes.STRING,
            allowNull: false
        },
        order_payment: {
            type: DataTypes.STRING,
            defaultValue: 'afterReceiver',
        },
        order_tracking_number: {
            type: DataTypes.STRING,
            defaultValue: '',
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'pendding',
            validate: {
                isIn: [['pendding', 'confirm', 'shipping', 'successed', 'canceled',]],
            },
        },

    }, {
        sequelize,
        modelName: 'Order',
    });

    return Order;
};
