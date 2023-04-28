import {
  View, Text, Pressable, Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import lstyles, { pawGrey } from '../constants/Styles';
import dstyles, { pawYellow } from '../constants/DarkStyles';

const miso = require('../../assets/petPhotos/miso.jpg');

export default function ServNode({
  name, rate, desc, pf,
}) {
  const [styles, setStyles] = useState(lstyles);
  const isDarkMode = useSelector((state) => state.settings.darkMode);
  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

  return (
    <View>
      <Pressable style={[styles.servContainer, { height: 125 }]}>
        <View
          style={styles.servLeft}
        >
          <Image
            style={styles.servImage}
            source={miso}
          />
          <View
            style={styles.servCheck}
          >
            <Feather
              name={pf === 1 ? 'check' : 'x'}
              size={24}
              color={isDarkMode === 'light' ? pawYellow : pawGrey}
              style={{ alignSelf: 'center' }}
            />

          </View>
        </View>
        <Text style={styles.servHeader}>{name}</Text>
        <Text style={styles.servHeader2}>Service Type</Text>
        <Feather
          name="star"
          size={20}
          color={rate >= 1 ? pawYellow : pawGrey}
          style={styles.servStar1}
        />
        <Feather
          name="star"
          size={20}
          color={rate >= 2 ? pawYellow : pawGrey}
          style={styles.servStar2}
        />
        <Feather
          name="star"
          size={20}
          color={rate >= 3 ? pawYellow : pawGrey}
          style={styles.servStar3}
        />
        <Feather
          name="star"
          size={20}
          color={rate >= 4 ? pawYellow : pawGrey}
          style={styles.servStar4}
        />
        <Feather
          name="star"
          size={20}
          color={rate === 5 ? pawYellow : pawGrey}
          style={styles.servStar5}
        />
        <View
          style={styles.servicesLine}
        />
        <Text style={styles.servHeader2}>{desc}</Text>
      </Pressable>

      {/* </DropShadow> */}
    </View>
  );
}
