const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize');

const UserModel = sequelize.define('user', {
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    account: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING(100),
        allowNull: false,
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
    tableName: 'user',
    timestamps: false
});

module.exports = UserModel;
