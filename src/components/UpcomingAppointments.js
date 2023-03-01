import {
  View, Text, Dimensions, Pressable, TouchableWithoutFeedback,
  Platform, TextInput, Keyboard,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Modal from 'react-native-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Feather } from '@expo/vector-icons';
import DatePicker, { getToday } from 'react-native-modern-datepicker';
import dateFormat from 'dateformat';
import { useSelector } from 'react-redux';
import lstyles, {
  pawPink,
} from '../constants/Styles';
import dstyles, { pawYellow, pawGrey } from '../constants/DarkStyles';

export default function PetCard() {
  const [styles, setStyles] = useState(lstyles);
  const isDarkMode = useSelector((state) => state.settings.darkMode);

  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

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

  const [selectedDate, setSelectedDate] = useState(dateFormat(new Date(), 'mm/dd/yyyy\nh:MM tt'));

  return (

    <Pressable style={styles.healthContainer}>
      <Text style={styles.healthHeader}>Upcoming Appointments</Text>
      <View
        style={styles.healthDivider}
      />
      <View style={{ flex: 2 }}>
        <View style={styles.appointmentPiece}>
          <Text style={styles.appointmentText}>
            Appointment Name
          </Text>
          <Text style={styles.appointmentText}>
            Date
          </Text>
        </View>

        <View style={styles.appointmentPiece}>
          <Text style={styles.appointmentText}>
            Appointment Name
          </Text>
          <Text style={styles.appointmentText}>
            Date
          </Text>
        </View>

      </View>

      <Pressable onPress={toggleAdd} style={styles.addAppointment}>
        <Text style={styles.appointmentButton}>
          Add New Appointment
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
                  name="calendar"
                  size={100}
                  color={pawGrey}
                  style={styles.settingsIcon}
                />
              </View>

              <Pressable style={[styles.menuItem, { width: Dimensions.get('window').width - 40 }]}>
                <Text
                  style={[styles.menuText, styles.accountFields]}
                >
                  Name
                </Text>
                <TextInput
                  autoCorrect={false}
                  clearTextOnFocus
                  autoCapitalize="words"
                  placeholder="Name"
                  placeholderTextColor={isDarkMode === 'light' ? pawYellow : pawGrey}
                  style={[styles.menuText, { fontSize: 22, width: 'auto' }]}
                />
              </Pressable>

              <Pressable style={[styles.menuItem, { width: Dimensions.get('window').width - 40 }]}>
                <Text
                  style={[styles.menuText, styles.accountFields]}
                >
                  Location
                </Text>
                <TextInput
                  autoCorrect={false}
                  clearTextOnFocus
                  autoCapitalize="words"
                  placeholder="Location"
                  placeholderTextColor={isDarkMode === 'light' ? pawYellow : pawGrey}
                  style={[styles.menuText, { fontSize: 22, width: 'auto' }]}
                />
              </Pressable>

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
                  {dateFormat(selectedDate, 'mm/dd/yyyy\nh:MM tt')}
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
                    current={getToday()}
                    selected={getToday()}
                    onSelectedChange={(date) => {
                      setSelectedDate(date);
                    }}
                  />
                </Modal>
              </Pressable>
            </View>
          </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
      </Modal>
    </Pressable>
  );
}
