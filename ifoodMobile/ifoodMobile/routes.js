import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Main from './pages/Main';
import Ads from './pages/Anuncios';
import Ads2 from './pages/Anuncio2';

const AppStack = createStackNavigator();

export default function Routes(){
    return(
        <NavigationContainer >
            <AppStack.Navigator screenOptions = {{headerShown: false}}>
                <AppStack.Screen name = 'Main' component = {Main}/>
                <AppStack.Screen name = 'Ads' component = {Ads}/>
                <AppStack.Screen name = 'Ads2' component = {Ads2}/>
            </AppStack.Navigator>
        </NavigationContainer>
    );
}