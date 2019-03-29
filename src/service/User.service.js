const UserModel = require('../model/User.model');
const CONF = require('../../config');
const log = require('../utils/log');



class UserService {
    // 检查账户和秘码对
    async checkAccountPassword(account, password) {
        return await UserModel.findOne({
            where: {
                account: account,
                password: password
            }
        }).catch(err => {
            log(err);
            return null;
        });
    }
}

module.exports = new UserService();
