import {
  View, Text, Pressable, TextInput, Dimensions, Platform,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Modal from 'react-native-modal';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useSelector } from 'react-redux';
import lstyles, {
  pawPink, pawWhite,
} from '../constants/Styles';
import dstyles, {
  pawYellow, pawGrey, pawGreen, pawLightGrey,
} from '../constants/DarkStyles';

export default function PetCard() {
  const [styles, setStyles] = useState(lstyles);
  const isDarkMode = useSelector((state) => state.settings.darkMode);
  // const { pet_name: petName } = pet;

  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

  const [breakfast, setBreakfast] = useState(false);
  const [medicine, setMedicine] = useState(false);
  const [walk, setWalk] = useState(false);
  const [dinner, setDinner] = useState(false);

  /* toggle add goal section modal */
  const [isAddReminderVisible, setAddReminderVisible] = useState(false);
  const toggleAddReminder = () => {
    setAddReminderVisible(!isAddReminderVisible);
  };

  const [reminderAdded, showReminderAdded] = useState(false);
  const toggleAddSuccess = () => {
    showReminderAdded(!reminderAdded);
  };

  const closeAdd = () => {
    showReminderAdded(false);
    setAddReminderVisible(false);
  };

  return (

    <Pressable style={[styles.healthContainer, { paddingBottom: 20 }]}>
      <Text style={styles.healthHeader}>Daily Reminders</Text>
      <View
        style={styles.healthDivider}
      />
      <View style={{ flex: 2 }}>
        <View style={styles.appointmentPiece}>
          <Text style={styles.appointmentText}>
            Breakfast?
          </Text>
          <BouncyCheckbox
            isChecked={breakfast}
            disableBuiltInState
            fillColor={isDarkMode === 'light' ? pawGreen : pawPink}
            onPress={() => setBreakfast(!breakfast)}
            style={{ marginRight: -10 }}
          />
        </View>

        <View style={styles.appointmentPiece}>
          <Text style={styles.appointmentText}>
            Medicine?
          </Text>
          <BouncyCheckbox
            isChecked={medicine}
            disableBuiltInState
            fillColor={isDarkMode === 'light' ? pawGreen : pawPink}
            onPress={() => setMedicine(!medicine)}
            style={{ marginRight: -10 }}
          />
        </View>

        <View style={styles.appointmentPiece}>
          <Text style={styles.appointmentText}>
            Walk?
          </Text>
          <BouncyCheckbox
            isChecked={walk}
            disableBuiltInState
            fillColor={isDarkMode === 'light' ? pawGreen : pawPink}
            onPress={() => setWalk(!walk)}
            style={{ marginRight: -10 }}
          />
        </View>

        <View style={styles.appointmentPiece}>
          <Text style={styles.appointmentText}>
            Dinner?
          </Text>
          <BouncyCheckbox
            isChecked={dinner}
            disableBuiltInState
            fillColor={isDarkMode === 'light' ? pawGreen : pawPink}
            onPress={() => setDinner(!dinner)}
            style={{ marginRight: -10 }}
          />
        </View>

        <Pressable
          style={[styles.addAppointment, { marginBottom: 0, marginTop: 15 }]}
          onPress={toggleAddReminder}
        >
          <Text style={styles.appointmentButton}>
            Add Reminder
          </Text>
        </Pressable>

        <Modal
          isVisible={isAddReminderVisible}
          onBackdropPress={toggleAddReminder}
          animationIn="fadeInUp"
          animationInTiming={200}
          animationOut="fadeOutDown"
          animationOutTiming={200}
          style={{ margin: 0 }}
        >
          <View style={{
            backgroundColor: isDarkMode === 'light' ? pawLightGrey : pawWhite, padding: 30, paddingBottom: 10, borderRadius: 50,
          }}
          >
            <Pressable style={[styles.menuItem, { width: Dimensions.get('window').width - 40, backgroundColor: isDarkMode === 'light' ? pawYellow : pawGreen }]}>
              <Text
                style={[styles.menuText, styles.accountFields, { color: isDarkMode === 'light' ? pawGrey : pawWhite }]}
              >
                Reminder Name
              </Text>
              <TextInput
                autoCorrect={false}
                clearTextOnFocus
                autoCapitalize="words"
                placeholder="Name"
                placeholderTextColor={isDarkMode === 'light' ? pawGrey : pawGrey}
                style={[styles.menuText, { fontSize: 22, width: 'auto', marginRight: Platform.OS === 'android' ? 20 : 0 }]}
              />
            </Pressable>

            <Pressable
              style={[styles.submitbutton, { width: Dimensions.get('window').width - 40 }]}
              onPress={toggleAddSuccess}
            >
              <Text
                style={styles.submittext}
              >
                Add Reminder
              </Text>
            </Pressable>

            <AwesomeAlert
              show={reminderAdded}
              title="Goal Added!"
              confirmText="Yay!"
              titleStyle={styles.alertText}
              contentContainerStyle={styles.alertBackground}
              showConfirmButton
              confirmButtonTextStyle={styles.confirmButton}
              onConfirmPressed={closeAdd}
              style={{ borderRadius: 50, overflow: 'hidden' }}
              confirmButtonColor={isDarkMode === 'light' ? pawGreen : pawPink}
            />

            <Pressable
              style={[styles.submitbutton, { width: Dimensions.get('window').width - 40, backgroundColor: isDarkMode === 'light' ? '#d94545' : '#b81d1d' }]}
              onPress={toggleAddReminder}
            >
              <Text
                style={styles.submittext}
              >
                Cancel
              </Text>
            </Pressable>
          </View>
        </Modal>

      </View>
    </Pressable>
  );
}
