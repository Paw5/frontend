import {
  Text, Pressable, View, Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import lstyles, { pawGrey } from '../constants/Styles';
import dstyles from '../constants/DarkStyles';

const arrowRightIcon = require('../../assets/paw5_icons/arrow-r.png');

export default function NewsTab() {
  const [styles, setStyles] = useState(lstyles);
  const isDarkMode = useSelector((state) => state.settings.darkMode);

  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

  return (

    <Pressable style={styles.newsTab}>
      <Text style={styles.newsHeader}>Breaking News!</Text>

      <View
        style={styles.eventBottomBorder}
      />

      <View style={styles.eventTextView}>
        <Text style={styles.eventText} numberOfLines={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo conquat. Duiaute irure
          dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </Text>

        <Image
          style={{
            height: 45, width: 35, tintColor: pawGrey, alignSelf: 'center',
          }}
          source={arrowRightIcon}
        />
      </View>
    </Pressable>
  );
}
