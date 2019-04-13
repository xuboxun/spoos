const CONF = require('../config');
const app = require('../src/app');
const sequelize = require('../src/utils/sequelize');

const appPort = CONF.appPort || 9981;

function startApp() {
    app.listen(appPort, () => {
        console.log(`app started in port ${appPort}`);
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
