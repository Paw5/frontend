import {
  View, Dimensions, Animated, ScrollView,
} from 'react-native';
import React from 'react';
import RNAnimatedScrollIndicators from 'react-native-animated-scroll-indicators';
import styles, { white2lgrey, pink2yellow } from '../constants/Styles';
import PetCard from '../components/PetCard';
import HealthComponent from '../components/HealthComponent';

export default function HealthTab() {
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
            activeColor={pink2yellow}
            inActiveColor={white2lgrey}
            scrollAnimatedValue={scrollX}
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
            }}
          />
        </View>

        <HealthComponent />
        <HealthComponent />
        <HealthComponent />

      </ScrollView>
    </View>
  );
}
