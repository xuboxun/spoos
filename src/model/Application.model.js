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
    // 应用状态：1: 已生效，0:已删除
    status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    createTime: {
        type: Sequelize.BIGINT(20),
        allowNull: false
    },
    updateTime: {
        type: Sequelize.BIGINT(20),
    }
}, {
    freezeTableName: true,
    tableName: 'application',
    timestamps: false
});

module.exports = ApplicationModel;
