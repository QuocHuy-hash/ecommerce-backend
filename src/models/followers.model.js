
const { Model, DataTypes, ARRAY } = require('sequelize');

module.exports = (sequelize) => {
    class Followers extends Model {
        static associate(models) {
            this.belongsTo(models.Shops, { foreignKey: 'shopId', as: 'shops' });
        }
    }
    Followers.init({
        userId: { type: DataTypes.INTEGER },
        shopId: { type: DataTypes.INTEGER },
        actions:{ 
            type: DataTypes.STRING ,
            defaultValue: 'view',
            validate: {
                isIn: [['comment', 'like', 'view' , 'buy' ]], 
            },
        },
        actions_count: { type: DataTypes.INTEGER , defaultValue: 0},
    }, {
        sequelize,
        modelName: 'Followers',
    });

    return Followers;
};

