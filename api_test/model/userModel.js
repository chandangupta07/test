var db   = require('../db');

exports.feed   = function(userID,callback){
    let query = `SELECT * FROM tweets WHERE 
    user_id IN (SELECT follower_id FROM following WHERE user1_id = ${userID} ) OR user_id = ${userID} `;
    db.query(query,function(err,results){
        if(err) {
            return callback(err);
        }
       return callback(null,results);
    })

}

exports.user_signin  = function(username,password,callback){
    let query = "select * from users where username = '"+username+"' AND password = md5('"+password+"') ";
    db.query(query,function(err,results){
        if(err) {
            return callback(err);
        }
        else if(results.length==0){
            let err_msg = [message='no result found'];
            return callback(err_msg);
        }
        return callback(null,results);
    })
}

exports.user_register   = function(user_data,callback){
    let username = user_data['user'];
    let password = user_data['password'];
    let check_query = " select id from users where username = '"+username+"' ";
    db.query(check_query,function(err,results){
        if(err){
            return callback(err);
        } else if(results.length>0){
            let err_msg = [message='This user already exists'];
            return callback(err_msg);
        }
        let create_user_query = "insert into users (username,password,followers,following,tweets) values ('"+username+"',md5('"+password+"'),0,0,0) ";
        db.query(create_user_query,function(err,result){
            if(err){
                return callback(err);
            }
            return callback(null,result.insertId);
        })
    })
}



exports.create_post  = function(tweet_data,callback){
    let query    = "insert into tweets (username,user_id,tweet,tag,timestamp) values ("+db.escape(tweet_data['user'])+","+tweet_data['user_id'] +","+db.escape(tweet_data['post_text'].replace(/\r?\n/g, "*"))+","+db.escape(tweet_data['tag'])+","+db.escape(tweet_data['created_time'])+") ";
    db.query(query,function(err,result){
        if(err){
            return callback(err);
        }
        return callback(null,result.insertId);
    })
}

exports.follow_user  = function(follow_data,callback){
    let check_query = " select id from following where user1_id = '"+follow_data['user_id']+"' AND follower_id = '"+follow_data['follower_id']+"' ";
    db.query(check_query,function(err,results){
        if(err){
            return callback(err);
        } else if(results.length>0){
            let err_msg = [message='This already Following this user'];
            return callback(err_msg);
        }
        let follow_user_query = "insert into following (user1_id,follower_id) values ('"+follow_data['user_id']+"','"+follow_data['follower_id']+"') ";
        db.query(follow_user_query,function(err,result){
            if(err){
                return callback(err);
            }
            return callback(null,result.insertId);
        })
    })
}

exports.following_user  = function(user_id,callback){
    let query = "select * from users where id in (select user1_id  from following where follower_id = "+user_id+" )";
    db.query(query,function(err,results){
        if(err) {
            return callback(err);
        }
       return callback(null,results);
    })
}

exports.followers  = function(user_id,callback){
    let query = "select * from users where id in (select follower_id  from following where user1_id = "+user_id+" )";
    db.query(query,function(err,results){
        if(err) {
            return callback(err);
        }
       return callback(null,results);
    })
}

exports.follow_user_list  = function(user_id,callback){
    let query = "select * from users where id not in (select user1_id  from following where follower_id = "+user_id+" ) AND id!= "+user_id+" ";
    db.query(query,function(err,results){
        if(err) {
            return callback(err);
        }
       return callback(null,results);
    })
}