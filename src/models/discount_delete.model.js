'use strict';
const { Model, DataTypes, ARRAY } = require('sequelize');

module.exports = (sequelize) => {
    class Discount_Delete extends Model {
        static associate(models) {
            Discount_Delete.belongsTo(models.Products, { foreignKey: 'discount_product_id', as: 'product' });
            Discount_Delete.belongsTo(models.Shops, { foreignKey: 'discount_shopId', as: 'shop' });
        }
    }
    Discount_Delete.init({
        discount_name: { type: DataTypes.STRING, allowNull: false },
        discount_shopId: { type: DataTypes.INTEGER, allowNull: false },
        discount_description: { type: DataTypes.STRING, allowNull: false },
        discount_type: { type: DataTypes.STRING, allowNull: false }, // or percentage
        discount_value: { type: DataTypes.NUMBER, allowNull: false }, //10.000 , 10
        discount_code: { type: DataTypes.STRING, allowNull: false }, //discount code
        discount_start_date: { type: DataTypes.DATE, allowNull: false }, //start date can be use discount
        discount_end_date: { type: DataTypes.DATE, allowNull: false }, //end date can be use discount
        discount_max_uses: { type: DataTypes.NUMBER }, // Number discount can be use 
        discount_use_count: { type: DataTypes.NUMBER }, // Discount number used  
        discount_users_used: { type: DataTypes.JSON, defaultValue: [] }, // who used discount
        discount_max_uses_per_user: { type: DataTypes.NUMBER, allowNull: false }, //alows maximum use
        discount_min_order_value: { type: DataTypes.NUMBER, allowNull: false },//alows maximum use
        discount_max_value: { type: DataTypes.NUMBER, allowNull: false },//alows maximum use
        discount_is_active: { type: DataTypes.BOOLEAN, defaultValue: false },
        discount_product_id: {
            type: DataTypes.JSON,
            allowNull: false,
            // references: {
            //     model: 'Products',
            //     key: 'id',
            // },
        },
    }, {
        sequelize,
        modelName: 'Discount_Delete',
    });

    return Discount_Delete;
};
