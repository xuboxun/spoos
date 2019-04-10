const Router = require('koa-router');
const ApplicationController = require('./controller/application');
const AuthController = require('./controller/auth');
const ObjectController = require('./controller/object');

const router = new Router();

router.prefix('/api');

router.post('/auth', AuthController.auth);

router.get('/application/checkName', ApplicationController.checkName);
router.post('/application/create', ApplicationController.create);
router.get('/application/list', ApplicationController.list);
// todo：获取某一应用详情
router.delete('/application/:appKey', ApplicationController.delete);

// todo：获取某一应用下的object列表接口
router.get('/object/list', ObjectController.list);
router.get('/object/:appKey/:objectKey', ObjectController.get);
router.post('/object/:appKey', ObjectController.post);
router.put('/object/:appKey/:objectKey', ObjectController.put);
router.delete('/object/:appKey/:objectKey', ObjectController.delete);

module.exports = router;
