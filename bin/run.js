const CONF = require('../config');
const app = require('../src/app');
const sequelize = require('../src/utils/sequelize');

function startApp() {
    app.listen(CONF.app_port, () => {
        console.log(`app started in port ${CONF.app_port}`);
    });
}


// 测试数据库连接
sequelize
    .authenticate()
    .then(() => {
        console.info('Connection has been established successfully.');
        startApp();
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
