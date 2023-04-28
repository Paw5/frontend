import {
  View, Dimensions, ScrollView, Animated, Platform,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import RNAnimatedScrollIndicators from 'react-native-animated-scroll-indicators';
import lstyles, {
  pawPink, pawWhite,
} from '../constants/Styles';
import dstyles, { pawLightGrey, pawYellow } from '../constants/DarkStyles';
import EventTab from '../components/EventTab';
import NewsComponent from '../components/NewsTab';

export default function NewsTab() {
  const [styles, setStyles] = useState(lstyles);
  const isDarkMode = useSelector((state) => state.settings.darkMode);
  const data = [
    {
      title: '5 things a vet would never do as a pet owner',
      body: 'Pets are members of the family. So when it comes to taking care of yours and giving them the best life, what mistakes should you avoid?',
      url: 'https://www.today.com/pets/5-things-veterinarian-brett-levitzke-never-do-as-pet-owner-rcna80763',
    },
    {
      title: 'Having a pet may take a toll on your sleep, study suggests',
      body: 'People with pet dogs were more likely to have sleep disorders, while people with cats were more likely to experience leg jerks, the study found.',
      url: 'https://www.nbcnews.com/health/health-news/pet-may-take-toll-sleep-study-suggests-rcna75103',
    },
    {
      title: 'People have been setting their pets new year resolutions, study reveals',
      body: 'Nearly four in 10 pet owners have set a new year’s resolution for their animal companion - if only to help them achieve their own goals',
      url: 'https://www.independent.co.uk/life-style/pet-owners-new-year-resolutions-b2265134.html',
    },
  ];

  const scrollX = new Animated.Value(0);

  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

  return (

    <View style={styles.background}>

      <View style={styles.statusBar} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: Platform.OS === 'android' ? 68 : 68, marginTop: 30 }}
      >

        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentInset={{ left: 50, right: 50 }}
          snapToAlignment="center"
          snapToInterval={Dimensions.get('window').width}
          disableIntervalMomentum
          decelerationRate="fast"
          directionalLockEnabled
          pagingEnabled
          scrollEventThrottle={14}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true },
          )}
          style={{
            width: Dimensions.get('window').width, paddingBottom: 20,
          }}
        >
          <EventTab />
          <EventTab />
          <EventTab />
        </Animated.ScrollView>

        <View style={styles.newsAnimScrollView}>
          <RNAnimatedScrollIndicators
            numberOfCards={3}
            scrollWidth={Dimensions.get('window').width}
            activeColor={isDarkMode === 'light' ? pawYellow : pawPink}
            inActiveColor={isDarkMode === 'light' ? pawLightGrey : pawWhite}
            scrollAnimatedValue={scrollX}
          />
        </View>

        { data.map((article) => <NewsComponent article={article} key={article.title} />) }
      </ScrollView>
    </View>
  );
}
