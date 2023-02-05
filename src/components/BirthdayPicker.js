import {
  View, Text, TouchableHighlight,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import DatePicker, { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import Collapsible from '@eliav2/react-native-collapsible-view';
import lstyles from '../constants/Styles';
import dstyles from '../constants/DarkStyles';

export default function BirthdayPicker() {
  const [styles, setStyles] = useState(lstyles);
  const isDarkMode = useSelector((state) => state.settings.darkMode);

  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

  const [selectedDate, setSelectedDate] = useState(getFormatedDate(getToday(), 'MM/DD/YYYY'));
  return (

    <View>
      <Collapsible
        style={[styles.breedBubble, { }]}
        touchableComponent
        collapsed
        renderChildrenCollapsed
        noArrow
        title={(
          <View>
            <Text
              style={styles.breedHeader}
            >
              Birthday
            </Text>
            <Text
              style={styles.breedSelection}
            >
              {selectedDate}
            </Text>
          </View>
        )}
      >
        <Text />
        <TouchableHighlight>
          <DatePicker
            options={styles.datePicker}
            style={styles.dateContainer}
            current={getToday()}
            selected={getToday()}
            mode="calendar"
            onSelectedChange={(date) => {
              setSelectedDate(getFormatedDate(date, 'MM/DD/YYYY'));
            }}
          />
        </TouchableHighlight>

      </Collapsible>
    </View>
  );
}
