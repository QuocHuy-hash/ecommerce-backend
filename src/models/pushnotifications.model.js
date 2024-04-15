'use strict';
const { Model, DataTypes, ARRAY } = require('sequelize');

module.exports = (sequelize) => {
    class Pushnotification extends Model {
        static associate(models) {

        }
    }
    Pushnotification.init({
        noti_type: { type: DataTypes.STRING },
        noti_senderId: { type: DataTypes.INTEGER },
        noti_receivedId: { type: DataTypes.INTEGER, defaultValue: 0 },
        noti_content: { type: DataTypes.STRING },
        noti_product_name: { type: DataTypes.STRING },
        noti_shop_name: { type: DataTypes.STRING },
        status: { type: DataTypes.STRING, defaultValue: "" }
    }, {
        sequelize,
        modelName: 'Pushnotification',
    });

    return Pushnotification;
};

