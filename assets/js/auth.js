const API_URL = 'http://localhost:4000/';
const HOUR   = 86400;
function checkUser(){
    let user_data = localStorage.getItem('user_data');
    user_data     =  JSON.parse(user_data);
    if(!user_data.user_id || !user_data.token){
        window.location.href = 'login.html';
    }else if(user_data.userId || user_data.token){
        let sess_time = new Date(user_data.sess_time);
        let now_time = new Date();
        var seconds =  (now_time.getTime() - sess_time.getTime()) / 1000;
        if(seconds>HOUR){
            localStorage.clear();
            window.location.href = 'login.html';
        }
    }
}

function getToken(){
    let user_data = localStorage.getItem('user_data');
    user_data     =  JSON.parse(user_data);
    return user_data.token;
}