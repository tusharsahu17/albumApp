// Home.js

import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {setPhotos, addToFavorites} from '../../feature/photosSlice';
import {colors} from '../colors';

const Home = () => {
  const dispatch = useDispatch();
  const photos = useSelector(state => state.photos.data);
  const [albumId, setAlbumId] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [ismodalFav, setIsModalFav] = useState(false);
  const fetchData = async currentAlbumId => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/photos?albumId=${currentAlbumId}`,
      );
      if (currentAlbumId > 1) {
        dispatch(setPhotos([...photos, ...response.data]));
      } else {
        dispatch(setPhotos(response.data));
      }
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  useEffect(() => {
    fetchData(albumId);
  }, [albumId, dispatch]);

  const handleLoadMore = () => {
    if (albumId < 10) {
      setAlbumId(albumId + 1);
    } else {
      console.log('No more albums to fetch');
    }
  };

  const handleSelectItem = item => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleAddToFavorites = item => {
    dispatch(addToFavorites(item));
  };
  const handleFav = data => {
    setIsModalFav(data);
  };
  const Item = React.memo(({item, onSelectItem, onfav}) => {
    const isFavorite = useSelector(state =>
      state.photos.favorites.some(favorite => favorite.id === item.id),
    );

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          onSelectItem(item), onfav(isFavorite);
        }}>
        <Image style={styles.tinyLogo} source={{uri: item.url}} />
        <View style={styles.dataContainer}>
          <Text style={styles.title}>Album ID: {item.id}</Text>
          <Text style={styles.subTitle}>{item.title}</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.btnContainer,
            {backgroundColor: isFavorite ? 'gold' : '#0272bd'},
          ]}
          onPress={() => handleAddToFavorites(item)}>
          <Text style={{color: 'white'}}>
            {isFavorite ? 'Favorite' : 'Add Favorite'}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.contentContainer}>
      <View style={styles.headers}>
        <Text
          style={{
            marginLeft: 20,
            alignSelf: 'flex-start',
            color: 'white',
            marginTop: 15,
            fontWeight: '500',
          }}>
          Home
        </Text>
      </View>
      <FlatList
        data={photos}
        renderItem={({item}) => (
          <Item item={item} onSelectItem={handleSelectItem} onfav={handleFav} />
        )}
        keyExtractor={item => String(item.id)}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.headers}>
            <Text
              style={{
                marginLeft: 20,
                alignSelf: 'center',
                color: 'white',
                marginTop: 15,
                fontWeight: '500',
              }}>
              Details
            </Text>
          </View>
          <View style={styles.modalView}>
            {selectedItem && (
              <>
                <Image
                  style={styles.largeLogo}
                  source={{uri: selectedItem.url}}
                />
                <Text style={[styles.title, {paddingVertical: 20}]}>
                  Album ID: {selectedItem.albumId}
                </Text>
                <Text style={[styles.title, {paddingVertical: 20}]}>
                  Title: {selectedItem.title}
                </Text>
                <Text style={[styles.title, {paddingVertical: 20}]}></Text>
                {ismodalFav && (
                  <TouchableOpacity
                    style={[
                      styles.btnContainer,
                      {backgroundColor: 'gold', margin: 10},
                    ]}>
                    <Text style={{color: 'white'}}>
                      {ismodalFav && 'Favourite'}
                    </Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={[styles.btnContainer, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={{color: colors.white, padding: 5}}>Go Back</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  modalView: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
  },
  largeLogo: {
    width: 150,
    height: 150,
    borderRadius: 150,
  },
  buttonClose: {
    backgroundColor: '#0272bd',
    color: colors.white,
    padding: 5,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'red',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#b5dcfc',
    alignItems: 'center',
  },
  dataContainer: {
    flex: 1,
    marginLeft: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 14,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  btnContainer: {
    color: 'white',
    padding: 5,
    paddingVertical: 5,
    borderRadius: 5,
  },
  headers: {
    height: 50,
    width: '100%',
    backgroundColor: '#0272bd',
  },
});

export default Home;
