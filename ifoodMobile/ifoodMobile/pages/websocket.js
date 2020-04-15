import socketio from 'socket.io-client';

const socket = socketio('http://192.168.10.43:3333', {
    autoConnect: false,
});

function subscribeTonewDelivery(data) {
    socket.on('new-delivery', console.log(data));
}



function connect(){
    socket.connect();

    socket.on('message', text => {
        console.log(text);
    })

    socket.on('connected', function(data) {
      console.log(data)
  })

}

function disconnect() {
    if (socket.connect){
        socket.disconnect();
    }
}

export {
    connect,
    disconnect,
    subscribeTonewDelivery
};