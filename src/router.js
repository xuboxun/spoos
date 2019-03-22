const Router = require('koa-router');
const ApplicationController = require('./controller/application');
const AuthController = require('./controller/auth');
const ObjectController = require('./controller/object');

const router = new Router();

router.prefix('/api');

router.post('/auth', AuthController.auth);

router.post('/application/apply', ApplicationController.apply);
router.post('/application/approve', ApplicationController.approve);
router.post('/application/checkName', ApplicationController.checkName);
router.get('/application/list', ApplicationController.list);

router.get('/object/list', ObjectController.list);
router.get('/object/:appKey/:objectKey', ObjectController.get);
router.post('/object/:appKey', ObjectController.post);
router.put('/object/:appKey/:objectKey', ObjectController.put);
router.delete('/object/:appKey/:objectKey', ObjectController.delete);

module.exports = router;
