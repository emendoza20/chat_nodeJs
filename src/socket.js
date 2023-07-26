module.exports=(io)=>{

    let nickNames=[];

    io.on('connection', socket =>{
        console.log('Nuevo usuario conectado');

 //Al recibir un mensaje recojemos los datos
        socket.on('enviar mensaje', (datos)=>{
           // console.log(datos)


           io.sockets.emit('nuevo mensaje',{
            msg:datos,
            username:socket.nickname


           });

        });

        socket.on('nuevo usuario',(datos, callback)=>{

            if(nickNames.indexOf(datos) != -1 ) {
                callback(false);
            }else{
                callback(true);
                socket.nickname = datos;
                nickNames.push(socket.nickname);

                io.sockets.emit('nombre usuario',nickNames);
            }
        });

        socket.on('disconnect', datos =>{

            if(!socket.nickname){
                return;

            }else{

            //buscamos su posición en el array y lo eliminamos con splice()

                nickNames.splice(NickNames.indexOf(socket.nickname), 1);
                io.sockets.emit('nombre usuario', nickNames);
            }

        });
     
    })
}