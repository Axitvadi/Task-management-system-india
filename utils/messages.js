const moment = require('moment');

function message(username,text,side){
    return {
        username,
        text,
        side,
        time:moment().format('h:mm a'),
    }
};
function Selfmessage(username){
    return{
        username:'System',
        text:`${username} join Chatbox !`,
        side:'left',
        time:moment().format('h:mm a'),
    }
}

module.exports = {message,Selfmessage};