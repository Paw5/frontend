import {
  View, Text, Dimensions, Pressable, Image, TouchableWithoutFeedback,
  ScrollView, Platform, TextInput,
  Keyboard,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Modal from 'react-native-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import lstyles, {
  pawPink, pawGrey, pawWhite,
} from '../constants/Styles';
import dstyles, { pawLightGrey, pawYellow, pawGreen } from '../constants/DarkStyles';

const miso = require('../../assets/petPhotos/miso.jpg');

export default function AccountCard() {
  const [styles, setStyles] = useState(lstyles);
  const isDarkMode = useSelector((state) => state.settings.darkMode);

  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

  /* toggle edit pet section modal */
  const [isEditVisible, setEditVisible] = useState(false);
  const toggleEdit = () => {
    setEditVisible(!isEditVisible);
  };

  return (

    <View style={styles.transparentBG}>
      <Pressable onPress={toggleEdit} style={styles.accountCard}>
        <Image
          style={styles.accountImage}
          source={miso}
        />
        <View style={styles.accountHeaderView}>
          <Text
            style={styles.accountHeader}
          >
            Miso
          </Text>
          <Pressable>
            <Feather
              name="settings"
              size={30}
              color={isDarkMode === 'light' ? pawGreen : pawPink}
              style={styles.indianRedXCircle}
            />
          </Pressable>
        </View>
      </Pressable>

      {/* edit pet modal */}
      <Modal
        isVisible={isEditVisible}
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
                onPress={toggleEdit}
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
                <View style={{ justifyContent: 'flex-end' }}>
                  <Image
                    resizeMode="cover"
                    style={styles.profileIcon}
                    source={miso}
                  />
                  <Pressable>
                    <Feather
                      name="camera"
                      size={30}
                      color={isDarkMode === 'light' ? pawLightGrey : pawPink}
                      style={styles.cameraIcon}
                    />
                  </Pressable>
                </View>
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ marginBottom: Platform.OS === 'android' ? 30 : 30 }}
              >

                <View style={[styles.menuItem, styles.usernameField]}>
                  <Text
                    adjustsFontSizeToFit
                    numberOfLines={1}
                    style={[styles.menuText, styles.usernameFont]}
                  >
                    Miso
                  </Text>
                </View>

                <Pressable style={[styles.menuItem, { width: Dimensions.get('window').width - 40 }]}>
                  <Text
                    style={[styles.menuText, styles.accountFields]}
                  >
                    Color
                  </Text>
                  <TextInput
                    autoCorrect={false}
                    clearTextOnFocus
                    autoCapitalize="words"
                    placeholder="Color"
                    placeholderTextColor={isDarkMode === 'light' ? pawYellow : pawGrey}
                    style={[styles.menuText, { fontSize: 22, width: 'auto' }]}
                  />
                </Pressable>

                <Pressable style={[styles.menuItem, { width: Dimensions.get('window').width - 40 }]}>
                  <Text
                    style={[styles.menuText, styles.accountFields]}
                  >
                    Weight
                  </Text>
                  <View style={{ flexDirection: 'row', alignContent: 'space-around' }}>
                    <TextInput
                      autoCorrect={false}
                      clearTextOnFocus
                      keyboardType="decimal-pad"
                      inputMode="number"
                      placeholder="Weight"
                      placeholderTextColor={isDarkMode === 'light' ? pawYellow : pawGrey}
                      style={[styles.menuText, { fontSize: 22, width: 'auto', paddingRight: 5 }]}
                    />
                    <Text style={[styles.menuText, { fontSize: 22, width: 'auto', textTransform: 'lowercase' }]}>
                      lbs
                    </Text>
                  </View>
                </Pressable>

                <Pressable style={[styles.menuItem, { width: Dimensions.get('window').width - 40 }]}>
                  <Text
                    style={[styles.menuText, styles.accountFields]}
                  >
                    Microchip ID
                  </Text>
                  <TextInput
                    autoCorrect={false}
                    clearTextOnFocus
                    keyboardType="number-pad"
                    inputMode="number"
                    placeholder="ID Number"
                    placeholderTextColor={isDarkMode === 'light' ? pawYellow : pawGrey}
                    style={[styles.menuText, { fontSize: 22, width: 'auto' }]}
                  />
                </Pressable>

                <Pressable style={[styles.submitbutton, { width: Dimensions.get('window').width - 40 }]}>
                  <Text
                    style={styles.submittext}
                  >
                    Submit
                  </Text>
                </Pressable>

                <Pressable style={[styles.submitbutton, { width: Dimensions.get('window').width - 40, backgroundColor: isDarkMode === 'light' ? '#d94545' : '#b81d1d' }]}>
                  <Text
                    style={[styles.submittext, { color: pawWhite }]}
                  >
                    Delete Pet
                  </Text>
                </Pressable>
              </ScrollView>
            </View>
          </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
