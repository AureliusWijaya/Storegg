import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Alert,
  Button,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { useAppContext } from '../components/AppContext';

const Detail = ({ route, navigation }) => {
  const { item } = route.params;
  const { state, dispatch } = useAppContext();

  const handleBuy = () => {
    if (state.balanceState >= item.price) {
      dispatch({ type: 'ADD_PRODUCT', payload: item });
      Alert.alert(
        'Success!',
        `${item.title} was bought successfully! Your current balance is ${state.balanceState - item.price}`,
      );

      navigation.goBack();
    } else {
      Alert.alert('Not enough balance');
    }
  };
  const handleSell = () => {
    dispatch({ type: 'SELL_PRODUCT', payload: item });
    Alert.alert(
      'Success!',
      `${item.title} was sold successfully! Your current balance is ${state.balanceState + item.price}`,
    );
    navigation.goBack();
  };
  const check = state.myProducts.some(product => product.id === item.id);
  const handleOperation = () => {
    if (check) {
      handleSell();
    } else {
      handleBuy();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.textH}>Back</Text>
      </TouchableOpacity>
      <View>
        <Image
          style={{ width: 300, height: 350 }}
          source={{ uri: item.image }}
        ></Image>
      </View>
      <View>
        <Text style={styles.text}>{item.title}</Text>
        <Text style={styles.textT}>Price</Text>
        <Text style={styles.textPrice}>{item.price} Coins</Text>
        <Text style={styles.textT}>Description</Text>
        <Text style={styles.textA}>{item.description}</Text>
        <Button
          title={check ? 'Sell' : 'Buy'}
          onPress={handleOperation}
        ></Button>
      </View>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#BEADFA',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    padding: 10,
  },
  textNormal: {
    fontSize: 10,
    color: 'white',
    padding: 10,
  },
  textPrice: {
    fontSize: 17,
    color: 'green',
    padding: 10,
    fontWeight: 'bold',
  },
  textT: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    paddingLeft: 10,
  },
  textA: {
    fontSize: 10,
    color: 'black',
    padding: 10,
  },
});
