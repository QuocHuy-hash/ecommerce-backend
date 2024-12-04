'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require('../config/config.json')
const db = {};

const sslOptions = {
  ssl: {
    ca: fs.readFileSync(path.join(__dirname, '../ssl/ca.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../ssl/client-cert.pem')),
    key: fs.readFileSync(path.join(__dirname, '../ssl/client-key.pem')),
  }
};

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password, {
  host: config.development.host,
  port: config.development.port,
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 10, // Số kết nối tối đa trong pool
    min: 0,  // Số kết nối tối thiểu trong pool
    acquire: 30000, // Thời gian tối đa để kết nối được lấy ra (30 giây)
    idle: 10000 // Thời gian tối đa một kết nối có thể ở trạng thái không hoạt động trước khi được loại bỏ từ pool (10 giây)
  },
  dialectOptions: sslOptions
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
