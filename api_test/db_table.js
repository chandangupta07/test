var db = require('./db');
var userTable = `CREATE TABLE IF NOT EXISTS users(
    id int NOT NULL AUTO_INCREMENT,
    username varchar(15) NOT NULL,
    password varchar(32) NOT NULL,
    followers int DEFAULT 0,
    following int DEFAULT 0,
    tweets int DEFAULT 0,
    PRIMARY KEY (id)
)`;

var followTable = `CREATE TABLE IF NOT EXISTS following(
    id int NOT NULL AUTO_INCREMENT,
    user1_id int REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    follower_id int REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (id)
)`;

var tweetTable = `CREATE TABLE tweets(
    id int NOT NULL AUTO_INCREMENT,
    username varchar(15) NOT NULL,
    user_id int REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    tweet TEXT NOT NULL,
    tag varchar(50) DEFAULT NULL,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
)`;

db.query(userTable, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
});
db.query(followTable, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
});
db.query(tweetTable, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
});
db.end(function(err) {
    if (err) {
      return console.log(err.message);
    }
});