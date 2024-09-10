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

const Product = ({navigation}) => {
  const { state } = useAppContext();

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.textP}>Back</Text>
      </TouchableOpacity>
      <Text> My Product</Text>
      <Text>{state.balanceState}</Text>
      <ScrollView>
        {state.myProducts.map(item => (
          <View style={styles.container} key={item.id}>
            <Image
              style={{ width: 100, height: 100 }}
              source={{ uri: item.image }}
            ></Image>
            <View>
              <Text style={styles.textP}>{item.title}</Text>
              <Text style={styles.textS}>{item.price}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#BEADFA',
  },
  textP: {
    fontSize: 20,
    padding: 10,
  },
  textS: {
    fontSize: 10,
    padding: 10,
  },
});
