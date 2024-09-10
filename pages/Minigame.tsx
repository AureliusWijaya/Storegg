import React from 'react';
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
  Touchable,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import { useAppContext } from '../components/AppContext';

const Minigame = ({navigation}) => {
  const [clicked, setClicked] = useState(false);
  const [coin, setCoin] = useState({ value: 0, image: '' });
  const { state, dispatch } = useAppContext();
  const [img, setImg] = useState('');
  const [reward, setReward] = useState(0);
  const [types, setTypes] = useState('');

  const handleClick = () => {
    if (!clicked) {
      setClicked(true);

      const coin = [
        { value: 100, image: require('../Assets/gold-coin.png'), type: 'gold' },
        {
          value: 50,
          image: require('../Assets/silver-coin.png'),
          type: 'silver',
        },
        {
          value: 20,
          image: require('../Assets/bronze-coin.png'),
          type: 'bronze',
        },
      ];

      const randomCoin = coin[Math.floor(Math.random() * coin.length)];
      setImg(randomCoin.image);
      setReward(randomCoin.value);
      setTypes(randomCoin.type);
      dispatch({ type: 'ADD_BALANCE', payload: randomCoin.value });
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Text style={styles.textH}>Back</Text>
      </TouchableOpacity>
      <View style={styles.topBox}>
        <View style={styles.coins}>
          <Image
            source={require('../Assets/gold-coin.png')}
            style={{ width: 50, height: 50 }}
          ></Image>
          <Text>100</Text>
        </View>
        <View style={styles.coins}>
          <Image
            source={require('../Assets/silver-coin.png')}
            style={{ width: 50, height: 50 }}
          ></Image>
          <Text>50</Text>
        </View>
        <View style={styles.coins}>
          <Image
            source={require('../Assets/bronze-coin.png')}
            style={{ width: 50, height: 50 }}
          ></Image>
          <Text>20</Text>
        </View>
      </View>

      {clicked && (
        <View style={styles.topBox}>
          <Text style={styles.textH}>Congratulations!</Text>
        </View>
      )}

      {clicked && (
        <View style={styles.topBox}>
          <Text style={styles.textS}>You got {types} coin!</Text>
        </View>
      )}

      <View style={styles.botBox}>
        {!clicked && (
          <Text style={styles.textH}>Click on the egg to get the prize</Text>
        )}
        {clicked && (
          <Image source={img} style={{ width: 50, height: 50 }}></Image>
        )}

        <TouchableOpacity onPress={handleClick}>
          <Image
            source={
              !clicked
                ? require('../Assets/egg-full.png')
                : require('../Assets/egg-broken.png')
            }
            style={{ width: 200, height: 250 }}
          ></Image>
        </TouchableOpacity>

        {clicked && (
          <Text style={styles.textH}>
            {reward} coins! have been added to your balance
          </Text>
        )}
      </View>
    </View>
  );
};

export default Minigame;

const styles = StyleSheet.create({
  topBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coins: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textH: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  botBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30,
    padding: 10,
    gap: 80,
  },
  textS: {
    fontSize: 15,
  },
});
