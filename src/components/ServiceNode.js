import {
  View, Text, Pressable, Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import lstyles, { pawGrey } from '../constants/Styles';
import dstyles, { pawYellow } from '../constants/DarkStyles';

const miso = require('../../assets/petPhotos/miso.jpg');
const star = require('../../assets/paw5_icons/star_line.png');

export default function ServNode() {
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
              name="check"
              size={24}
              color={isDarkMode === 'light' ? pawYellow : pawGrey}
              style={{ alignSelf: 'center' }}
            />

          </View>
        </View>
        <Text style={styles.servHeader}>Location Name</Text>
        <Text style={styles.servHeader2}>Service Type</Text>
        <Image
          style={[styles.servStar1, { height: 35, width: 35, tintColor: pawGrey }]}
          source={star}
        />
        <Image
          style={[styles.servStar2, { height: 35, width: 35, tintColor: pawGrey }]}
          source={star}
        />
        <Image
          style={[styles.servStar3, { height: 35, width: 35, tintColor: pawGrey }]}
          source={star}
        />
        <Image
          style={[styles.servStar4, { height: 35, width: 35, tintColor: pawGrey }]}
          source={star}
        />
        <Image
          style={[styles.servStar5, {
            height: 35, width: 35, tintColor: pawGrey,
          }]}
          source={star}
        />

        <View
          style={styles.servicesLine}
        />
        <Text style={styles.servHeader2}>Descriptive Text</Text>
      </Pressable>

      {/* </DropShadow> */}
    </View>
  );
}
