import {
  View, Text, Dimensions, Pressable, TouchableWithoutFeedback,
  Platform, TextInput, Keyboard,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Modal from 'react-native-modal';
import { Feather } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LineChart } from 'react-native-chart-kit';
import { useSelector } from 'react-redux';
import DatePicker, { getToday } from 'react-native-modern-datepicker';
import dateFormat from 'dateformat';
import lstyles, {
  pawGreen, pawPink, pawWhite,
} from '../constants/Styles';
import dstyles, { pawYellow, pawGrey } from '../constants/DarkStyles';

const lightChart = (opacity = 1) => `rgba(105, 162, 151, ${opacity})`;
const darkChart = (opacity = 1) => `rgba(237, 174, 73, ${opacity})`;
const lightDots = () => pawPink;
const darkDots = () => pawGreen;

export default function WalkGraph() {
  const [styles, setStyles] = useState(lstyles);
  const isDarkMode = useSelector((state) => state.settings.darkMode);

  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

  const [selectedDate, setSelectedDate] = useState(dateFormat(new Date(), 'mm/dd/yyyy'));

  /* toggle add appointment section modal */
  const [isAddVisible, setAddVisible] = useState(false);
  const toggleAdd = () => {
    setAddVisible(!isAddVisible);
  };

  /* toggle date modal */
  const [isDateVisible, setDateVisible] = useState(false);
  const toggleDate = () => {
    setDateVisible(!isDateVisible);
  };

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: isDarkMode === 'light' ? darkDots : lightDots,
        strokeWidth: 1,
      },
    ],
    legend: ['Walking Distance'],
  };

  const chartConfig = {
    backgroundGradientFrom: pawWhite,
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: pawWhite,
    backgroundGradientToOpacity: 0,
    color: isDarkMode === 'light' ? darkChart : lightChart,
    fillShadowGradient: isDarkMode === 'light' ? pawWhite : pawGreen,
    fillShadowGradientTo: isDarkMode === 'light' ? pawWhite : pawGreen,
  };

  return (

    <Pressable style={styles.healthContainer}>
      <Text style={styles.healthHeader}>Walk Data</Text>
      <View
        style={styles.healthDivider}
      />

      <LineChart
        style={{ marginTop: 10 }}
        data={data}
        width={Dimensions.get('window').width - 40}
        height={220}
        withShadow="false"
        chartConfig={chartConfig}
      />

      <Pressable onPress={toggleAdd} style={styles.addAppointment}>
        <Text style={styles.appointmentButton}>
          Add Walk Information
        </Text>
      </Pressable>

      <Modal
        isVisible={isAddVisible}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        hasBackdrop={false}
        style={styles.accountModal}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <KeyboardAwareScrollView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <View>
              <Pressable
                onPress={toggleAdd}
                style={{ alignSelf: 'flex-start' }}
              >
                <Feather
                  name="chevron-left"
                  size={30}
                  color={isDarkMode === 'light' ? pawYellow : pawPink}
                  style={styles.exitButton}
                />

              </Pressable>

              <View>
                <Feather
                  name="map"
                  size={100}
                  color={pawGrey}
                  style={styles.settingsIcon}
                />
              </View>

              <Pressable
                style={[styles.breedBubble, { width: Dimensions.get('window').width - 40 }]}
                onPress={toggleDate}
              >
                <Text
                  style={[styles.breedHeader, { paddingTop: 20 }]}
                >
                  Date
                </Text>
                <Text
                  style={styles.breedSelection}
                >
                  {dateFormat(selectedDate, 'mm/dd/yyyy')}
                </Text>

                <Modal
                  isVisible={isDateVisible}
                  onBackdropPress={toggleDate}
                  animationIn="fadeInUp"
                  animationInTiming={200}
                  animationOut="fadeOutDown"
                  animationOutTiming={200}
                >
                  <DatePicker
                    options={styles.datePicker}
                    style={styles.dateContainer}
                    mode="calendar"
                    current={getToday()}
                    selected={getToday()}
                    onSelectedChange={(date) => {
                      setSelectedDate(date);
                    }}
                  />
                </Modal>
              </Pressable>

              <Pressable style={[styles.menuItem, { width: Dimensions.get('window').width - 40 }]}>
                <Text
                  style={[styles.menuText, styles.accountFields]}
                >
                  Walk Time
                </Text>
                <View style={{ flexDirection: 'row', alignContent: 'space-around' }}>
                  <TextInput
                    autoCorrect={false}
                    clearTextOnFocus
                    keyboardType="decimal-pad"
                    inputMode="number"
                    placeholder="00"
                    placeholderTextColor={isDarkMode === 'light' ? pawYellow : pawGrey}
                    style={[styles.menuText, { fontSize: 22, width: 'auto', paddingRight: 5 }]}
                  />
                  <Text style={[styles.menuText, { fontSize: 22, width: 'auto', textTransform: 'lowercase' }]}>
                    mins
                  </Text>
                </View>
              </Pressable>

              <Pressable style={[styles.menuItem, { width: Dimensions.get('window').width - 40 }]}>
                <Text
                  style={[styles.menuText, styles.accountFields]}
                >
                  Walk Distance
                </Text>
                <View style={{ flexDirection: 'row', alignContent: 'space-around' }}>
                  <TextInput
                    autoCorrect={false}
                    clearTextOnFocus
                    keyboardType="decimal-pad"
                    inputMode="number"
                    placeholder="00"
                    placeholderTextColor={isDarkMode === 'light' ? pawYellow : pawGrey}
                    style={[styles.menuText, { fontSize: 22, width: 'auto', paddingRight: 5 }]}
                  />
                  <Text style={[styles.menuText, { fontSize: 22, width: 'auto', textTransform: 'lowercase' }]}>
                    miles
                  </Text>
                </View>
              </Pressable>

              <Pressable
                style={[styles.submitbutton, { width: Dimensions.get('window').width - 40 }]}
              >
                <Text
                  style={styles.submittext}
                >
                  Add to Graph
                </Text>
              </Pressable>
            </View>
          </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
      </Modal>
    </Pressable>
  );
}
