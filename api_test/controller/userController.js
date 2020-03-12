var User                = require('../model/userModel');
var {validationResult}  = require('express-validator');   
var {generateToken,getTokenFromRequest,verifyToken}     = require('../middleware/jwtAuth');


exports.feed  = function(req,res){
    getTokenFromRequest(req,res,function(token){
        verifyToken(token,function(err,user_data){
            if(err){
                res.status(200).json({errors : [message = "Token not verified",err = err]});
                return;
            }
            User.feed(user_data['_id'],function(err,result_data){
                if(err){
                    res.status(200).json({errors : err});
                    return;
                }
                res.status(200).json({data : result_data, token_data : user_data});
                return;
            })
        });
    });
}

exports.signIn   =  function(req,res){
    const errors = validationResult(req); // checking for validation error in request
    if(!errors.isEmpty()){
        res.status(200).json({errors : errors.array()});
        return;
    }
    User.user_signin(req.body.username,req.body.password,function(err,result_data){
        if(err){
            res.status(200).json({errors : err});
            return;
        }
        let user_data  = {
            user_id    : result_data[0].id,
            user_name  : result_data[0].username 
        };
        const  expiresIn  =  24  *  60  *  60;
        let token         =  generateToken(user_data,expiresIn);
        if(token){
            res.status(200).json({data : result_data, token : token, expiresIn : expiresIn  });
            return;
        }else{
            res.status(200).json({err : 'Token not generated'  });
            return;
        }
        
    });
}

exports.userRegister   =  function(req,res){
    const errors = validationResult(req); // checking for validation error in request
    if(!errors.isEmpty()){
        res.status(200).json({errors : errors.array()});
        return;
    }
    let user_data = {
        user      : req.body.username,
        password  : req.body.password
    }
    User.user_register(user_data,function(err,result_data){
        if(err){
            res.status(200).json({errors : err});
            return;
        }
        res.status(200).json({userID : result_data, message : 'User ceated suceesfully'});
        return;
    }) 
}

exports.create   =  function(req,res){
    const errors = validationResult(req); // checking for validation error in request
    if(!errors.isEmpty()){
        res.status(200).json({errors : errors.array()});
        return;
    }
    getTokenFromRequest(req,res,function(token){
        verifyToken(token,function(err,user_data){
            if(err){
                res.status(200).json({errors : [message = "Token not verified",err = err]});
                return;
            }
            let datetime = new Date();
            let tweet_data = {
                user_id      : user_data['_id'],
                user         : user_data['username'],
                post_text    : req.body.post_text,
                tag          : req.body.tag,
                created_time : datetime
            }
            User.create_post(tweet_data,function(err,result_data){
                if(err){
                    res.status(200).json({errors : err});
                    return;
                }
                res.status(200).json({poatId : result_data, message : 'Post added suceesfully'});
                return;
            })
        })
    })
}

exports.follow_user   = function(req,res){
    
    const errors = validationResult(req); // checking for validation error in request
    if(!errors.isEmpty()){
        res.status(200).json({errors : errors.array()});
        return;
    }
    
    getTokenFromRequest(req,res,function(token){
        verifyToken(token,function(err,user_data){
            if(err){
                res.status(200).json({errors : [message = "Token not verified",err = err]});
                return;
            }
            
            let follow_data  = {
                user_id      : req.body.following_id,
                follower_id  : user_data['_id']
            };
            User.follow_user(follow_data,function(err,result_data){
                if(err){
                    res.status(200).json({errors : err});
                    return;
                }
                res.status(200).json({message : 'you started following this user'});
                return;
            })
        })
    })

}

exports.foolwing_user   = function(req,res){
    getTokenFromRequest(req,res,function(token){
        verifyToken(token,function(err,user_data){
            if(err){
                res.status(200).json({errors : err});
                return;
            }
            User.following_user(user_data['_id'],function(err,results){
                if(err){
                    res.status(200).json({errors : err});
                    return;
                }
                res.status(200).json({data:results});
                return;
            })
        })
    })
}

exports.followers   = function(req,res){
    getTokenFromRequest(req,res,function(token){
        verifyToken(token,function(err,user_data){
            if(err){
                res.status(200).json({errors : err});
                return;
            }
            User.followers(user_data['_id'],function(err,results){
                if(err){
                    res.status(200).json({errors : err});
                    return;
                }
                res.status(200).json({data:results});
                return;
            })
        })
    })
}

exports.follow_user_list   = function(req,res){
    getTokenFromRequest(req,res,function(token){
        verifyToken(token,function(err,user_data){
            if(err){
                res.status(200).json({errors : err});
                return;
            }
            User.follow_user_list(user_data['_id'],function(err,results){
                if(err){
                    res.status(200).json({errors : err});
                    return;
                }
                res.status(200).json({data:results});
                return;
            })
        })
    })
}