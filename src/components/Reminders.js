import {
  View, Text, Pressable,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useSelector } from 'react-redux';
import lstyles, { pawPink } from '../constants/Styles';
import dstyles, { pawGreen } from '../constants/DarkStyles';

export default function PetCard({ pet }) {
  const [styles, setStyles] = useState(lstyles);
  const isDarkMode = useSelector((state) => state.settings.darkMode);
  const { pet_name: petName } = pet;
  console.log(petName);

  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

  const [breakfast, setBreakfast] = useState(false);
  const [medicine, setMedicine] = useState(false);
  const [walk, setWalk] = useState(false);
  const [dinner, setDinner] = useState(false);

  return (

    <Pressable style={[styles.healthContainer, { paddingBottom: 20 }]}>
      <Text style={styles.healthHeader}>Reminders</Text>
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

      </View>
    </Pressable>
  );
}
