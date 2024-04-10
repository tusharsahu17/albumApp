import React from 'react';
import {View, TextInput, Button, Text, TouchableOpacity} from 'react-native';

const Contacts = () => {
  const numbers = [123, 234, 521, 158018, 40848, 408, 58238];
  const names = ['anay', 'karan', 'sagar', 'dinesh', 'Amit', 'Nikunj', 'ajay'];

  const findSmallestName = inputNumber => {
    const index = numbers.indexOf(parseInt(inputNumber));
    if (index !== -1) {
      return names[index];
    } else {
      return 'No name found';
    }
  };

  const [inputValue, setInputValue] = React.useState('');
  const [result, setResult] = React.useState('');

  const handleSearch = () => {
    setResult(findSmallestName(inputValue));
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f5fcff',
      }}>
      <View style={{height: 50, width: '100%', backgroundColor: '#0272bd'}}>
        <Text
          style={{
            marginLeft: 20,
            alignSelf: 'flex-start',
            color: 'white',
            marginTop: 15,
            fontWeight: '500',
          }}>
          Search Contact
        </Text>
      </View>
      <Text
        style={{
          marginLeft: 20,
          alignSelf: 'flex-start',
          marginTop: 15,
          fontWeight: '500',
          color: 'black',
        }}>
        Enter Contact Number To Search
      </Text>
      <TextInput
        style={{
          height: 40,
          width: '90%',
          borderColor: '#4a4a4a',
          borderWidth: 1,
          marginVertical: 20,
          paddingHorizontal: 10,
          borderRadius: 5,
          backgroundColor: '#fff',
        }}
        placeholder="Enter a number"
        keyboardType="numeric"
        onChangeText={text => setInputValue(text)}
        value={inputValue}
      />
      <TouchableOpacity
        style={{
          backgroundColor: '#0272bd',
          padding: 20,
          paddingVertical: 10,
          borderRadius: 5,
          marginTop: 20,
        }}
        onPress={handleSearch}>
        <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
          Search
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          marginTop: 20,
          color: '#4a4a4a',
          fontSize: 18,
          marginLeft: 20,
          color: 'black',
          alignSelf: 'flex-start',
          fontWeight: '700',
        }}>
        Results:
      </Text>
      <Text
        style={{
          marginTop: 20,
          color: '#4a4a4a',
          fontSize: 18,
          borderWidth: 1,
          padding: 20,
          borderRadius: 10,
          width: '90%',
          textTransform: 'capitalize',
          fontWeight: '700',
        }}>
        {result}
      </Text>
    </View>
  );
};

export default Contacts;
