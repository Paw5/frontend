import {
  Text, Pressable, View, Linking,
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import lstyles, { pawGrey } from '../constants/Styles';
import dstyles, { pawYellow } from '../constants/DarkStyles';

export default function NewsTab({ article }) {
  const [styles, setStyles] = useState(lstyles);
  const isDarkMode = useSelector((state) => state.settings.darkMode);

  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

  const openLink = useCallback(async () => {
    const supported = await Linking.canOpenURL(article.url);

    if (supported) {
      await Linking.openURL(article.url);
    }
  });

  return (

    <Pressable style={styles.newsTab}>
      <Text style={styles.newsHeader}>{article.title}</Text>

      <View
        style={styles.eventBottomBorder}
      />

      <View style={styles.eventTextView}>
        <Text style={styles.eventText} numberOfLines={4}>
          {article.body}
        </Text>

        <Pressable onPress={openLink}>
          <Feather
            name="arrow-right-circle"
            size={30}
            color={isDarkMode === 'light' ? pawYellow : pawGrey}
            style={{ alignSelf: 'center' }}
          />
        </Pressable>
      </View>
    </Pressable>
  );
}
