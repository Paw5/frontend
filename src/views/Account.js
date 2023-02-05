/* eslint-disable global-require */
import {
  View, Text, Dimensions, Pressable, Image, Animated, TouchableWithoutFeedback,
  ScrollView, Platform, TouchableHighlight, TextInput, KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNAnimatedScrollIndicators from 'react-native-animated-scroll-indicators';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Picker } from '@react-native-picker/picker';
import Accordion from '@eliav2/react-native-collapsible-view';
import DatePicker from 'react-native-modern-datepicker';
import lstyles, {
  pawPink, pawGrey, pawWhite, pawGreen,
} from '../constants/Styles';
import dstyles, { pawLightGrey, pawYellow } from '../constants/DarkStyles';
import AccountCard from '../components/AccountCard';
import { reload } from '../redux/SettingsSlice';
import Breeds from '../constants/breedList.json';

const breedList = Breeds.breeds;

const miso = require('../../assets/petPhotos/miso.jpg');

const PickerItem = Picker.Item;

const StatusBarHeight = getStatusBarHeight();

export default function AccountTab() {
  const [styles, setStyles] = useState(lstyles);
  const isDarkMode = useSelector((state) => state.settings.darkMode);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

  const [selectedItem, setSelectedItem] = useState('Select Breed');
  const [itemList] = useState(breedList);

  const scrollX = new Animated.Value(0);

  /* toggle profile section modal */
  const [isProfileVisible, setProfileVisible] = useState(false);
  const toggleProfile = () => {
    setProfileVisible(!isProfileVisible);
  };

  /* toggle pet section modal */
  const [isPetsVisible, setPetsVisible] = useState(false);
  const togglePets = () => {
    setPetsVisible(!isPetsVisible);
  };

  /* toggle pet section modal */
  const [isAddVisible, setAddVisible] = useState(false);
  const toggleAdd = () => {
    setAddVisible(!isAddVisible);
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
              color={pawGrey}
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
        </View>
      </Modal>

      <Pressable onPress={togglePets} style={styles.menuItem}>
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          style={styles.menuText}
        >
          Edit Pets
        </Text>
        <Feather
          name="chevron-right"
          size={30}
          color={pawGrey}
          style={{ marginRight: -5 }}
        />

      </Pressable>

      {/* pets options modal */}
      <Modal
        isVisible={isPetsVisible}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        hasBackdrop={false}
        style={styles.accountModal}
      >
        <View>
          <Pressable
            onPress={togglePets}
            style={{ alignSelf: 'flex-start' }}
          >
            <Feather
              name="chevron-left"
              size={30}
              color={pawGrey}
              style={styles.exitButton}
            />

          </Pressable>

          <View>
            <Animated.ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToAlignment="center"
              snapToInterval={Dimensions.get('window').width}
              decelerationRate="fast"
              disableIntervalMomentum
              directionalLockEnabled
              pagingEnabled
              scrollEventThrottle={14}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: true },
              )}
              style={{
                width: Dimensions.get('window').width,
                height: 250,
                marginTop: (Dimensions.get('window').height - StatusBarHeight - 100) / 10,
                marginLeft: 10,
                marginBottom: 20,
              }}
            >
              <AccountCard />
              <AccountCard />
              <AccountCard />
              <AccountCard />

            </Animated.ScrollView>

            <View style={styles.scrollIndicator}>
              <RNAnimatedScrollIndicators
                numberOfCards={4}
                scrollWidth={Dimensions.get('window').width}
                activeColor={isDarkMode === 'light' ? pawYellow : pawPink}
                inActiveColor={isDarkMode === 'light' ? pawLightGrey : pawWhite}
                scrollAnimatedValue={scrollX}
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}
              />
            </View>

            <Pressable onPress={toggleAdd} style={[styles.menuItem, { marginTop: 20, width: Dimensions.get('window').width - 40 }]}>
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={styles.menuText}
              >
                Add Pet
              </Text>
              <Feather
                name="plus-circle"
                size={30}
                color="indianred"
                style={{ marginRight: -5 }}
              />
            </Pressable>

          </View>

          <Modal
            isVisible={isAddVisible}
            animationIn="slideInRight"
            animationOut="slideOutRight"
            hasBackdrop={false}
            style={styles.accountModal}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
              <KeyboardAvoidingView
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
                      color={pawGrey}
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
                    style={{ marginBottom: Platform.OS === 'android' ? 275 : 275, marginTop: 30 }}
                  >
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
                        placeholder="Name  "
                        style={[styles.menuText, { fontSize: 22, width: 'auto' }]}
                      />
                    </Pressable>

                    <Accordion
                      style={styles.breedBubble}
                      touchableComponent
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
                            None
                          </Text>
                        </View>
                    )}
                    >

                      <TouchableHighlight>
                        <DatePicker
                          options={{
                            backgroundColor: pawWhite,
                            textHeaderColor: pawGreen,
                            textDefaultColor: pawGrey,
                            selectedTextColor: pawWhite,
                            mainColor: pawPink,
                            textSecondaryColor: pawPink,
                            borderColor: pawWhite,
                          }}
                          current="2023-02-4"
                          selected="2023-02-4"
                          mode="calendar"
                          minuteInterval={30}
                          style={{ borderRadius: 10 }}
                        />
                      </TouchableHighlight>
                    </Accordion>

                    <Accordion
                      style={styles.breedBubble}
                      touchableComponent
                      noArrow
                      title={(
                        <View>
                          <Text
                            style={styles.breedHeader}
                          >
                            Breed
                          </Text>
                          <Text
                            style={styles.breedSelection}
                          >
                            {selectedItem}
                          </Text>
                        </View>
                    )}
                    >
                      <TouchableHighlight>
                        <Picker
                          style={styles.dropdown}
                          itemStyle={styles.dropdown}
                          selectedValue={selectedItem}
                          onValueChange={(index) => setSelectedItem(index)}
                        >
                          {itemList.map((value) => (
                            <PickerItem label={value} value={value} key={value} />
                          ))}
                        </Picker>
                      </TouchableHighlight>
                    </Accordion>

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
                        placeholder="Color  "
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
                          placeholder="Weight  "
                          style={[styles.menuText, { fontSize: 22, width: 'auto', paddingRight: 5 }]}
                        />
                        <Text style={[styles.menuText, { fontSize: 22, width: 'auto' }]}>
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
                        placeholder="ID Number   "
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
                  </ScrollView>
                </View>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </Modal>

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
        titleStyle={styles.settingsText}
      />
    </View>
  );
}
