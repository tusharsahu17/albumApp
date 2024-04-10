import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {colors} from '../colors';

const Favourite = () => {
  const favorites = useSelector(state => state.photos.favorites);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelectItem = item => {
    setSelectedItem(item);
    setModalVisible(true);
  };
  useEffect(() => {
    console.log(favorites);
  }, []);

  const Item = ({item, onSelectItem}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => onSelectItem(item)}>
      <Image style={styles.tinyLogo} source={{uri: item.url}} />
      <View style={styles.dataContainer}>
        <Text style={styles.title}>Album ID: {item.id}</Text>
        <Text style={styles.subTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

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
          Favorite
        </Text>
      </View>
      <FlatList
        data={favorites}
        renderItem={({item}) => (
          <Item item={item} onSelectItem={handleSelectItem} />
        )}
        keyExtractor={item => String(item.id)}
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
              Favorite
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
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Favourite;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    backgroundColor: '#0272bd',
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
