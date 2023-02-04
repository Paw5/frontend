import {
  View, Image, TextInput, Switch, Pressable, Text, ScrollView, Animated, Dimensions,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import RNAnimatedScrollIndicators from 'react-native-animated-scroll-indicators';
import * as ImagePicker from 'expo-image-picker';
import lstyles, { pawWhite, pawGreen, pawPink } from '../constants/Styles';
import dstyles, {
  pawYellow, pawLightGrey, pawGrey,
} from '../constants/DarkStyles';
import ProfilePhotoCard from '../components/ProfilePhotoCard';
import ProfilePostCard from '../components/ProfilePostCard';

const miso = require('../../assets/petPhotos/miso.jpg');

export default function CommunityTab(bioUpdate) {
  const [styles, setStyles] = useState(lstyles);
  const [image, setImage] = useState(null); // *** PASS image.uri TO DATABASE? ***
  const newImageAdded = async () => {
    const newImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
      aspect: [4, 4],
    });
    setImage(newImage.uri);
  };
  const isDarkMode = useSelector((state) => state.settings.darkMode);
  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

  const scrollX = new Animated.Value(0);
  const [VisisEnabled, VissetIsEnabled] = useState(false);
  const visSwitch = () => VissetIsEnabled((previousState) => !previousState);

  const [isNewPostVisible, setNewPostVisible] = useState(false);
  const toggleNewPostVisible = () => {
    setNewPostVisible(!isNewPostVisible);
  };
  const [isNewTextVisible, setNewTextVisible] = useState(false);
  const toggleNewText = () => {
    setNewTextVisible(!isNewTextVisible);
    if (isNewPostVisible) {
      setNewPostVisible(!isNewPostVisible);
    }
  };

  const [isNewImageVisible, setNewImageVisible] = useState(false);
  const toggleNewImage = () => {
    setNewImageVisible(!isNewImageVisible);
    if (isNewPostVisible) {
      setNewPostVisible(!isNewPostVisible);
    }
  };

  const [isFSVisible, setFSVisible] = useState(false);
  const toggleForumSettings = () => {
    setFSVisible(!isFSVisible);
  };

  const [isEBVisible, setEBVisible] = useState(false);
  const toggleEditBio = () => {
    setEBVisible(!isEBVisible);
  };
  return (
    <View style={styles.background}>
      <View style={styles.statusBar} />
      <Image
        style={styles.oProfileImage}
        source={miso}
      />
      <Pressable
        onPress={toggleForumSettings}
        style={{
          alignSelf: 'flex-start', position: 'absolute', top: 60, left: 10,
        }}
      >
        <Feather
          name="settings"
          size={30}
          color={isDarkMode === 'light' ? pawYellow : pawWhite}
          style={styles.exitProfButton}
        />

      </Pressable>
      <Pressable
        onPress={toggleNewPostVisible}
        style={{
          alignSelf: 'flex-end', position: 'absolute', top: 60, right: 10,
        }}
      >
        <Feather
          name="plus"
          size={30}
          color={isDarkMode === 'light' ? pawYellow : pawWhite}
          style={styles.exitProfButton}
        />

      </Pressable>
      <Modal
        animationType="fade"
        transparent
        visible={isNewPostVisible}
        onBackdropPress={() => {
          setNewPostVisible(!isNewPostVisible);
        }}
        onRequestClose={() => {
          setNewPostVisible(!isNewPostVisible);
        }}
      >
        <View style={[styles.modalView, {
          borderWidth: 5, borderColor: pawPink, top: 200,
        }]}
        >
          <View>
            <Text style={[styles.filterText, { textAlign: 'center', fontSize: 30 }]}>
              What do you want to upload?
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <Pressable onPress={toggleNewText}>
              <Feather
                name="file-plus"
                size={30}
                color={pawWhite}
                style={[styles.settingsExitButton, {
                  backgroundColor: pawGrey, marginRight: 50, marginTop: 40,
                }]}
              />
            </Pressable>
            <Pressable onPress={toggleNewImage}>
              <Feather
                name="camera"
                size={30}
                color={pawWhite}
                style={[styles.settingsExitButton, {
                  backgroundColor: pawGrey, marginLeft: 50, marginTop: 40,
                }]}
              />
            </Pressable>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={[styles.filterText, { textAlign: 'center', marginRight: 35 }]}>
              Text Post
            </Text>
            <Text style={[styles.filterText, { textAlign: 'center', marginLeft: 35 }]}>
              Image Post
            </Text>
          </View>
        </View>
      </Modal>
      <View style={styles.oProfileBio}>
        <Text style={styles.oProfBioText} numberOfLines={6}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute i
          dolor in reprehenderit in voluptate velit esse cillum dolore eu fiat nulla paatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.

        </Text>
      </View>
      <View style={styles.oProfileName}>
        <Text style={styles.oProfNameText}>@user-name</Text>
      </View>
      <View
        style={styles.profBottomBand}
      />
      <View style={styles.scrollIndicatorProfile}>
        <RNAnimatedScrollIndicators
          numberOfCards={2}
          scrollWidth={Dimensions.get('window').width}
          activeColor={isDarkMode === 'light' ? pawYellow : pawPink}
          inActiveColor={isDarkMode === 'light' ? pawLightGrey : pawWhite}
          scrollAnimatedValue={scrollX}
        />
      </View>
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            width: Dimensions.get('window').width, left: -12, marginBottom: 75, paddingBottom: 60,
          }}
        >
          <View style={styles.photoGrid}>
            <ProfilePhotoCard />
            <ProfilePhotoCard />
            <ProfilePhotoCard />
            <ProfilePhotoCard />
            <ProfilePhotoCard />
            <ProfilePhotoCard />
            <ProfilePhotoCard />
            <ProfilePhotoCard />
            <ProfilePhotoCard />
            <ProfilePhotoCard />
            <ProfilePhotoCard />
            <ProfilePhotoCard />
            <ProfilePhotoCard />
            <ProfilePhotoCard />
            <ProfilePhotoCard />
            <ProfilePhotoCard />
            <ProfilePhotoCard />
            <ProfilePhotoCard />
            <ProfilePhotoCard />
            <ProfilePhotoCard />
            <ProfilePhotoCard />
            <ProfilePhotoCard />
            <ProfilePhotoCard />
            <ProfilePhotoCard />
          </View>
          <View style={{ height: 20 }} />
        </ScrollView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            width: Dimensions.get('window').width, left: -10, marginBottom: 75, paddingBottom: 60,
          }}
        >
          <ProfilePostCard />
          <ProfilePostCard />
          <ProfilePostCard />
          <ProfilePostCard />
          <ProfilePostCard />
          <ProfilePostCard />
          <ProfilePostCard />
        </ScrollView>
      </Animated.ScrollView>
      <Modal
        isVisible={isNewTextVisible}
        onBackdropPress={() => isNewTextVisible}
        animationType="slide"
        hasBackdrop={false}
        style={styles.newPostModal}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flexDirection: 'row' }}>
            <Pressable
              onPress={toggleNewText}
              style={{ alignSelf: 'flex-start', margin: 10 }}
            >
              <Feather
                name="chevron-left"
                size={30}
                color={pawGrey}
                style={styles.settingsExitButton}
              />
            </Pressable>
            <Pressable
              onPress={toggleNewText/* ** SEND TEXT POST TO DATABASE AND CLOSE MODAL ** */}
              style={{
                position: 'absolute', alignSelf: 'flex-end', right: 10, top: 10,
              }}
            >
              <Feather
                name="share"
                size={30}
                color={pawGrey}
                style={styles.settingsExitButton}
              />
            </Pressable>
          </View>
          <View style={[styles.container, {
            borderRadius: 30, justifyContent: 'center', height: 400, backgroundColor: pawWhite, left: 3.5,
          }]}
          >
            <TextInput
              style={[styles.input, { margin: 10, alignSelf: 'flex-start' }]}
              placeholder="Input Text Post"
              placeholderTextColor={isDarkMode === 'light' ? '#edae4985' : '#33333385'}
              // value={ **NOT SURE WHAT IS NEEDED FOR DATABASE **}

            />
          </View>
          <View style={[styles.container, {
            padding: 0, borderRadius: 30, justifyContent: 'center', height: 50, backgroundColor: pawWhite, left: 3.5,
          }]}
          >
            <TextInput
              style={[styles.input, { margin: 10, alignSelf: 'flex-start' }]}
              placeholder="Add tags"
              placeholderTextColor={isDarkMode === 'light' ? '#edae4985' : '#33333385'}
            />
          </View>

        </ScrollView>
      </Modal>
      <Modal
        isVisible={isNewImageVisible}
        onBackdropPress={() => isNewImageVisible}
        animationType="slide"
        hasBackdrop={false}
        style={styles.newPostModal}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flexDirection: 'row' }}>
            <Pressable
              onPress={toggleNewImage}
              style={{ alignSelf: 'flex-start', margin: 10 }}
            >
              <Feather
                name="chevron-left"
                size={30}
                color={pawGrey}
                style={styles.settingsExitButton}
              />
            </Pressable>
            <Pressable
              onPress={toggleNewImage /* ** SEND IMAGE POST TO DATABASE AND CLOSE MODAL ** */}
              style={{
                position: 'absolute', alignSelf: 'flex-end', right: 10, top: 10,
              }}
            >
              <Feather
                name="share"
                size={30}
                color={pawGrey}
                style={styles.settingsExitButton}
              />
            </Pressable>
          </View>
          <View>
            <Pressable onPress={newImageAdded} style={styles.newPicPic}>
              <Feather
                name="plus"
                size={30}
                color={pawGreen}
                style={styles.settingsExitButton}
              />
              {image && <Image source={{ uri: image }} style={[styles.newPicPic, { position: 'absolute' }]} />}
            </Pressable>

          </View>
          <View style={[styles.container, {
            borderRadius: 30, justifyContent: 'center', height: 200, backgroundColor: pawWhite, left: 3.5,
          }]}
          >
            <TextInput
              style={[styles.input, { margin: 10, alignSelf: 'flex-start' }]}
              placeholder="Input Text Post"
              placeholderTextColor={isDarkMode === 'light' ? '#edae4985' : '#33333385'}
            />
          </View>
          <View style={[styles.container, {
            padding: 0, top: -10, borderRadius: 30, justifyContent: 'center', height: 50, backgroundColor: pawWhite, left: 3.5,
          }]}
          >
            <TextInput
              style={[styles.input, { margin: 10, alignSelf: 'flex-start' }]}
              placeholder="Add tags"
              placeholderTextColor={isDarkMode === 'light' ? '#edae4985' : '#33333385'}
            />
          </View>
        </ScrollView>
      </Modal>
      <Modal
        isVisible={isEBVisible}
        onBackdropPress={() => isEBVisible}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        hasBackdrop={false}
        style={styles.editBioModal}
      >
        <View styles={styles.searchBar}>
          <TextInput
            style={styles.input}
            placeholder="Previous Bio"
            placeholderTextColor={isDarkMode === 'light' ? '#edae4985' : '#33333385'}
            value={bioUpdate}
          />
        </View>
        <Pressable
          onPress={toggleEditBio}
          style={{
            alignSelf: 'flex-start', position: 'absolute', bottom: 25, left: 25,
          }}
        >
          <Feather
            name="x"
            size={30}
            color={pawGrey}
            style={styles.settingsExitButton}
          />

        </Pressable>
        <Pressable
          onPress={toggleEditBio}
          style={{
            alignSelf: 'flex-start', position: 'absolute', bottom: 25, right: 25,
          }}
        >
          <Feather
            name="check"
            size={30}
            color={pawGrey}
            style={styles.settingsExitButton}
          />

        </Pressable>
      </Modal>
      <Modal
        isVisible={isFSVisible}
        onBackdropPress={() => isFSVisible}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        hasBackdrop={false}
        style={styles.settingsModal}
      >
        <View style={styles.settingsModal}>
          <Pressable
            onPress={toggleForumSettings}
            style={{ alignSelf: 'flex-start' }}
          >
            <Feather
              name="chevron-left"
              size={30}
              color={pawGrey}
              style={styles.settingsExitButton}
            />

          </Pressable>

          <View>
            <Feather
              name="archive"
              size={100}
              color={pawGrey}
              style={styles.settingsIcon}
            />
          </View>
          <Pressable onPress={toggleEditBio} style={[styles.settingsItem, { marginRight: 20, width: Dimensions.get('window').width - 40 }]}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={styles.settingsText}
            >
              Edit Bio
            </Text>
            <Feather
              name="edit-2"
              size={30}
              color={(isDarkMode === 'light' ? pawGreen : pawGrey)}
              style={{ marginRight: -5 }}
            />
          </Pressable>
          <View style={[styles.settingsItem, { marginRight: 20, width: Dimensions.get('window').width - 40 }]}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={styles.settingsText}
            >
              Profile Visibility
            </Text>
            <Switch
              style={styles.settingsSwitch}
              trackColor={{ false: isDarkMode === 'light' ? pawGreen : pawPink, true: pawGrey }}
              thumbColor={isDarkMode === 'light' ? pawLightGrey : pawWhite}
              ios_backgroundColor={isDarkMode === 'light' ? pawGreen : pawPink}
              onValueChange={visSwitch}
              value={VisisEnabled}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
