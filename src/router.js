const Router = require('koa-router');
const ApplicationController = require('./controller/application');
const AuthController = require('./controller/auth');
const ObjectController = require('./controller/object');

const router = new Router();

router.post('/auth', AuthController.auth);

/**
 * 私有接口
 * appId应用于私有
 * */
router.get('/application/checkName', ApplicationController.checkName);
router.get('/application/list', ApplicationController.list);
router.get('/application/detail/:appId', ApplicationController.detail);
router.get('/application/objects/:appId', ApplicationController.listObjects);
router.post('/application/create', ApplicationController.create);
router.delete('/application/:appId', ApplicationController.delete);

router.get('/object/list', ObjectController.listAll);
// todo：获取某一应用下的object列表接口
/**
 * 开放接口
 * appKey应用于对外
 * */
router.get('/object/:appKey/:objectKey', ObjectController.get);
router.post('/object/:appKey', ObjectController.post);
router.put('/object/:appKey/:objectKey', ObjectController.put);
router.delete('/object/:appKey/:objectKey', ObjectController.delete);

module.exports = router;
