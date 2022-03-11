require('dotenv').config()
require("./config/db")
const http = require('http')
const express = require("express")
const bodyparser = require('body-parser')
const app = express();
const path = require("path")
// const expressSession = require('express-session')
const routes = require('./routes/index')
const cookieParser = require('cookie-parser')
const socketio = require("socket.io");
const {
    message
} = require('./utils/messages')
const {
    Selfmessage
} = require('./utils/messages');
const server = http.createServer(app);
const io = socketio(server);

app.use(bodyparser.json({
    limit: '1024mb'
}))
app.use(bodyparser.urlencoded({
    limit: '1024mb',
    extended: true
}))

app.use(express.static('public'))
// app.use('/public', express.static('public'))

// app.use(expressSession({
//     secret: process.env.secret,
//     resave: false,
//     saveUninitialized: false
// }))
// ------------------view engine ----------------------------
app.set('view engine', 'ejs')
app.set('views', 'views/pages')
app.use(cookieParser())
app.use(routes)

// socket.io
io.on('connection', socket => {
    console.log('New WebSocket connection', socket.id);

    //Single client
    socket.on('Systemmessage', (msg) => {
        socket.broadcast.emit('Smessage', Selfmessage(msg))
    })

    socket.on('chatmessage', (msg) => {
        socket.broadcast.emit('chat', message(msg.name, msg.text, 'left'));
    })
})

const PORT = process.env.PORT || 4000
server.listen(PORT, () => {
    console.log(`server successful started at port ${PORT}..`)
})