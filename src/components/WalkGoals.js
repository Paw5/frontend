import {
  View, Text, Dimensions, Pressable, TouchableWithoutFeedback,
  Platform, Keyboard, TouchableHighlight, TextInput,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Modal from 'react-native-modal';
import Slider from '@react-native-community/slider';
import { Feather } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ProgressChart } from 'react-native-chart-kit';
import { Picker } from '@react-native-picker/picker';
import Collapsible from '@eliav2/react-native-collapsible-view';
import { useSelector } from 'react-redux';
import lstyles, {
  pawPink, pawWhite,
} from '../constants/Styles';
import dstyles, {
  pawYellow, pawGrey, pawGreen, pawLightGrey,
} from '../constants/DarkStyles';

const lightChart = (opacity = 1) => `rgba(105, 162, 151, ${opacity})`;
const darkChart = (opacity = 1) => `rgba(237, 174, 73, ${opacity})`;

const PickerItem = Picker.Item;

export default function PetCard() {
  const [styles, setStyles] = useState(lstyles);
  const isDarkMode = useSelector((state) => state.settings.darkMode);

  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

  const [goalName, setGoalName] = useState('Select Goal');
  const [goalPercent, setGoalPercent] = useState(0);

  /* toggle add goal section modal */
  const [isAddGoalVisible, setAddGoalVisible] = useState(false);
  const toggleAddGoal = () => {
    setAddGoalVisible(!isAddGoalVisible);
  };

  /* toggle edit goal section modal */
  const [isEditGoalVisible, setEditGoalVisible] = useState(false);
  const toggleEditGoal = () => {
    setEditGoalVisible(!isEditGoalVisible);
  };

  const data = {
    labels: ['Training', 'Walk'], // optional
    data: [0.5, 0.8],
  };

  const chartConfig = {
    backgroundGradientFrom: pawWhite,
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: pawWhite,
    backgroundGradientToOpacity: 0,
    color: isDarkMode === 'light' ? darkChart : lightChart,
    fillShadowGradient: pawWhite,
    fillShadowGradientTo: pawWhite,
  };

  return (

    <Pressable style={styles.healthContainer}>
      <Text style={styles.healthHeader}>Goals</Text>
      <View
        style={styles.healthDivider}
      />

      <ProgressChart
        style={{ marginLeft: -40, marginTop: 10 }}
        data={data}
        width={Dimensions.get('window').width - 10}
        height={220}
        strokeWidth={16}
        radius={40}
        chartConfig={chartConfig}
        hideLegend={false}
      />

      <Pressable onPress={toggleAddGoal} style={[styles.addAppointment, { marginBottom: 0 }]}>
        <Text style={styles.appointmentButton}>
          Add Goal
        </Text>
      </Pressable>

      <Pressable onPress={toggleEditGoal} style={styles.addAppointment}>
        <Text style={styles.appointmentButton}>
          Edit Progress
        </Text>
      </Pressable>

      <Modal
        isVisible={isAddGoalVisible}
        onBackdropPress={toggleAddGoal}
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
              Goal Name
            </Text>
            <TextInput
              autoCorrect={false}
              clearTextOnFocus
              autoCapitalize="words"
              placeholder="Name"
              placeholderTextColor={isDarkMode === 'light' ? pawGrey : pawGrey}
              style={[styles.menuText, { fontSize: 22, width: 'auto' }]}
            />
          </Pressable>

          <Pressable
            style={[styles.submitbutton, { width: Dimensions.get('window').width - 40 }]}
          >
            <Text
              style={styles.submittext}
            >
              Add Goal
            </Text>
          </Pressable>

          <Pressable
            style={[styles.submitbutton, { width: Dimensions.get('window').width - 40, backgroundColor: isDarkMode === 'light' ? '#d94545' : '#b81d1d' }]}
            onPress={toggleAddGoal}
          >
            <Text
              style={styles.submittext}
            >
              Cancel
            </Text>
          </Pressable>
        </View>
      </Modal>

      <Modal
        isVisible={isEditGoalVisible}
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
                onPress={toggleEditGoal}
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
                  name="target"
                  size={100}
                  color={pawGrey}
                  style={styles.settingsIcon}
                />
              </View>

              <Collapsible
                style={styles.breedBubble}
                touchableComponent
                noArrow
                title={(
                  <View>
                    <Text
                      style={styles.breedHeader}
                    >
                      Goal
                    </Text>
                    <Text
                      style={styles.breedSelection}
                    >
                      {goalName}
                    </Text>
                  </View>
                    )}
              >
                <TouchableHighlight>
                  <Picker
                    style={styles.dropdown}
                    itemStyle={styles.dropdown}
                    selectedValue={goalName}
                    onValueChange={
                            (itemValue) => {
                              setGoalName(itemValue);
                            }
}
                  >
                    <PickerItem label="Walk" value="Walk" key="Walk" />
                    <PickerItem label="Training" value="Training" key="Training" />
                  </Picker>
                </TouchableHighlight>
              </Collapsible>

              <Pressable style={[styles.menuItem, {
                height: 130,
                width: Dimensions.get('window').width - 40,
                flexDirection: 'column',
                justifyContent: 'center',
              }]}
              >
                <Text
                  style={[styles.menuText, styles.accountFields]}
                >
                  Percentage
                </Text>
                <Slider
                  style={{ width: 200, height: 40 }}
                  minimumValue={0}
                  maximumValue={100}
                  minimumTrackTintColor={isDarkMode === 'light' ? pawYellow : pawPink}
                  maximumTrackTintColor={pawGrey}
                  step={1}
                  onValueChange={
                    (value) => {
                      setGoalPercent(value);
                    }
                  }
                />
                <Text
                  style={[styles.menuText, styles.accountFields, { fontSize: 24, color: isDarkMode === 'light' ? pawYellow : pawGrey }]}
                >
                  {goalPercent}
                  %
                </Text>
              </Pressable>

              <Pressable
                style={[styles.submitbutton, { width: Dimensions.get('window').width - 40 }]}
              >
                <Text
                  style={styles.submittext}
                >
                  Add to Graph
                </Text>
              </Pressable>

              <Pressable
                style={[styles.submitbutton, { width: Dimensions.get('window').width - 40, backgroundColor: isDarkMode === 'light' ? '#d94545' : '#b81d1d' }]}
              >
                <Text
                  style={styles.submittext}
                >
                  Delete Goal
                </Text>
              </Pressable>
            </View>
          </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
      </Modal>
    </Pressable>
  );
}
