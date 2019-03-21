const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize');

const ApplicationModel = sequelize.define('application', {
    appId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    appKey: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
    },
    appName: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
    },
    appSecret: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    appInfo: {
        type: Sequelize.STRING(100)
    },
    createTime: {
        type: Sequelize.BIGINT(20),
        allowNull: false
    },
    updateTime: {
        type: Sequelize.BIGINT(20),
    }
});

module.exports = ApplicationModel;
