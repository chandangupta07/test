var {body}   = require('express-validator');


exports.validateRequest  = function(method){
    switch(method) {
        case 'userLogin' : {
            return [
                body('username','username must not be empty').not().isEmpty(),
                body('password','password must not be empty').not().isEmpty(),
                body('password','password min length should be 6').isLength({min : 6 })
            ]
        }
        case 'userRegister' : {
            return [
                body('username','username must not be empty').not().isEmpty(),
                body('username','password min length should be 4').isLength({min : 4 }),
                body('password','password must not be empty').not().isEmpty(),
                body('password','password min length should be 6').isLength({min : 6 })
            ]
        }
        case 'createFeed'   : {
            return [
                body('post_text','Post text must not be empty').not().isEmpty(),
                body('tag','Tag must not be empty').not().isEmpty(),
                body('tag','Tag should be string').isString()
            ]
        }
        case 'followUser'    : {
            return [
                body('following_id','Fooloweing is empty').not().isEmpty()
            ]
        }
    }
}