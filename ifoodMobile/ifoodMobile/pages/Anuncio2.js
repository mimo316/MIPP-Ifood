import React, {useState,useEffect} from 'react';
import { View,Image,Text,  } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import Ads02 from '../assets/Ifood2.jpg';



export default function Anuncios() {

    
    function toggleScreen() {
        navigation.navigate('Main')
    }
    
    const navigation = useNavigation();  

    // setInterval(() => {
    //     navigation.navigate('Main')
    //     console.log('indo pra main')
    // }, 10000);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image style={{ width: '100%', height: '100%'}} source={Ads02}/>
    </View>
  );
}
