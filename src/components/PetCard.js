import {
  Text, Pressable, Image, View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import lstyles from '../constants/Styles';
import dstyles from '../constants/DarkStyles';

const miso = require('../../assets/petPhotos/miso.jpg');

export default function PetCard({ pet }) {
  const [styles, setStyles] = useState(lstyles);
  const isDarkMode = useSelector((state) => state.settings.darkMode);
  const { pet_name: petName } = pet;

  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

  return (

    <View style={styles.transparentBG}>
      <Pressable style={styles.petCard}>
        <Image
          style={styles.petImage}
          source={miso}
        />
        <Text style={styles.petHeader}>{petName}</Text>

      </Pressable>
    </View>
  );
}
