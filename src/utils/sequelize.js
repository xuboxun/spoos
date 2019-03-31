const Sequelize = require('sequelize');
const CONF = require('../../config');

const sequelize = new Sequelize(CONF.dbName, CONF.dbUsername, CONF.dbPassword, {
    host: CONF.dbHost || '127.0.0.1',
    port: CONF.dbPort || 3306,
    dialect: 'mysql'
});

module.exports = sequelize;
