/* eslint-disable no-unused-vars */
/* eslint-disable global-require */
import {
  View, Text, ScrollView, Pressable, Image,
} from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import DropShadow from 'react-native-drop-shadow';
import { Feather } from '@expo/vector-icons';
import SearchBar from '../components/SearchBarServ';
import styles from '../constants/Styles';
import ServNode from '../components/ServiceNode';

const miso = require('../../assets/miso.jpg');

const StatusBarHeight = getStatusBarHeight();

export default function ServicesTab() {
  const [loaded] = useFonts({
    QuicksandBold: require('../../assets/fonts/Quicksand-Bold.ttf'),
    QuicksandLight: require('../../assets/fonts/Quicksand-Light.ttf'),
    QuicksandMedium: require('../../assets/fonts/Quicksand-Medium.ttf'),
    QuicksandRegular: require('../../assets/fonts/Quicksand-Regular.ttf'),
    QuicksandSemiBold: require('../../assets/fonts/Quicksand-SemiBold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (

    <View style={{
      flex: 1, backgroundColor: '#69A297',
    }}
    >
      <View style={{ backgroundColor: '#e0777d', height: StatusBarHeight }} />
      <View style={[styles.containerMap, { backgroundColor: '#69A297' }]}>

        <ScrollView contentInset={{ bottom: 150 }} style={{ marginTop: 90 }}>
          <ServNode />
          <ServNode />
          <ServNode />
          <ServNode />
          <ServNode />
          <ServNode />
          <ServNode />
        </ScrollView>
        <View style={styles.search}>
          <SearchBar />
        </View>
      </View>
    </View>
  );
}
