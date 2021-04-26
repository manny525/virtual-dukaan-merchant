import React, { useState, useEffect } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux'
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import userReducer from './src/store/reducers/user'
import inventoryReducer from './src/store/reducers/inventory'
import AuthScreen from './src/screens/AuthScreen'
import MerchantNavigator from './src/navigations/MerchantNavigator';
import AsyncStorage from '@react-native-community/async-storage'
import getUserFromToken from './src/apiCalls/getUserFromToken';
import ordersReducer from './src/store/reducers/orders';
import serviceRequestReducer from './src/store/reducers/serviceRequest';
import Header from './src/components/Header';

console.disableYellowBox = true;

const rootReducer = combineReducers({
  user: userReducer,
  inventory: inventoryReducer,
  orders: ordersReducer,
  serviceRequest: serviceRequestReducer
})
const store = createStore(rootReducer)

export default function App() {
  const [tokenLoaded, setTokenLoaded] = useState(false)
  const [login, setLogin] = useState(false)
  const [userData, setUserData] = useState(null)

  async function loadToken() {
    try {
      await AsyncStorage.clear()
      const token = await AsyncStorage.getItem('token');
      const _id = await AsyncStorage.getItem('owner');
      if (token !== null) {
        const body = await JSON.stringify({
          _id,
          token
        })
        const user = await getUserFromToken(body)
        if (user.user)
          await setUserData(user)
      }
    } catch (error) {
      console.log(error)
    }
    return Font.loadAsync({
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
      'open-sans': require('./assets/fonts/OpenSans-Regular.ttf')
    })
  }
  if (!tokenLoaded) {
    return <AppLoading
      startAsync={loadToken}
      onFinish={() => setTokenLoaded(true)}
      onError={(err) => console.log(err)}
    />
  }
  const onLogin = (action, userInfo) => {
    if (action === true)
      setUserData(userInfo)
    setLogin(action)
  }
  return (
    <Provider store={store}>
      <Header title='VIRTUAL DUKAAN MERCHANT' />
      {login ? <MerchantNavigator merchantType={userData.user.typeOfMerchant} /> : <AuthScreen setLogin={onLogin} userData={userData} />}
    </Provider>
  )
}
