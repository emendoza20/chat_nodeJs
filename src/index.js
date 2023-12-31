const express= require('express');
const path =require('path');

const app= express();

const server= require('http').Server(app);

const socketio= require('socket.io')(server);

app.set('port', process.env.PORT || 3000);
//Ejecutamos la funcion de sockets.js  
require('./socket')(socketio);
//Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

server.listen(app.get('port'), ()=> {
    console.log('servidor en el puerto 3000');
})