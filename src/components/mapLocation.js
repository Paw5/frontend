import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Marker } from 'react-native-maps';
import lstyles from '../constants/Styles';
import dstyles from '../constants/DarkStyles';

const mapPin = require('../../assets/map_pin_s.png');
const mapPinD = require('../../assets/map_pin_s_d.png');

export default function mapLocation({ pressAction, coords }) {
  // eslint-disable-next-line no-unused-vars
  const [styles, setStyles] = useState(lstyles);
  const isDarkMode = useSelector((state) => state.settings.darkMode);

  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

  return (
    <Marker
      coordinate={{
        latitude: coords.y,
        longitude: coords.x,
      }}
      image={isDarkMode === 'light' ? mapPinD : mapPin}
      onPress={pressAction}
    />
  );
}
