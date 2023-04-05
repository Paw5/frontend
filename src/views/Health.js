import {
  View, Dimensions, Animated, ScrollView,
} from 'react-native';
import React, { useState, useEffect, useMemo } from 'react';
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
import Network from '../util/Network';

const _ = Network();

export default function HealthTab() {
  const [styles, setStyles] = useState(lstyles);
  const [hasLoadedPets, setHasLoadedPets] = useState(false);
  const [petCards, setPetCards] = useState(() => []);
  const isDarkMode = useSelector((state) => state.settings.darkMode);
  const [userId, setUserId] = useState(0);
  
  if(!userId) {
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

  const scrollX = new Animated.Value(0);
  
  if (userId && !petCards.length && !hasLoadedPets) {
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
          { petCards.map((pet, index) => <PetCard pet={pet} key={`pet-card-${index}`} />) }
        </Animated.ScrollView>
        { petCards.length ?
        <View style={styles.scrollIndicator}>
          <RNAnimatedScrollIndicators
            numberOfCards={petCards.length}
            scrollWidth={Dimensions.get('window').width}
            activeColor={isDarkMode === 'light' ? pawYellow : pawPink}
            inActiveColor={isDarkMode === 'light' ? pawLightGrey : pawWhite}
            scrollAnimatedValue={scrollX}
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
            }}
          />
        </View> : <View /> // <-- No pets found element
        }

        <Reminders />
        <UpcomingAppointments />
        <WalkGraph />
        <WalkGoals />
        <VaccineReminder />

      </ScrollView>
    </View>
  );
}
