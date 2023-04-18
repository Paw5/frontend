/* eslint-disable global-require */
import {
  View, Text, Dimensions, Pressable, Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';
import Network from '../util/Network';
import lstyles, {
  pawPink, pawGrey,
} from '../constants/Styles';
import dstyles, { pawLightGrey, pawYellow, pawGreen } from '../constants/DarkStyles';
import { reload } from '../redux/SettingsSlice';

const miso = require('../../assets/petPhotos/miso.jpg');

const _ = Network();

export default function AccountTab() {
  const [styles, setStyles] = useState(lstyles);
  const isDarkMode = useSelector((state) => state.settings.darkMode);
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(0);

  if (!userId) {
    _.get('login').then((response) => {
      response.onSuccess((results) => {
        setUserId(results.data.user_id);
      });
    });
  }

  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

  const [petCards, setPetCards] = useState(() => []);
  const [hasLoadedPets, setHasLoadedPets] = useState(false);

  if (userId && !petCards.length && !hasLoadedPets) {
    _.get('pets', {
      params: {
        user_id: userId,
      },
    }).then((results) => {
      const pets = results.data().results;

      if (pets.length >= petCards.length) {
        setPetCards(pets);
        setHasLoadedPets(true);
      } else {
        setHasLoadedPets(false);
      }
    });
  }

  /* toggle profile section modal */
  const [isProfileVisible, setProfileVisible] = useState(false);
  const toggleProfile = () => {
    setProfileVisible(!isProfileVisible);
  };

  const [profileEdited, showProfileEdited] = useState(false);
  const toggleProfileSuccess = () => {
    showProfileEdited(!profileEdited);
  };

  const closeProfile = () => {
    showProfileEdited(false);
    setProfileVisible(false);
  };

  const [loggingOut, setLoggingOut] = useState(false);
  const toggleLog = () => {
    setLoggingOut(!loggingOut);
  };

  const logOut = () => {
    toggleLog();
    setTimeout(() => {
      AsyncStorage.removeItem('@loginToken', () => dispatch(reload()));
    }, 1000);
  };

  return (
    <View style={styles.background}>

      <View style={[styles.statusBar, { marginBottom: 30 }]} />
      <View>
        <View style={styles.profileBorder}>
          <Image
            style={styles.profileImage}
            source={miso}
          />
        </View>
      </View>

      <View style={[styles.menuItem, styles.usernameField]}>
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          style={[styles.menuText, styles.usernameFont]}
        >
          UserName
        </Text>
      </View>

      <Pressable onPress={toggleProfile} style={styles.menuItem}>
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          style={styles.menuText}
        >
          Edit Profile
        </Text>
        <Feather
          name="chevron-right"
          size={30}
          color={pawGrey}
          style={{ marginRight: -5 }}
        />

      </Pressable>

      {/* profile options modal */}
      <Modal
        isVisible={isProfileVisible}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        hasBackdrop={false}
        style={styles.accountModal}
      >
        <View>
          <Pressable
            onPress={toggleProfile}
            style={{ alignSelf: 'flex-start' }}
          >
            <Feather
              name="chevron-left"
              size={30}
              color={isDarkMode === 'light' ? pawYellow : pawPink}
              style={[styles.exitButton, { marginBottom: -35 }]}
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

          <Pressable style={[styles.menuItem, { width: Dimensions.get('window').width - 40 }]}>
            <Text
              style={[styles.menuText, styles.accountFields]}
            >
              Username
            </Text>
            <Text
              style={[styles.menuText, { fontSize: 22, width: 'auto' }]}
            >
              Users name
            </Text>
          </Pressable>

          <Pressable style={[styles.menuItem, { width: Dimensions.get('window').width - 40 }]}>
            <Text
              style={[styles.menuText, styles.accountFields]}
            >
              Email
            </Text>
            <Text
              style={[styles.menuText, { fontSize: 22, width: 'auto' }]}
            >
              Users email
            </Text>
          </Pressable>

          <Pressable style={[styles.menuItem, { width: Dimensions.get('window').width - 40 }]}>
            <Text
              style={[styles.menuText, styles.accountFields]}
            >
              First Name
            </Text>
            <Text
              style={[styles.menuText, { fontSize: 22, width: 'auto' }]}
            >
              Users name
            </Text>
          </Pressable>

          <Pressable style={[styles.menuItem, { width: Dimensions.get('window').width - 40 }]}>
            <Text
              style={[styles.menuText, styles.accountFields]}
            >
              Last Name
            </Text>
            <Text
              style={[styles.menuText, { fontSize: 22, width: 'auto' }]}
            >
              Users name
            </Text>
          </Pressable>

          <Pressable style={[styles.menuItem, { width: Dimensions.get('window').width - 40 }]}>
            <Text
              style={[styles.menuText, styles.accountFields]}
            >
              Date of Birth
            </Text>
            <Text
              style={[styles.menuText, { fontSize: 22, width: 'auto' }]}
            >
              Date
            </Text>
          </Pressable>

          <Pressable style={[styles.menuItem, { width: Dimensions.get('window').width - 40 }]}>
            <Text
              style={[styles.menuText, styles.accountFields]}
            >
              Location
            </Text>
            <Text
              style={[styles.menuText, { fontSize: 22, width: 'auto' }]}
            >
              Location Data
            </Text>
          </Pressable>

          <Pressable
            style={[styles.submitbutton, { width: Dimensions.get('window').width - 40 }]}
            onPress={toggleProfileSuccess}
          >
            <Text
              style={styles.submittext}
            >
              Submit
            </Text>
          </Pressable>

          <AwesomeAlert
            show={profileEdited}
            title="Profile Updated!"
            confirmText="Yay!"
            titleStyle={styles.alertText}
            contentContainerStyle={styles.alertBackground}
            showConfirmButton
            confirmButtonTextStyle={styles.confirmButton}
            onConfirmPressed={closeProfile}
            style={{ borderRadius: 50, overflow: 'hidden' }}
            confirmButtonColor={isDarkMode === 'light' ? pawGreen : pawPink}
          />
        </View>
      </Modal>

      <Pressable
        style={styles.menuItem}
        onPress={logOut}
      >
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          style={styles.menuText}
        >
          Sign out
        </Text>

      </Pressable>
      <AwesomeAlert
        show={loggingOut}
        showProgress
        title="See you next time!"
        progressColor="#69a297"
        progressSize="large"
        titleStyle={styles.alertText}
      />
    </View>
  );
}
