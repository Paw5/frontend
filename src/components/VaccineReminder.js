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
import Network from '../util/Network';
import lstyles, { pawPink } from '../constants/Styles';
import dstyles, { pawYellow, pawGrey } from '../constants/DarkStyles';

const _ = Network();

export default function VaccineReminder({ pets }) {
  const [styles, setStyles] = useState(lstyles);
  const isDarkMode = useSelector((state) => state.settings.darkMode);
  const [petList, setPetList] = useState([]);
  const [currentPet, setCurrentPet] = useState();
  const [arePetsLoaded, setPetsLoaded] = useState(false);

  if (pets.length && !arePetsLoaded) {
    setPetList(pets);
    setPetsLoaded(true);
    setCurrentPet(pets[0]);
  }

  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

  /* toggle ad appointment section modal */
  const [isStatusVisible, setStatusVisible] = useState(false);
  const toggleStatus = () => {
    setStatusVisible(!isStatusVisible);
  };

  const [areVaccinesLoaded, setVaccinesLoaded] = useState(false);
  const [setCurrentVaccinations] = useState([]);

  const openStatus = () => {
    setVaccinesLoaded(false);
    toggleStatus();
  };

  const dogVaccinations = ['Distemper', 'Hepititus', 'Parvovirus', 'Parainfluenza', 'Rabies', 'Leptospirosis', 'Bordetella'];
  const catVaccinations = ['Calicivirus', 'Feline Leukemia', 'Rabies', 'Rhinotracheitis', 'Panleukopenia'];

  // eslint-disable-next-line consistent-return
  function displayVaccineList() {
    if (currentPet) {
      if (!areVaccinesLoaded) {
        _.get('vaccinations', {
          params: {
            pet_id: currentPet.pet_id,
          },
        }).then((results) => {
          const vaccinations = results.data().results;

          setCurrentVaccinations(vaccinations);
          setVaccinesLoaded(true);
        });
      }

      if (currentPet.type === 'dog') {
        return (
          dogVaccinations.map((vaccination) => (
            <View style={styles.appointmentPiece}>
              <Text style={styles.vaccineText}>
                {vaccination}
              </Text>
              <Text style={styles.expiredVaccine}>
                {dateFormat(new Date(), 'm/d/yy')}
              </Text>
            </View>
          ))
        );
      }
      return (
        catVaccinations.map((vaccination) => (
          <View style={styles.appointmentPiece}>
            <Text style={styles.vaccineText}>
              {vaccination}
            </Text>
            <Text style={styles.expiredVaccine}>
              {dateFormat(new Date(), 'm/d/yy')}
            </Text>
          </View>
        ))
      );
    }
  }

  return (

    <Pressable style={[styles.healthContainer, { paddingBottom: 20 }]}>
      <Text style={styles.healthHeader}>Vaccine Status</Text>
      <View
        style={styles.healthDivider}
      />
      <View style={{ flex: 2 }}>

        {petList.map((pet, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Pressable onPress={() => { setCurrentPet(pet); openStatus(); }} id={pet} key={`pet-line-${index}`}>
            <View style={styles.appointmentPiece}>
              <Text style={styles.appointmentText}>
                {pet.pet_name}
              </Text>
              <Text style={styles.appointmentText}>
                Status
              </Text>
            </View>
          </Pressable>
        ))}

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
                  onPress={() => { toggleStatus(); }}
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

                <View style={[styles.healthContainer, { paddingBottom: 20 }]}>

                  {displayVaccineList()}

                </View>
              </View>
            </KeyboardAwareScrollView>
          </TouchableWithoutFeedback>
        </Modal>

      </View>
    </Pressable>
  );
}
