'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class OrdersDetails extends Model {
        static associate(models) {
            OrdersDetails.belongsTo(models.Order, { foreignKey: 'order_id', onDelete: 'CASCADE', as: 'order'});
            OrdersDetails.belongsTo(models.Products, { foreignKey: 'product_id', onDelete: 'CASCADE', as: 'products' });

            // Bổ sung các mối quan hệ với các bảng khác ở đây nếu cần thiết
        }
    }

    OrdersDetails.init({
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Order',
                key: 'id',
            },
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Products',
                key: 'id',
            },
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'OrdersDetails'
    });

    return OrdersDetails;
};
