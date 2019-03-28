const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize');

const ObjectModel = sequelize.define('object', {
    objectId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    appId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    objectKey: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
    },
    objectType: {
        type: Sequelize.STRING(100),
    },
    objectName:  {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    objectSize: {
        type: Sequelize.INTEGER,
    },
    hash: {
        type: Sequelize.STRING(32),
        allowNull: false
    },
    // 状态：1: 有效，0:已删除
    status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    createTime: {
        type: Sequelize.BIGINT(20),
        allowNull: false
    },
    updateTime: {
        type: Sequelize.BIGINT(20),
    }
});

module.exports = ObjectModel;
