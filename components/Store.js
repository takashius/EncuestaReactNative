import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

  const AuthContext = React.createContext();

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      console.log(e);
    }
  }

  const getData = async (key) => {
    let value;
    try {
      await AsyncStorage.getItem(key)
      .then( (val) => {
        if(val !== null) {
            value = val;
          }
      })
      
    } catch(e) {
      console.log(e);
    }

    return value;
  }

  const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      // clear error
    }
  
    console.log('Done.')
  }

  export {
    storeData,
    getData,
    clearAll,
    AuthContext
  }