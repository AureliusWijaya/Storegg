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
} from 'react-native';
import SearchIcon from '../Assets/SearchIcon';
import ListViewIcon from '../Assets/ListViewIcon';
import GridViewIcon from '../Assets/GridViewIcon';
import { TouchableOpacity } from 'react-native';
import Detail from '../components/Detail';
import { useAppContext } from '../components/AppContext';

// interface Props {
//     image: string,
//     title: string,
//     price: string
// }

const Top = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [viewBox, setViewBox] = useState('list');
  const [search, setSearch] = useState('');
  const { state } = useAppContext();
  const changeView = () => {
    setViewBox(viewBox === 'grid' ? 'list' : 'grid');
  };

  const searchFilter = (item: any) => {
    return item.title.toLowerCase().includes(search.toLowerCase());
  };

  const filteredData = data.filter(searchFilter);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
  }, []);

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.search}>
          <SearchIcon style={styles.searchicon} />
          <TextInput
            placeholder="Search Product.."
            value={search}
            onChangeText={text => setSearch(text)}
          ></TextInput>
        </View>
        <View style={styles.BotContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Product')}>
            <View style={styles.button}>
              <Button color={'black'} title="My Product" />
            </View>
          </TouchableOpacity>

          <View style={styles.balanceBox}>
            <Text style={styles.textBalance}>{state.balanceState}</Text>
            <Text style={styles.textBalance1}>My Coins</Text>
          </View>
        </View>
      </View>

      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Minigame')}>
          <View style={styles.button}>
            <Button color={'black'} title="Minigame" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.stick}>
        <Text style={styles.text}>Available Product</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={changeView}>
            {viewBox === 'list' ? (
              <ListViewIcon style={styles.searchicon} />
            ) : (
              <GridViewIcon style={styles.searchicon} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{width:'100%'}}>
      <View style={viewBox === 'grid' ? styles.cardGrid : styles.cardList}>
        {filteredData.map((item, index) => (
         
            <TouchableOpacity
              onPress={() => navigation.navigate('Detail', { item: item })}
              style={viewBox==='grid'? styles.smallerBox : ''}
            >
              <View style={viewBox==='grid'? styles.smallerBox : styles.cardList}>
                <View>
                  <Image
                    style={{ width: 100, height: 100 }}
                    source={{ uri: item.image }}
                  ></Image>
                </View>
                <View>
                  <Text style={styles.texth}>{item.title}</Text>
                  <Text style={styles.texts}>{item.price} Coins</Text>
                </View>
              </View>
            </TouchableOpacity>
          
        ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#BEADFA',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  BotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balanceBox: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 7,
  },
  searchicon: {
    backgroundColor: 'white',
  },
  button: {
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    margin: 1,
  },
  textBalance: {
    color: '#BEADFA',
    fontSize: 20,
  },
  textBalance1: {
    color: 'black',
    fontSize: 15,
  },
  text: {
    color: 'black',
    fontSize: 20,
    marginLeft: 10,
  },
  texts: {
    color: 'black',
    fontSize: 10,
    marginLeft: 10,
  },
  texth: {
    color: 'black',
    fontSize: 10,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  search: {
    backgroundColor: 'white',
    padding: 3,
    margin: 5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardList: {
    backgroundColor: 'white',
    padding: 3,
    margin: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },
  cardGrid: {
    backgroundColor: 'white',
    padding: 3,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    flexDirection: 'row',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },
  stick: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
  },
  contentScroll: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 10,
  },
  smallerBox:{
    width: 100/2 + '%',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
  }
});

export default Top;
