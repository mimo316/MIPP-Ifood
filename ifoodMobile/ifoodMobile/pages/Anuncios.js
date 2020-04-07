import React, {useState,useEffect} from 'react';
import { View,Image,Text,  } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';


import Ads01 from '../assets/Ifood1.jpg';





export default function Anuncios() {

  function toggleScreen() {
    navigation.navigate('Main' )
    clearInterval()
  }


  const navigation = useNavigation();
  const route = useRoute();
  
    setTimeout(() => {
      toggleScreen()
      console.log('indo pra 2')
    }, timer);


  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image style={{ width: '100%', height: '100%'}} source={Ads01}/>
    </View>
  );
}
