import {
  View, ScrollView, Platform,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../components/SearchBarServ';
import lstyles from '../constants/Styles';
import dstyles from '../constants/DarkStyles';
import ServNode from '../components/ServiceNode';
import Network from '../util/Network';
import { setHasLoaded } from '../redux/ServicesSlice';

const _ = Network();

export default function ServicesTab() {
  const [styles, setStyles] = useState(lstyles);
  const isDarkMode = useSelector((state) => state.settings.darkMode);
  const hasLoaded = useSelector((state) => state.servicesLoader.hasLoaded);
  const [servItems, setServItems] = useState(() => []);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

  if (!hasLoaded) {
    _.get('locations').then((results) => {
      const locations = results.data();
      setServItems(locations);
      dispatch(setHasLoaded(true));
    });
  }

  return (

    <View style={styles.background}>
      <View style={styles.statusBar} />
      <View style={styles.search}>
        <SearchBar />
      </View>
      <View style={styles.containerMap}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: Platform.OS === 'android' ? 170 : 190 }}
        >
          { /* eslint-disable-next-line max-len */}
          { servItems.map((location) => <ServNode name={location.name} rate={location.rating} desc={location.description} pf={location.pet_friendly} />) }
        </ScrollView>
      </View>
    </View>
  );
}
