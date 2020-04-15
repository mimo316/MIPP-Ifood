
import socketio from 'socket.io-client';

const socket = socketio('http://192.168.10.43:3333', {
    autoConnect: false,
});

function receiveNewDelivery(id) {
    socket.on('new',id)
}

function removeOrder(id) {
  socket.on('delete')
}

function connect(){
    socket.connect();

    // socket.on('message', text => {
    //     console.log(text);
    // })
}

function disconnect() {
    if (socket.connect){
        socket.disconnect();
    }
}

export {
    connect,
    disconnect,
    receiveNewDelivery,
    removeOrder
};

// setIncidents(incidents.filter(incident => incident.id !== id))