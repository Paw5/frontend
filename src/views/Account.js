/* eslint-disable global-require */
import {
  View, Text, Dimensions, Pressable, Image, Animated, TouchableWithoutFeedback,
  ScrollView, Platform, TouchableHighlight, TextInput,
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Collapsible from '@eliav2/react-native-collapsible-view';
import DatePicker, { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import Network from '../util/Network';
import lstyles, {
  pawPink, pawGrey, pawWhite,
} from '../constants/Styles';
import dstyles, { pawLightGrey, pawYellow, pawGreen } from '../constants/DarkStyles';
import AccountCard from '../components/AccountCard';
import { reload } from '../redux/SettingsSlice';
import dogBreeds from '../constants/dogBreeds.json';
import catBreeds from '../constants/catBreeds.json';

const dBreeds = dogBreeds.breeds;
const cBreeds = catBreeds.breeds;
const emptyList = [];

const miso = require('../../assets/petPhotos/miso.jpg');

const PickerItem = Picker.Item;

const StatusBarHeight = getStatusBarHeight();

const _ = Network();

export default function AccountTab() {
  const [styles, setStyles] = useState(lstyles);
  const isDarkMode = useSelector((state) => state.settings.darkMode);
  const dispatch = useDispatch();

  const [formEntry, setFormEntry] = useState({});

  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

  const [petAdded, showPetAdded] = useState(false);
  const toggleAddSuccess = () => {
    showPetAdded(!petAdded);
  };

  const addPetToDB = async () => {
    console.log(formEntry);
    const networkResponse = await _.post('pets/2039', formEntry);
    networkResponse.onSuccess(() => {
      setFormEntry({});

      console.log('success');

      return (
        <AwesomeAlert
          show={petAdded}
          title="Pet Added!"
          confirmText="Yay!"
          titleStyle={styles.settingsText}
          contentContainerStyle={styles.alertBackground}
          showConfirmButton
          confirmButtonTextStyle={styles.confirmButton}
          onConfirmPressed={toggleAddSuccess}
          style={{ borderRadius: 50, overflow: 'hidden' }}
          confirmButtonColor={isDarkMode === 'light' ? pawGreen : pawPink}
        />
      );
    });
  };

  const updateFormEntry = (key, value) => {
    const newFormEntry = formEntry;
    newFormEntry[key] = value;
    setFormEntry(newFormEntry);
  };

  const [selectedItem, setSelectedItem] = useState('Select Breed');
  const [animalValue, setAnimalValue] = useState('Select Animal');
  const [itemList, setAnimal] = useState(emptyList);
  const [autofillText, setAutofillText] = useState('');

  const [selectedDate, setSelectedDate] = useState(getFormatedDate(getToday(), 'MM/DD/YYYY'));

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

  /* toggle add pet section modal */
  const [isAddVisible, setAddVisible] = useState(false);
  const toggleAdd = () => {
    setAddVisible(!isAddVisible);
  };

  /* toggle date modal */
  const [isDateVisible, setDateVisible] = useState(false);
  const toggleDate = () => {
    setDateVisible(!isDateVisible);
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
              color={isDarkMode === 'light' ? pawYellow : pawPink}
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
                color={isDarkMode === 'light' ? pawGreen : pawPink}
                style={{ marginRight: -5 }}
              />
            </Pressable>

          </View>

          {/* add options modal */}
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
                    style={{ marginBottom: Platform.OS === 'android' ? 30 : 30, marginTop: 30 }}
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
                        placeholder="Name"
                        placeholderTextColor={isDarkMode === 'light' ? pawYellow : pawGrey}
                        style={[styles.menuText, { fontSize: 22, width: 'auto', marginRight: Platform.OS === 'android' ? 20 : 0 }]}
                        onChangeText={(text) => updateFormEntry('pet_name', text)}
                      />
                    </Pressable>

                    <Collapsible
                      style={styles.breedBubble}
                      touchableComponent
                      noArrow
                      title={(
                        <View>
                          <Text
                            style={styles.breedHeader}
                          >
                            Animal
                          </Text>
                          <Text
                            style={styles.breedSelection}
                          >
                            {animalValue}
                          </Text>
                        </View>
                    )}
                    >
                      <TouchableHighlight>
                        <Picker
                          style={styles.dropdown}
                          itemStyle={styles.dropdown}
                          selectedValue={animalValue}
                          onValueChange={
                            (itemValue) => {
                              setAnimalValue(itemValue);
                              setSelectedItem('Select Breed');
                              updateFormEntry('type', itemValue);
                              if (itemValue === 'dog') {
                                setAnimal(dBreeds);
                              } else if (itemValue === 'cat') {
                                setAnimal(cBreeds);
                              }
                            }
                          }
                        >
                          <PickerItem label="DOG" value="dog" key="dog" />
                          <PickerItem label="CAT" value="cat" key="cat" />
                        </Picker>
                      </TouchableHighlight>
                    </Collapsible>

                    <Pressable
                      style={[styles.breedBubble, { width: Dimensions.get('window').width - 40 }]}
                      onPress={toggleDate}
                    >
                      <Text
                        style={[styles.breedHeader, { paddingTop: 20 }]}
                      >
                        Date of Birth
                      </Text>
                      <Text
                        style={styles.breedSelection}
                      >
                        {selectedDate}
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
                          mode="calendar"
                          onSelectedChange={(date) => {
                            setSelectedDate(getFormatedDate(date, 'MM/DD/YYYY'));
                            updateFormEntry('custom_info', date);
                          }}
                        />
                      </Modal>
                    </Pressable>

                    <Collapsible
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
                          <TextInput
                            style={styles.breedSelection}
                            placeholder={selectedItem}
                            placeholderTextColor={isDarkMode === 'light' ? pawYellow : pawGrey}
                            onChangeText={(value) => {
                              console.log(value);
                              setAutofillText(value);
                            }}
                          />
                        </View>
                    )}
                    >
                      <TouchableHighlight>
                        <Picker
                          style={styles.dropdown}
                          itemStyle={styles.dropdown}
                          selectedValue={selectedItem}
                          onValueChange={(index) => {
                            setSelectedItem(index);
                            updateFormEntry('breed', index);
                          }}
                        >
                          {itemList.filter((value) => value.includes(autofillText)).map((value) => (
                            <PickerItem label={value} value={value} key={value} />
                          ))}
                        </Picker>
                      </TouchableHighlight>
                    </Collapsible>

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
                        onChangeText={(text) => updateFormEntry('fur_color', text)}
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
                          style={[styles.menuText, {
                            fontSize: 22, width: 'auto', marginRight: Platform.OS === 'android' ? 20 : 0, paddingRight: 5,
                          }]}
                          onChangeText={(text) => updateFormEntry('weight', text)}
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
                        style={[styles.menuText, { fontSize: 22, width: 'auto', marginRight: Platform.OS === 'android' ? 20 : 0 }]}
                        onChangeText={(text) => updateFormEntry('microchip', text)}
                      />
                    </Pressable>

                    <Pressable
                      style={[styles.submitbutton, { width: Dimensions.get('window').width - 40 }]}
                      onPress={addPetToDB}
                    >
                      <Text
                        style={styles.submittext}
                      >
                        Submit
                      </Text>
                    </Pressable>
                  </ScrollView>
                </View>
              </KeyboardAwareScrollView>
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
