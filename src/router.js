const Router = require('koa-router');
const ApplicationController = require('./controller/application');
const AuthController = require('./controller/auth');
const ObjectController = require('./controller/object');

const router = new Router();

router.get('/api/auth', AuthController.auth);
router.post('/api/login', AuthController.login);
router.get('/api/logout', AuthController.logout);

/**
 * 私有接口, 需要auth校验
 * appId应用于私有
 * */
router.get('/api/application/checkName', ApplicationController.checkName);
router.get('/api/application/list', ApplicationController.list);
router.get('/api/application/detail/:appId', ApplicationController.detail);
router.get('/api/application/objects/:appId', ApplicationController.listObjects);
router.post('/api/application/create', ApplicationController.create);
router.delete('/api/application/:appId', ApplicationController.delete);

router.get('/api/object/list', ObjectController.listAll);


/**
 * 开放接口
 * appKey应用于对外
 * */

// 可用于cdn缓存/api/static目录
router.get('/api/static/:appKey/:objectKey', ObjectController.get);
router.post('/api/object/:appKey', ObjectController.post);
router.put('/api/object/:appKey/:objectKey', ObjectController.put);
router.delete('/api/object/:appKey/:objectKey', ObjectController.delete);

module.exports = router;
