import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  Alert,
  Button,
  View,
  TextInput,
  BackHandler,
} from 'react-native';
import { useEffect } from 'react';
import Top from './pages/Top';
import Detail from './components/Detail';
import Product from './pages/Product';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppProvider } from './components/AppContext';
import Minigame from './pages/Minigame';

const App = () => {
  const Stack = createNativeStackNavigator();
  const handleExit = () => {
    Alert.alert(
      'Exit',
      'Are you sure you want to exit?',
      [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          onPress: () => {
            BackHandler.exitApp();
          },
        },
      ],
      { cancelable: false },
    );
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleExit);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleExit);
    };
  }, []);

  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Top" component={Top} />
          <Stack.Screen name="Detail" component={Detail} />
          <Stack.Screen name="Product" component={Product} />
          <Stack.Screen name="Minigame" component={Minigame} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
