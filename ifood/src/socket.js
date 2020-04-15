import socketio from 'socket.io-client';

const socket = socketio('http://192.168.10.43:3333', {
    autoConnect: false,
});

function subscribeTonewDelivery(id) {
    socket.emit('new-delivery',id);
}

function removeOrder(id) {
    socket.emit('remove', id)
}

function connect(){
    socket.connect();
}

function disconnect() {
    if (socket.connect){
        socket.disconnect();
    }
}

export {
    connect,
    disconnect,
    subscribeTonewDelivery,
    removeOrder
};