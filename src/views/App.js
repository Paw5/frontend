/* eslint-disable no-nested-ternary */
/* eslint-disable global-require */
// Required imports
import React from 'react';
import { registerRootComponent } from 'expo';
import { Provider } from 'react-redux';
import { LogBox } from 'react-native';
import store from '../redux/Store';
import Base from './Base';

LogBox.ignoreLogs(['Constants.platform.ios.model has been deprecated in favor of expo-device\'s Device.modelName property. This API will be removed in SDK 45.']);

export default function App() {
  return (
    <Provider store={store}>
      <Base />
    </Provider>
  );
}

registerRootComponent(App);
