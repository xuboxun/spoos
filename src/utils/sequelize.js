const Sequelize = require('sequelize');
const CONF = require('../../config');

const sequelize = new Sequelize(CONF.db_name, CONF.db_username, CONF.db_password, {
    host: CONF.db_host,
    port: CONF.db_port,
    dialect: CONF.db_type
});

module.exports = sequelize;
