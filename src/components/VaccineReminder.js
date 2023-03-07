import {
  View, Text, Pressable, Keyboard,
  Platform, TouchableWithoutFeedback,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Modal from 'react-native-modal';
import { Feather } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux';
import dateFormat from 'dateformat';
import lstyles, { pawPink } from '../constants/Styles';
import dstyles, { pawYellow, pawGrey } from '../constants/DarkStyles';

export default function PetCard() {
  const [styles, setStyles] = useState(lstyles);
  const isDarkMode = useSelector((state) => state.settings.darkMode);

  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

  /* toggle ad appointment section modal */
  const [isStatusVisible, setStatusVisible] = useState(false);
  const toggleStatus = () => {
    setStatusVisible(!isStatusVisible);
  };

  return (

    <Pressable style={[styles.healthContainer, { paddingBottom: 20 }]}>
      <Text style={styles.healthHeader}>Vaccine Status</Text>
      <View
        style={styles.healthDivider}
      />
      <View style={{ flex: 2 }}>
        <Pressable onPress={toggleStatus}>
          <View style={styles.appointmentPiece}>
            <Text style={styles.appointmentText}>
              Miso
            </Text>
            <Text style={styles.appointmentText}>
              Status
            </Text>
          </View>
        </Pressable>

        <Pressable onPress={toggleStatus}>
          <View style={styles.appointmentPiece}>
            <Text style={styles.appointmentText}>
              Miso
            </Text>
            <Text style={styles.appointmentText}>
              Status
            </Text>
          </View>
        </Pressable>

        <Modal
          isVisible={isStatusVisible}
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
                  onPress={toggleStatus}
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
                    name="activity"
                    size={100}
                    color={pawGrey}
                    style={styles.settingsIcon}
                  />
                </View>

                {/* Dog Vaccines */}
                <Pressable style={[styles.healthContainer, { paddingBottom: 20 }]}>
                  <View style={styles.appointmentPiece}>
                    <Text style={styles.vaccineText}>
                      Distemper
                    </Text>
                    <Text style={styles.activeVaccine}>
                      {dateFormat(new Date(), 'm/d/yy')}
                    </Text>
                  </View>

                  <View style={styles.appointmentPiece}>
                    <Text style={styles.vaccineText}>
                      Hepititus
                    </Text>
                    <Text style={styles.expiredVaccine}>
                      {dateFormat(new Date(), 'm/d/yy')}
                    </Text>
                  </View>

                  <View style={styles.appointmentPiece}>
                    <Text style={styles.vaccineText}>
                      Parvovirus
                    </Text>
                    <Text style={styles.activeVaccine}>
                      {dateFormat(new Date(), 'm/d/yy')}
                    </Text>
                  </View>

                  <View style={styles.appointmentPiece}>
                    <Text style={styles.vaccineText}>
                      Parainfluenza
                    </Text>
                    <Text style={styles.activeVaccine}>
                      {dateFormat(new Date(), 'm/d/yy')}
                    </Text>
                  </View>

                  <View style={styles.appointmentPiece}>
                    <Text style={styles.vaccineText}>
                      Rabies
                    </Text>
                    <Text style={styles.activeVaccine}>
                      {dateFormat(new Date(), 'm/d/yy')}
                    </Text>
                  </View>

                  <View style={styles.appointmentPiece}>
                    <Text style={styles.vaccineText}>
                      Leptospirosis
                    </Text>
                    <Text style={styles.activeVaccine}>
                      {dateFormat(new Date(), 'm/d/yy')}
                    </Text>
                  </View>

                  <View style={styles.appointmentPiece}>
                    <Text style={styles.vaccineText}>
                      Bordetella
                    </Text>
                    <Text style={styles.activeVaccine}>
                      {dateFormat(new Date(), 'm/d/yy')}
                    </Text>
                  </View>
                </Pressable>

                {/* Cat Vaccines */}
                <Pressable style={[styles.healthContainer, { paddingBottom: 20 }]}>
                  <View style={styles.appointmentPiece}>
                    <Text style={styles.vaccineText}>
                      Calicivirus
                    </Text>
                    <Text style={styles.expiredVaccine}>
                      {dateFormat(new Date(), 'm/d/yy')}
                    </Text>
                  </View>

                  <View style={styles.appointmentPiece}>
                    <Text style={styles.vaccineText}>
                      Feline Leukemia
                    </Text>
                    <Text style={styles.activeVaccine}>
                      {dateFormat(new Date(), 'm/d/yy')}
                    </Text>
                  </View>

                  <View style={styles.appointmentPiece}>
                    <Text style={styles.vaccineText}>
                      Rabies
                    </Text>
                    <Text style={styles.expiredVaccine}>
                      {dateFormat(new Date(), 'm/d/yy')}
                    </Text>
                  </View>

                  <View style={styles.appointmentPiece}>
                    <Text style={styles.vaccineText}>
                      Rhinotracheitis
                    </Text>
                    <Text style={styles.activeVaccine}>
                      {dateFormat(new Date(), 'm/d/yy')}
                    </Text>
                  </View>

                  <View style={styles.appointmentPiece}>
                    <Text style={styles.vaccineText}>
                      Panleukopenia
                    </Text>
                    <Text style={styles.activeVaccine}>
                      {dateFormat(new Date(), 'm/d/yy')}
                    </Text>
                  </View>
                </Pressable>
              </View>
            </KeyboardAwareScrollView>
          </TouchableWithoutFeedback>
        </Modal>

      </View>
    </Pressable>
  );
}
