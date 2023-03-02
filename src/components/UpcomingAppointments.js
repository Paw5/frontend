import {
  View, Text, Dimensions, Pressable, TouchableWithoutFeedback,
  Platform, TextInput, Keyboard,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Feather } from '@expo/vector-icons';
import DatePicker, { getToday } from 'react-native-modern-datepicker';
import dateFormat from 'dateformat';
import * as Calendar from 'expo-calendar';
import lstyles, {
  pawPink,
} from '../constants/Styles';
import dstyles, { pawYellow, pawGrey } from '../constants/DarkStyles';
import { setCalendarID } from '../redux/CalendarSlice';

const calID = '@calendarID';

async function getDefaultCalendarSource() {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  return defaultCalendar.source;
}

async function createCalendar() {
  const defaultCalendarSource = Platform.OS === 'ios'
    ? await getDefaultCalendarSource()
    : { isLocalAccount: true, name: 'Paw5' };
  const newCalendarID = await Calendar.createCalendarAsync({
    title: 'Paw5',
    color: '#69a297',
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: defaultCalendarSource.id,
    source: defaultCalendarSource,
    name: 'internalCalendarName',
    ownerAccount: 'personal',
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
  });

  console.log(`Your new calendar ID is: ${newCalendarID}`);
  return newCalendarID;
}

export default function PetCard() {
  const dispatch = useDispatch();
  const defaultCalendar = useSelector((state) => state.calendar.calendarID);

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem(calID);

      return data;
    } catch (e) {
      return (e);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        dispatch(setCalendarID(createCalendar()));
        AsyncStorage.setItem(calID, defaultCalendar);
        getData();
      }
    })();
  }, []);

  const [formEntry, setFormEntry] = useState({});
  const updateFormEntry = (key, value) => {
    const newFormEntry = formEntry;
    newFormEntry[key] = value;
    setFormEntry(newFormEntry);
  };

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
                  onChangeText={(text) => updateFormEntry('title', text)}
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
                  onChangeText={(text) => updateFormEntry('location', text)}
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
                      updateFormEntry('startDate', date);
                    }}
                  />
                </Modal>
              </Pressable>

              <Pressable
                onPress={console.log(defaultCalendar)}
                style={[styles.submitbutton, { width: Dimensions.get('window').width - 40 }]}
              >
                <Text
                  style={styles.submittext}
                >
                  Add to Calendar
                </Text>
              </Pressable>
            </View>
          </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
      </Modal>
    </Pressable>
  );
}
