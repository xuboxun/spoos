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
    objectMeta: {
        type: Sequelize.STRING(200)
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
