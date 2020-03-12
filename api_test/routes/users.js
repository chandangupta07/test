var express = require('express');
var router = express.Router();

var user_controller  = require('../controller/userController');
var validater        = require('../middleware/validate');
/* GET users listing. */
router.get('/',user_controller.feed );
router.get('/following',user_controller.foolwing_user);
router.get('/followers',user_controller.followers);
router.get('/follow-user-list',user_controller.follow_user_list);
router.post('/signin',validater.validateRequest('userLogin'),user_controller.signIn );
router.post('/register',validater.validateRequest('userRegister'),user_controller.userRegister);
router.post('/create-post',validater.validateRequest('createFeed'),user_controller.create);
router.post('/follow',validater.validateRequest('followUser'),user_controller.follow_user);
//router.post('/follow',validater.validateRequest('followUser'),function(req,res) {
 //   res.send(req.body);return;
//})
module.exports = router;
