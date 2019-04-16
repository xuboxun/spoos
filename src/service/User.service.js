const CONF = require('../../config');
const log = require('../utils/log');

class UserService {
    // 检查账户和秘码对
    checkAccountPassword(account, md5Password) {
        const { appUserName, appUserPassword } = CONF;
        if (
            appUserName === account &&
            appUserPassword === md5Password
        ) {
            return {
                account: appUserName
            };
        } else {
            return null;
        }
    }
}

module.exports = new UserService();
