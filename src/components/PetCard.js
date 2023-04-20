import {
  View, Text, Dimensions, Pressable, Image, TouchableWithoutFeedback,
  ScrollView, Platform, TextInput, TouchableOpacity, Animated,
  Keyboard, KeyboardAvoidingView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Modal from 'react-native-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RNAnimatedScrollIndicators from 'react-native-animated-scroll-indicators';
import DatePicker, { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import { useSelector } from 'react-redux';
import AwesomeAlert from 'react-native-awesome-alerts';
import Collapsible from '@eliav2/react-native-collapsible-view';
import { Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import lstyles, {
  pawPink, pawWhite, pawGrey,
} from '../constants/Styles';
import dstyles, { pawLightGrey, pawYellow, pawGreen } from '../constants/DarkStyles';
import Network from '../util/Network';
import dogBreeds from '../constants/dogBreeds.json';
import catBreeds from '../constants/catBreeds.json';

const dBreeds = dogBreeds.breeds;
const cBreeds = catBreeds.breeds;
const PickerItem = Picker.Item;
const miso = require('../../assets/petPhotos/miso.jpg');

const emptyList = [];

const _ = Network();

export default function PetCard({ pet }) {
  const [styles, setStyles] = useState(lstyles);
  const isDarkMode = useSelector((state) => state.settings.darkMode);
  const {
    pet_name: petName, fur_color: furColor, microchip: chipNumber, pet_id: petID, type: catDog,
  } = pet;
  const [userId, setUserId] = useState(0);
  const [autofillText, setAutofillText] = useState('');
  const [selectedItem, setSelectedItem] = useState(pet.breed);
  const [selectedDate, setSelectedDate] = useState(getFormatedDate(getToday(), 'M/D/YY'));
  const [selectedVaccine, setSelectedVaccine] = useState('Select Vaccination');
  const [itemList, setAnimal] = useState(emptyList);
  const [formEntry, setFormEntry] = useState({});
  const dogVaccinations = ['Distemper', 'Hepititus', 'Parvovirus', 'Paraiflueza', 'Rabies', 'Leptospirosis', 'Bordetella'];
  const catVaccinations = ['Calicivirus', 'Feline Leukemia', 'Rabies', 'Rhinotracheitis', 'Panleukopenia'];

  const scrollX = new Animated.Value(0);

  if (!userId) {
    _.get('login').then((response) => {
      response.onSuccess((results) => {
        setUserId(results.data.user_id);

        if (catDog === 'dog') {
          setAnimal(dBreeds);
        } else if (catDog === 'cat') {
          setAnimal(cBreeds);
        }
      });
    });
  }

  const updateFormEntry = (key, value) => {
    const newFormEntry = formEntry;
    newFormEntry[key] = value;
    setFormEntry(newFormEntry);
  };

  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

  /* toggle edit pet section modal */
  const [isEditVisible, setEditVisible] = useState(false);
  const toggleEdit = () => {
    setEditVisible(!isEditVisible);
  };

  const [petEdited, showPetEdited] = useState(false);
  const toggleSuccess = () => {
    showPetEdited(!petEdited);
  };

  const [petRemoved, showPetRemoved] = useState(false);
  const toggleRemove = () => {
    showPetRemoved(!petRemoved);
  };

  const [vaccineAdded, showVaccineAdded] = useState(false);
  const toggleAddVaccine = () => {
    showVaccineAdded(!vaccineAdded);
  };

  const [isMealVisible, showAddMeal] = useState(false);
  const toggleMeal = () => {
    showAddMeal(!isMealVisible);
  };

  const [isMedicalVisible, showAddMedical] = useState(false);
  const toggleMedical = () => {
    showAddMedical(!isMedicalVisible);
  };

  /* toggle date modal */
  const [isDateVisible, setDateVisible] = useState(false);
  const toggleDate = () => {
    setDateVisible(!isDateVisible);
  };

  const [removeSuccess] = useState(false);

  const closeAll = () => {
    showPetEdited(false);
    setEditVisible(false);
    showPetRemoved(false);
  };

  const addVaccineToPet = async () => {
    console.log(formEntry);
    const networkResponse = await _.post(`vaccinations/${petID}`, formEntry);
    networkResponse.onSuccess(() => {
      setFormEntry({});
      toggleAddVaccine();
    });
  };

  const removePetFromDB = async () => {
    const networkResponse = await _.delete(`pets/${userId}/${petID}`);
    networkResponse.onSuccess(() => (
      <AwesomeAlert
        show={removeSuccess}
        title="Pet Deleted!"
        confirmText="Yay!"
        titleStyle={styles.alertText}
        contentContainerStyle={styles.alertBackground}
        showConfirmButton
        confirmButtonTextStyle={styles.confirmButton}
        onConfirmPressed={closeAll}
        style={{ borderRadius: 50, overflow: 'hidden' }}
        confirmButtonColor={isDarkMode === 'light' ? pawGreen : pawPink}
      />
    ));
  };

  const displayDogVaccines = () => (
    <View>
      <Collapsible
        style={styles.vaccineBubble}
        touchableComponent
        noArrow
        title={(
          <View>
            <Text
              style={styles.vaccineHeader}
            >
              Breed
            </Text>
            <Text
              style={styles.vaccineSelection}
            >
              {selectedVaccine}
            </Text>
          </View>
        )}
      >
        <TouchableOpacity>
          <Picker
            style={styles.dropdown}
            itemStyle={styles.dropdown}
            selectedValue={selectedVaccine}
            onValueChange={(index) => {
              updateFormEntry('name', index);
              setSelectedVaccine(index);
            }}
          >
            {dogVaccinations.map((value) => (
              <PickerItem
                label={value}
                value={value}
                key={value}
              />
            ))}
          </Picker>
        </TouchableOpacity>
      </Collapsible>

      <Pressable
        style={[styles.vaccineBubble, { width: Dimensions.get('window').width - 40 }]}
        onPress={toggleDate}
      >
        <Text
          style={[styles.vaccineHeader, { paddingTop: 20 }]}
        >
          Last Vaccination
        </Text>
        <Text
          style={styles.vaccineSelection}
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
              updateFormEntry('time', new Date(date));
              setSelectedDate(getFormatedDate(date, 'M/D/YY'));
              console.log(new Date(selectedDate));
            }}
          />
        </Modal>
      </Pressable>

      <Pressable style={[styles.menuItem, { width: Dimensions.get('window').width - 40, backgroundColor: pawGreen }]}>
        <Text
          style={[styles.menuText, styles.accountFields, { color: isDarkMode === 'light' ? pawYellow : pawWhite }]}
        >
          Frequency
        </Text>
        <View style={{ flexDirection: 'row', alignContent: 'space-around' }}>
          <TextInput
            autoCorrect={false}
            clearTextOnFocus
            keyboardType="decimal-pad"
            inputMode="number"
            placeholder="X"
            placeholderTextColor={isDarkMode === 'light' ? pawGrey : pawGrey}
            style={[styles.menuText, {
              fontSize: 22, width: 'auto', marginRight: Platform.OS === 'android' ? 20 : 0, paddingRight: 5,
            }]}
            onChangeText={(text) => updateFormEntry('frequency', text)}
          />
          <Text style={[styles.menuText, {
            fontSize: 22, width: 'auto', textTransform: 'lowercase', color: isDarkMode === 'light' ? pawYellow : pawWhite,
          }]}
          >
            years
          </Text>
        </View>
      </Pressable>
    </View>
  );

  const displayCatVaccines = () => (
    <View>
      <Collapsible
        style={styles.vaccineBubble}
        touchableComponent
        noArrow
        title={(
          <View>
            <Text
              style={styles.vaccineHeader}
            >
              Breed
            </Text>
            <Text
              style={styles.vaccineSelection}
            >
              {selectedVaccine}
            </Text>
          </View>
          )}
      >
        <TouchableOpacity>
          <Picker
            style={styles.dropdown}
            itemStyle={styles.dropdown}
            selectedValue={selectedVaccine}
            onValueChange={(index) => {
              setSelectedVaccine(index);
              updateFormEntry('name', index);
            }}
          >
            {catVaccinations.map((value) => (
              <PickerItem
                label={value}
                value={value}
                key={value}
              />
            ))}
          </Picker>
        </TouchableOpacity>
      </Collapsible>

      <Pressable
        style={[styles.vaccineBubble, { width: Dimensions.get('window').width - 40 }]}
        onPress={toggleDate}
      >
        <Text
          style={[styles.vaccineHeader, { paddingTop: 20 }]}
        >
          Last Vaccination
        </Text>
        <Text
          style={styles.vaccineSelection}
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
              updateFormEntry('time', date);
              setSelectedDate(getFormatedDate(date, 'M/D/YY'));
            }}
          />
        </Modal>
      </Pressable>

      <Pressable style={[styles.menuItem, { width: Dimensions.get('window').width - 40, backgroundColor: pawGreen }]}>
        <Text
          style={[styles.menuText, styles.accountFields, { color: isDarkMode === 'light' ? pawYellow : pawWhite }]}
        >
          Frequency
        </Text>
        <View style={{ flexDirection: 'row', alignContent: 'space-around' }}>
          <TextInput
            autoCorrect={false}
            clearTextOnFocus
            keyboardType="decimal-pad"
            inputMode="number"
            placeholder="X"
            placeholderTextColor={isDarkMode === 'light' ? pawGrey : pawGrey}
            style={[styles.menuText, {
              fontSize: 22, width: 'auto', marginRight: Platform.OS === 'android' ? 20 : 0, paddingRight: 5,
            }]}
            onChangeText={(text) => updateFormEntry('frequency', text)}
          />
          <Text style={[styles.menuText, {
            fontSize: 22, width: 'auto', textTransform: 'lowercase', color: isDarkMode === 'light' ? pawYellow : pawWhite,
          }]}
          >
            years
          </Text>
        </View>
      </Pressable>
    </View>
  );

  return (

    <View>
      <View style={styles.transparentBG}>
        <Pressable style={styles.petCard}>
          <Image
            style={styles.petImage}
            source={miso}
          />

          <View style={styles.accountHeaderView}>
            <Text style={styles.petHeader}>{petName}</Text>
            <Pressable onPress={toggleEdit}>
              <Feather
                name="settings"
                size={30}
                color={isDarkMode === 'light' ? pawGreen : pawPink}
                style={styles.indianRedXCircle}
              />
            </Pressable>
          </View>

        </Pressable>
      </View>

      {/* edit pet modal */}
      <Modal
        isVisible={isEditVisible}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        hasBackdrop={false}
        style={styles.accountModal}
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
              style={[styles.exitButton, { marginBottom: -30 }]}
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

          <View style={[styles.menuItem, styles.usernameField]}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={[styles.menuText, styles.usernameFont]}
            >
              {petName}
            </Text>
          </View>

          <View style={styles.scrollIndicator}>
            <RNAnimatedScrollIndicators
              numberOfCards={2}
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

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ height: Dimensions.get('window').width / 1.30, marginBottom: 15, marginTop: -10 }}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
              <KeyboardAwareScrollView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              >
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
                >
                  <View style={{ width: Dimensions.get('window').width }}>
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
                        defaultValue={furColor}
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
                          defaultValue={pet.weight.toString()}
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
                        defaultValue={chipNumber}
                        style={[styles.menuText, { fontSize: 22, width: 'auto' }]}
                      />
                    </Pressable>
                  </View>

                  <View style={{ width: Dimensions.get('window').width }}>
                    <Pressable
                      onPress={toggleMeal}
                      style={[styles.medicalbutton, { width: Dimensions.get('window').width - 40 }]}
                    >
                      <Feather
                        name="plus-circle"
                        size={50}
                        color={isDarkMode === 'light' ? pawGreen : pawPink}
                        style={{ marginBottom: 5 }}
                      />
                      <Text
                        style={[styles.medicalText]}
                        numberOfLines={1}
                        adjustsFontSizeToFit
                      >
                        Add Meal Information
                      </Text>
                    </Pressable>

                    <Modal
                      isVisible={isMealVisible}
                      onBackdropPress={toggleMeal}
                      animationIn="fadeInUp"
                      animationInTiming={200}
                      animationOut="fadeOutDown"
                      animationOutTiming={200}
                      style={{ margin: 0 }}
                    >
                      <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                      >
                        <View style={{
                          backgroundColor: isDarkMode === 'light' ? pawLightGrey : pawWhite, padding: 30, paddingBottom: 10, borderRadius: 50,
                        }}
                        >
                          <Pressable style={[styles.menuItem, { width: Dimensions.get('window').width - 40, backgroundColor: pawGreen }]}>
                            <Text
                              style={[styles.menuText, styles.accountFields, { color: isDarkMode === 'light' ? pawYellow : pawWhite }]}
                            >
                              Food Brand
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

                          <Pressable style={[styles.menuItem, { width: Dimensions.get('window').width - 40, backgroundColor: pawGreen }]}>
                            <Text
                              style={[styles.menuText, styles.accountFields, { color: isDarkMode === 'light' ? pawYellow : pawWhite }]}
                            >
                              Food Type
                            </Text>
                            <TextInput
                              autoCorrect={false}
                              clearTextOnFocus
                              autoCapitalize="words"
                              placeholder="Type"
                              placeholderTextColor={isDarkMode === 'light' ? pawGrey : pawGrey}
                              style={[styles.menuText, { fontSize: 22, width: 'auto', marginRight: Platform.OS === 'android' ? 20 : 0 }]}
                            />
                          </Pressable>

                          <Pressable style={[styles.menuItem, { width: Dimensions.get('window').width - 40, backgroundColor: pawGreen }]}>
                            <Text
                              style={[styles.menuText, styles.accountFields, { color: isDarkMode === 'light' ? pawYellow : pawWhite }]}
                            >
                              Serving
                            </Text>
                            <TextInput
                              autoCorrect={false}
                              clearTextOnFocus
                              autoCapitalize="words"
                              placeholder="Amount"
                              placeholderTextColor={isDarkMode === 'light' ? pawGrey : pawGrey}
                              style={[styles.menuText, { fontSize: 22, width: 'auto', marginRight: Platform.OS === 'android' ? 20 : 0 }]}
                            />
                          </Pressable>

                          <View style={[styles.menuItem,
                            {
                              width: Dimensions.get('window').width - 40,
                              backgroundColor: pawGreen,
                              paddingLeft: 0,
                              paddingRight: 0,
                              paddingTop: 0,
                            }]}
                          >
                            <Pressable
                              style={[styles.servingSizeButton,
                                { paddingRight: 30, backgroundColor: isDarkMode === 'light' ? pawYellow : pawPink }]}
                            >
                              <Text style={[styles.servingSizeText, { paddingLeft: 10 }]}>
                                cups
                              </Text>
                            </Pressable>
                            <Pressable style={styles.servingSizeButton}>
                              <Text style={styles.servingSizeText}>
                                grams
                              </Text>
                            </Pressable>
                            <Pressable
                              style={[styles.servingSizeButton,
                                { paddingLeft: 40 }]}
                            >
                              <Text style={[styles.servingSizeText, { paddingRight: 40 }]}>
                                mL
                              </Text>
                            </Pressable>
                          </View>

                          <Pressable style={[styles.menuItem, { width: Dimensions.get('window').width - 40, backgroundColor: pawGreen }]}>
                            <Text
                              style={[styles.menuText, styles.accountFields, { color: isDarkMode === 'light' ? pawYellow : pawWhite }]}
                            >
                              Meal Time
                            </Text>
                            <TextInput
                              autoCorrect={false}
                              clearTextOnFocus
                              autoCapitalize="words"
                              placeholder="Time"
                              placeholderTextColor={isDarkMode === 'light' ? pawGrey : pawGrey}
                              style={[styles.menuText, { fontSize: 22, width: 'auto', marginRight: Platform.OS === 'android' ? 20 : 0 }]}
                            />
                          </Pressable>

                          <Pressable style={[styles.menuItem,
                            {
                              width: Dimensions.get('window').width - 40,
                              backgroundColor: pawGreen,
                              flexDirection: 'column',
                              height: 100,
                              padding: 10,
                              justifyContent: 'none',
                            }]}
                          >
                            <Text
                              style={[styles.menuText, styles.accountFields, { color: isDarkMode === 'light' ? pawYellow : pawWhite }]}
                            >
                              Dietary Restrictions
                            </Text>
                            <TextInput
                              autoCorrect={false}
                              clearTextOnFocus
                              autoCapitalize="words"
                              placeholder="Restrictions"
                              placeholderTextColor={isDarkMode === 'light' ? pawGrey : pawGrey}
                              multiline
                              returnKeyType="done"
                              onSubmitEditing={() => { Keyboard.dismiss(); }}
                              style={[styles.menuText,
                                {
                                  fontSize: 22,
                                  width: 'auto',
                                  marginRight: Platform.OS === 'android' ? 20 : 0,
                                  paddingTop: 10,
                                }]}
                            />
                          </Pressable>

                          <Pressable
                            style={[styles.submitbutton, { width: Dimensions.get('window').width - 40, backgroundColor: isDarkMode === 'light' ? pawYellow : pawPink }]}
                            onPress={toggleMeal}
                          >
                            <Text
                              style={styles.submittext}
                            >
                              Add Meal
                            </Text>
                          </Pressable>
                        </View>
                      </KeyboardAvoidingView>
                    </Modal>

                    <Pressable
                      onPress={toggleMedical}
                      style={[styles.medicalbutton, { width: Dimensions.get('window').width - 40 }]}
                    >
                      <Feather
                        name="plus-circle"
                        size={50}
                        color={isDarkMode === 'light' ? pawGreen : pawPink}
                        style={{ marginBottom: 5 }}
                      />
                      <Text
                        style={[styles.medicalText]}
                        numberOfLines={1}
                        adjustsFontSizeToFit
                      >
                        Add Vaccination Information
                      </Text>
                    </Pressable>

                    <Modal
                      isVisible={isMedicalVisible}
                      onBackdropPress={toggleMedical}
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
                        { catDog === 'dog' ? (displayDogVaccines()) : (displayCatVaccines())}

                        <Pressable
                          style={[styles.submitbutton, { width: Dimensions.get('window').width - 40, backgroundColor: isDarkMode === 'light' ? pawYellow : pawPink }]}
                          onPress={() => {
                            addVaccineToPet();
                            toggleAddVaccine();
                          }}
                        >
                          <Text
                            style={styles.submittext}
                          >
                            Add Vaccination
                          </Text>
                        </Pressable>

                        <AwesomeAlert
                          show={vaccineAdded}
                          title="Vaccine Added!"
                          confirmText="Yay!"
                          titleStyle={styles.alertText}
                          contentContainerStyle={styles.alertBackground}
                          showConfirmButton
                          confirmButtonTextStyle={styles.confirmButton}
                          onConfirmPressed={() => {
                            toggleAddVaccine();
                            toggleMedical();
                          }}
                          style={{ borderRadius: 50, overflow: 'hidden' }}
                          confirmButtonColor={isDarkMode === 'light' ? pawGreen : pawPink}
                        />
                      </View>
                    </Modal>
                  </View>
                </Animated.ScrollView>
              </KeyboardAwareScrollView>
            </TouchableWithoutFeedback>
          </ScrollView>

          <Pressable
            style={[styles.submitbutton, { width: Dimensions.get('window').width - 40 }]}
            onPress={toggleSuccess}
          >
            <Text
              style={styles.submittext}
            >
              Submit
            </Text>
          </Pressable>

          <AwesomeAlert
            show={petEdited}
            title="Pet Updated!"
            confirmText="Yay!"
            titleStyle={styles.alertText}
            contentContainerStyle={styles.alertBackground}
            showConfirmButton
            confirmButtonTextStyle={styles.confirmButton}
            onConfirmPressed={closeAll}
            style={{ borderRadius: 50, overflow: 'hidden' }}
            confirmButtonColor={isDarkMode === 'light' ? pawGreen : pawPink}
          />

          <Pressable
            style={
                    [
                      styles.submitbutton,
                      {
                        width: Dimensions.get('window').width - 40,
                        backgroundColor: isDarkMode === 'light' ? '#d94545' : '#b81d1d',
                      },
                    ]
                  }
            onPress={toggleRemove}
          >
            <Text
              style={[styles.submittext, { color: pawWhite }]}
            >
              Delete Pet
            </Text>
          </Pressable>

          <AwesomeAlert
            show={petRemoved}
            title="Are you sure?"
            confirmText="Cancel"
            cancelText="Delete"
            titleStyle={styles.alertText}
            contentContainerStyle={styles.alertBackground}
            showConfirmButton
            showCancelButton
            confirmButtonTextStyle={styles.confirmButton}
            cancelButtonTextStyle={styles.confirmButton}
            onConfirmPressed={toggleRemove}
            onCancelPressed={removePetFromDB}
            style={{ borderRadius: 50, overflow: 'hidden' }}
            confirmButtonColor={isDarkMode === 'light' ? pawGreen : pawPink}
            cancelButtonColor={isDarkMode === 'light' ? '#d94545' : '#b81d1d'}
          />

        </View>
      </Modal>
    </View>
  );
}
