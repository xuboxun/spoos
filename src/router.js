const Router = require('koa-router');
const ApplicationController = require('./controller/application');
const AuthController = require('./controller/auth');
const ObjectController = require('./controller/object');

const router = new Router();

router.get('/auth', AuthController.auth);
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);

/**
 * 私有接口, 需要auth校验
 * appId应用于私有
 * */
router.get('/application/checkName', ApplicationController.checkName);
router.get('/application/list', ApplicationController.list);
router.get('/application/detail/:appId', ApplicationController.detail);
router.get('/application/objects/:appId', ApplicationController.listObjects);
router.post('/application/create', ApplicationController.create);
router.delete('/application/:appId', ApplicationController.delete);

router.get('/object/list', ObjectController.listAll);


/**
 * 开放接口
 * appKey应用于对外
 * */
router.get('/object/:appKey/:objectKey', ObjectController.get);
router.post('/object/:appKey', ObjectController.post);
router.put('/object/:appKey/:objectKey', ObjectController.put);
router.delete('/object/:appKey/:objectKey', ObjectController.delete);

module.exports = router;
