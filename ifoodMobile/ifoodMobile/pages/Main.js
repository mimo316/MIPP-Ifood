import React, {useState, useEffect} from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import api from '../api';




export default function pages() {
    const [orders, setOrders] = useState([]);
    const [loop, setLoop] = useState(10000);

    const navigation = useNavigation();
    const route = useRoute();

    async function getRequest() {
      const response = await api.get('pedidos')
      setOrders(response.data);
    }

    function toggleScreen() {
      navigation.navigate('Ads', loop)
      clearInterval()
    }
  
    useEffect(() => {
      getRequest()
    }, []);
  
   setInterval(() => {
    toggleScreen()
   }, 10000);

  
  
    return (
      <View style={styles.container}>
        <View style={styles.call}>
  
          <Text style={{ fontSize: 40, color: 'white' }}>
            Ultimo Pedido Chamado
          </Text>
  
          {orders.map(order => (
            <View key={order.id}>
              {order.estado == '0' ?
  
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
                {order.estado == '1' ?
  
                  <Text style={styles.item} key={order.id}>
                    {order.id}
                  </Text>
  
                  : null}
              </>
            ))}
          </View>

          <TouchableOpacity 
            onPress={() => navigation.navigate('Ads')}
          >
              <Text>Teste</Text>
          </TouchableOpacity>
  
        </View>
      </View>

    );
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
    }
  });
