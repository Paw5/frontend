import {
  View, Dimensions, Animated, ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import RNAnimatedScrollIndicators from 'react-native-animated-scroll-indicators';
import lstyles, { pawPink, pawWhite } from '../constants/Styles';
import dstyles, { pawLightGrey, pawYellow } from '../constants/DarkStyles';
import PetCard from '../components/PetCard';
// import HealthComponent from '../components/HealthComponent';
import UpcomingAppointments from '../components/UpcomingAppointments';
import WalkGraph from '../components/WalkGraph';
import WalkGoals from '../components/WalkGoals';
import VaccineReminder from '../components/VaccineReminder';
import Reminders from '../components/Reminders';

export default function HealthTab() {
  const [styles, setStyles] = useState(lstyles);
  const isDarkMode = useSelector((state) => state.settings.darkMode);

  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

  const scrollX = new Animated.Value(0);

  return (

    <View style={styles.background}>

      <View style={styles.statusBar} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 68 }}
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
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true },
          )}
          style={{
            width: Dimensions.get('window').width,
            height: 220,
            marginTop: 10,
            marginLeft: 10,
          }}
        >

          <PetCard />
          <PetCard />
          <PetCard />
          <PetCard />
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

        <Reminders />
        <UpcomingAppointments />
        <WalkGraph />
        <WalkGoals />
        <VaccineReminder />

      </ScrollView>
    </View>
  );
}
