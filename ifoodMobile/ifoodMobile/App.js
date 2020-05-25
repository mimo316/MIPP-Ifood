import React, { useEffect, useState, } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, YellowBox } from 'react-native';
import { Audio } from 'expo-av';
import socketio from 'socket.io-client'
import api from './api';

import img1 from './assets/Ifood1.jpg'
import img2 from './assets/Ifood2.jpg'

export default function App() {

  const [orders, setOrders] = useState([]);
  const [teste, setTeste] = useState([]);
  const [tela, setTela] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const [teste2, setTeste2] = useState([]);
  const soundObject = new Audio.Sound();


YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
])


  async function getRequest() {
    const response = await api.get('pedidos')
    setOrders(response.data);
  }

  useEffect(() => {
    const socket = socketio('http://192.168.10.43:3333')

    socket.on('new', async id => {
      setTeste([...teste, id])
    })

    socket.on('this', function (data) {
      setRefresh(!refresh)
    });

    socket.on('delete', id => {
      setTeste2([...teste2, id])
    })
  }, []);

  async function playSound() {
    try {
      await soundObject.loadAsync(require('./assets/inflicted.mp3'));
      await soundObject.playAsync();
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getRequest()
    playSound()
  }, [teste]);

  useEffect(() => {
    getRequest()
  }, [teste2]);


  useEffect(() => {
    getRequest()
  }, []);

  useEffect(() => {
    getRequest()
  }, [refresh]);

  setTimeout(() => {

    if (tela === 1) {
      setTela(2);
    }

    if (tela === 2) {
      setTela(3);

    }

    if (tela === 3) {
      setTela(1)
    }

  }, 5000);

  if (tela === 1) {

    return (
      <View style={styles.container}>
        <StatusBar
          hidden={true}
        />
        <View style={styles.call}>

          <Text style={{ fontSize: 40, color: 'white' }}>
            Ultimo Pedido Chamado
          </Text>

          {orders.map(order => (
            <View key={order.id}>
              {order.estado === '0' ?

                <Text style={{ alignSelf: 'center', marginTop: 180, fontSize: 160, color: 'white' }}>
                  {order.id}
                </Text>

                : null}
            </View>
          ))}
        </View>

        <View style={styles.wait}>

          <Text style={{ fontSize: 40, color: 'white' }}>Pedidos Já Prontos</Text>

          <View style={styles.table}>
            {orders.map(order => (
              <>
                {order.estado === '1' ?

                  <Text style={styles.item} key={order.id}>
                    {order.id}
                  </Text>

                  : null}
              </>
            ))}
          </View>
        </View>
      </View>

    );
  }
  if (tela === 2) {
    return (
      <View>
        <StatusBar
          hidden={true}
        />
        <Image style={styles.imageAd} source={img1} />
      </View>

    )
  }
  if (tela === 3) {
    return (
      <View >
       <StatusBar
          hidden={true}
        />
        <Image style={styles.imageAd} source={img2} />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row'
  },
  call: {
    width: '60%',
    height: '100%',
    backgroundColor: '#be2535',
    alignItems: 'center'
  },
  wait: {
    width: '40%',
    height: '100%',
    backgroundColor: '#7ab64d',
    alignItems: 'center'
  },
  table: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  item: {
    width: '33%',
    textAlign: 'center',
    fontSize: 38,
    color: 'white'
  },
  imageAd: {
    width: '100%',
    height: '100%'
  }
});
