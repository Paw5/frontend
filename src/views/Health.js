/* eslint-disable no-nested-ternary */
import {
  View, Dimensions, Animated, ScrollView, Pressable, Text, TouchableWithoutFeedback,
  Platform, TouchableHighlight, TextInput, TouchableOpacity, Image,
  Keyboard,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import RNAnimatedScrollIndicators from 'react-native-animated-scroll-indicators';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Collapsible from '@eliav2/react-native-collapsible-view';
import DatePicker, { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import { Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import AwesomeAlert from 'react-native-awesome-alerts';
import Modal from 'react-native-modal';
import lstyles, { pawPink, pawWhite, pawGrey } from '../constants/Styles';
import dstyles, { pawLightGrey, pawYellow, pawGreen } from '../constants/DarkStyles';
import PetCard from '../components/PetCard';
// import HealthComponent from '../components/HealthComponent';
import UpcomingAppointments from '../components/UpcomingAppointments';
import WalkGraph from '../components/WalkGraph';
import WalkGoals from '../components/WalkGoals';
import VaccineReminder from '../components/VaccineReminder';
import Reminders from '../components/Reminders';
import Network from '../util/Network';
import dogBreeds from '../constants/dogBreeds.json';
import catBreeds from '../constants/catBreeds.json';

const dBreeds = dogBreeds.breeds;
const cBreeds = catBreeds.breeds;
const PickerItem = Picker.Item;
const miso = require('../../assets/petPhotos/miso.jpg');

const emptyList = [];

const _ = Network();

export default function HealthTab() {
  const [styles, setStyles] = useState(lstyles);
  const [hasLoadedPets, setHasLoadedPets] = useState(false);
  const [petCards, setPetCards] = useState(() => []);
  const isDarkMode = useSelector((state) => state.settings.darkMode);
  const [userId, setUserId] = useState(0);
  const [selectedDate, setSelectedDate] = useState(getFormatedDate(getToday(), 'MM/DD/YYYY'));
  const [formEntry, setFormEntry] = useState({});

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

  const [petAdded, showPetAdded] = useState(false);
  const toggleSuccess = () => {
    showPetAdded(!petAdded);
  };

  /* toggle add pet section modal */
  const [isAddVisible, setAddVisible] = useState(false);
  const toggleAdd = () => {
    setAddVisible(!isAddVisible);
  };

  const addPetToDB = async () => {
    const networkResponse = await _.post(`pets/${userId}`, formEntry);
    networkResponse.onSuccess(() => {
      setFormEntry({});
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

  /* toggle date modal */
  const [isDateVisible, setDateVisible] = useState(false);
  const toggleDate = () => {
    setDateVisible(!isDateVisible);
  };

  const closeAll = () => {
    showPetAdded(false);
    setAddVisible(false);
    setHasLoadedPets(false);
  };

  if (userId && !hasLoadedPets) {
    _.get('pets', {
      params: {
        user_id: userId,
      },
    }).then((results) => {
      const pets = results.data().results;

      setPetCards(pets);
      setHasLoadedPets(true);
    });
  }

  const [cardIndex, setCardIndex] = useState(0);
  const [selectedPet, setSelectedPet] = useState(petCards[0]);

  const scrollX = new Animated.Value(0);
  scrollX.addListener(({ value }) => {
    setCardIndex(Math.round(value / 390));
    setSelectedPet(petCards[cardIndex - 1]);
  });
  scrollX.removeListener();

  return (

    <View style={styles.background}>

      <View style={styles.statusBar} />

      <View>
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
            onScroll={
            Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true },
            )
          }
            style={{
              width: Dimensions.get('window').width,
              marginTop: 10,
              marginLeft: 10,
            }}
          >

            <View style={styles.transparentBG}>
              <Pressable style={styles.petCard} onPress={toggleAdd}>
                <Feather
                  name="home"
                  size={80}
                  color={isDarkMode === 'light' ? pawGreen : pawPink}
                  style={{ marginRight: -5, marginBottom: 25 }}
                />
                <Text style={styles.petHeader}>Home</Text>
              </Pressable>
            </View>

            {/* eslint-disable-next-line react/no-array-index-key */}
            { petCards.map((pet, index) => <PetCard pet={pet} key={`pet-card-${index}`} />) }

            <View style={styles.transparentBG}>
              <Pressable style={styles.petCard} onPress={toggleAdd}>
                <Feather
                  name="plus-circle"
                  size={80}
                  color={isDarkMode === 'light' ? pawGreen : pawPink}
                  style={{ marginRight: -5, marginBottom: 25 }}
                />
                <Text style={styles.petHeader}>Add Pet</Text>

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
                              placeholderTextColor={isDarkMode === 'light' ? pawYellow : pawGrey}
                              onChangeText={(value) => {
                                setAutofillText(value);
                              }}
                              defaultValue={selectedItem}
                              clearTextOnFocus
                            />
                          </View>
                    )}
                      >
                        <TouchableOpacity>
                          <Picker
                            style={styles.dropdown}
                            itemStyle={styles.dropdown}
                            selectedValue={selectedItem}
                            onValueChange={(index) => {
                              setSelectedItem(index);
                              updateFormEntry('breed', index);
                            }}
                          >
                            {itemList.filter(
                              (value) => value.includes(autofillText),
                            ).map((value) => (
                              <PickerItem
                                label={value}
                                value={value}
                                key={value}
                              />
                            ))}
                          </Picker>
                        </TouchableOpacity>
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
                        onPress={() => {
                          addPetToDB();
                          toggleSuccess();
                        }}
                      >
                        <Text
                          style={styles.submittext}
                        >
                          Submit
                        </Text>
                      </Pressable>

                      <AwesomeAlert
                        show={petAdded}
                        title="Pet Added!"
                        confirmText="Yay!"
                        titleStyle={styles.alertText}
                        contentContainerStyle={styles.alertBackground}
                        showConfirmButton
                        confirmButtonTextStyle={styles.confirmButton}
                        onConfirmPressed={closeAll}
                        style={{ borderRadius: 50, overflow: 'hidden' }}
                        confirmButtonColor={isDarkMode === 'light' ? pawGreen : pawPink}
                      />
                    </ScrollView>
                  </View>
                </KeyboardAwareScrollView>
              </TouchableWithoutFeedback>
            </Modal>
          </Animated.ScrollView>
        </View>

        { petCards.length
          ? (
            <View style={styles.scrollIndicator}>
              <RNAnimatedScrollIndicators
                numberOfCards={petCards.length + 2}
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
          ) : <View /> }

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 375 }}
        >
          {cardIndex === 0 ? (
            <View>
              <VaccineReminder pets={petCards} />
              <UpcomingAppointments />
            </View>
          ) : (<View />)}

          {selectedPet ? (
            <View>
              <Reminders pet={selectedPet} />
              <WalkGraph pet={selectedPet} />
              <WalkGoals pet={selectedPet} />
            </View>
          ) : (<View />)}
        </ScrollView>

      </View>
    </View>
  );
}
