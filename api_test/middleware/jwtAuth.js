var JWT   =  require('jsonwebtoken');
var dotenv = require('dotenv').config({path:'../.env'});
exports.generateToken        =  function(user_data,expiresIn){
   let token = JWT.sign({_id : user_data['user_id'], username: user_data['user_name'] },process.env.JWT_KEY,{expiresIn:  expiresIn});
   return token;
}

exports.getTokenFromRequest  =  function(req,res,callback){
    if(req.headers.authorization && req.headers.authorization.split(' ')[0] == 'Bearer' ){
        let token   = req.headers.authorization.split(' ')[1];
        return callback(token);
    }else if (req.query && req.query.token) {
        return callback(req.query.token);
    }
    res.status(422).json({errors : [message = "Token not verified"]});
    return;
}

exports.verifyToken    =  function(token,callback){
    JWT.verify(token, process.env.JWT_KEY, (err, user) => {
        if (err) {
            return callback(err,user);
        }

        return callback(null,user);
    });
}