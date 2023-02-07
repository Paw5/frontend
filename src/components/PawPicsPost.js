import {
  View, Text, ScrollView, Pressable, Image, Dimensions,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import lstyles, { pawPink, pawGrey, pawWhite } from '../constants/Styles';
import dstyles, {
  pawYellow,
} from '../constants/DarkStyles';
import PawPostComment from './PawPostComment';
import ProfileClick from './ProfileClick';

const miso = require('../../assets/petPhotos/miso.jpg');

export default function PawPostPost() {
  const [styles, setStyles] = useState(lstyles);
  const isDarkMode = useSelector((state) => state.settings.darkMode);

  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

  const [isPicVisible, setPicVisible] = useState(false);
  const togglePic = () => {
    setPicVisible(!isPicVisible);
  };

  const [isProfileVisible, setProfileVisible] = useState(false);
  const toggleProfile = () => {
    setProfileVisible(!isProfileVisible);
  };

  return (
    <View>
      <Pressable style={[styles.picContainer, { height: 400 }]} onPress={togglePic}>
        <Image
          style={styles.picImage}
          source={miso}
        />
        <View
          style={styles.picBottomBand}
        />
        <Pressable>
          <Feather
            name="heart"
            size={24}
            color={isDarkMode === 'light' ? pawYellow : pawPink}
            style={styles.likeLoc1}
          />

        </Pressable>
        <Pressable style={styles.ppProfileNameNode} onPress={toggleProfile}>
          <Text style={styles.picHeader2}>@user-name</Text>
        </Pressable>
        <Pressable style={styles.ppProfileImageHolder} onPress={toggleProfile}>
          <Image
            style={styles.ppProfileImage}
            source={miso}
          />
        </Pressable>
        <Text style={[styles.picDescription, { left: 2, top: 220 }]}>Descriptive Text</Text>
        <View
          style={styles.picLine}
        />
        <Text style={[styles.picTag, { left: 2, top: 265 }]}>Tags</Text>
      </Pressable>

      <Modal
        isVisible={isPicVisible}
        onBackdropPress={() => isPicVisible}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        hasBackdrop={false}
        style={styles.picsModal}
      >
        <View>
          <Image
            style={styles.inspicImage}
            source={miso}
          />
          <View
            style={styles.inspicBottomBand}
          />
          <View style={styles.inspicContainer} />
          <Pressable>
            <Feather
              name="heart"
              size={24}
              color={isDarkMode === 'light' ? pawYellow : pawPink}
              style={styles.likeLoc2}
            />
          </Pressable>
          <Pressable style={styles.insppProfileNameNode} onPress={toggleProfile}>
            <Text style={styles.picHeader2}>@user-name</Text>
          </Pressable>
          <Pressable
            style={styles.insppProfileImageHolder}
            onPress={toggleProfile}
          >
            <Image
              style={styles.ppProfileImage}
              source={miso}
            />
          </Pressable>
          <Text style={[styles.inspicDescription, { left: -8, top: (Dimensions.get('window').width - 80) }]}>Descriptive Text</Text>
          <View
            style={styles.ispPicLine}
          />
          <Text style={[styles.inspicTag, { left: -8, top: (Dimensions.get('window').width - 37.5) }]}>Tags</Text>
          <Pressable
            onPress={togglePic}
            style={styles.togglePicStyle}
          >
            <Feather
              name="chevron-left"
              size={30}
              color={isDarkMode === 'light' ? pawYellow : pawGrey}
              style={styles.exitPicButton}
            />

          </Pressable>
        </View>
        <View style={styles.pawPicsHoldView}>
          <View
            style={styles.pawPicsWrappingView}
          />
          <ScrollView style={{ marginTop: Dimensions.get('window').width - 70 }}>

            <PawPostComment />
            <PawPostComment />
            <PawPostComment />
            <PawPostComment />
            <PawPostComment />
            <PawPostComment />
            <PawPostComment />
            <PawPostComment />
            <PawPostComment />
            <PawPostComment />
            <PawPostComment />
            <PawPostComment />

          </ScrollView>
        </View>
      </Modal>
      <Modal
        isVisible={isProfileVisible}
        onBackdropPress={() => isProfileVisible}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        hasBackdrop={false}
        style={styles.oProfModal}
      >
        <Pressable
          onPress={toggleProfile}
          style={styles.toggleProfilePressible}
        >
          <Feather
            name="chevron-left"
            size={30}
            color={isDarkMode === 'light' ? pawYellow : pawGrey}
            style={styles.exitPicButton}
          />
        </Pressable>
        <ProfileClick />
      </Modal>
    </View>
  );
}
