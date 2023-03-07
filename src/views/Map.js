import {
  View, Text, Pressable, Linking, TextInput,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MapView from 'react-native-maps';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Modal from 'react-native-modal';
import { Feather } from '@expo/vector-icons';
import SearchBar from '../components/SearchBarServ';
import lstyles, {
  pawPink, pawGrey, pawWhite,
} from '../constants/Styles';
import dstyles, { pawYellow } from '../constants/DarkStyles';
import lightMap from '../constants/lightMap.json';
import darkMap from '../constants/darkMap.json';
import Loader from './Loader';

const StatusBarHeight = getStatusBarHeight();

export default function MapTab() {
  const [styles, setStyles] = useState(lstyles);
  const isDarkMode = useSelector((state) => state.settings.darkMode);
  const initialLocation = useSelector((state) => state.location.region);

  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

  const [isReviewVisible, setReviewVisible] = useState(false);
  const toggleReview = () => {
    setReviewVisible(!isReviewVisible);
    if (isReviewVisible) {
      setReviewVisible(!isReviewVisible);
    }
  };

  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked3, setChecked3] = useState(false);
  const [isChecked4, setChecked4] = useState(false);
  const [isChecked5, setChecked5] = useState(false);

  const [isCheckedx, setCheckedx] = useState(false);
  const [isCheckedcheck, setCheckedcheck] = useState(false);

  const openmap = () => {
    setReviewVisible(!isReviewVisible);
    if (isReviewVisible) {
      setReviewVisible(!isReviewVisible);
    }
    Linking.openURL('https://www.google.com/maps/place/Denton,+TX/@32.9972427,-96.3332429,15z/data=!4m6!3m5!1s0x864c4ca0c088b1d1:0x724474cb4814fb1b!8m2!3d33.2148412!4d-97.1330683!16zL20vMDEwMDE2');
  };

  return (
    <View>
      <View style={styles.statusBar} />
      <Loader show={initialLocation.loaded}>
        <View style={styles.containerMap}>
          <View>
            <Pressable style={{ backgroundColor: '#FFFFF' }} onPress={openmap}>
              {/* //'maps://app?saddr=Denton&Texas')}> */}
              <Text />
            </Pressable>
            <MapView
              style={styles.map}
              customMapStyle={isDarkMode === 'light' ? darkMap : lightMap}
              provider="google"
              showsUserLocation
              followsUserLocation
              region={initialLocation}
              initialRegion={initialLocation}
            />

          </View>
        </View>
        <View style={[styles.search, { position: 'absolute', top: StatusBarHeight }]}>
          <SearchBar />
        </View>
      </Loader>
      <Modal
        animationType="fade"
        transparent
        visible={isReviewVisible}
        onBackdropPress={() => {
          setReviewVisible(!isReviewVisible);
        }}
        onRequestClose={() => {
          setReviewVisible(!isReviewVisible);
        }}
      >
        <View style={[styles.modalView, {
          padding: 25, borderWidth: 5, borderColor: pawPink, top: 200,
        }]}
        >
          <View>
            <Text style={[styles.filterText, { textAlign: 'center', fontSize: 25 }]}>
              Hey, [username]!
            </Text>
            <Text style={[styles.filterText, { textAlign: 'center', fontSize: 15 }]}>
              How was [location name]?
            </Text>
            <View style={{
              flexDirection: 'row', flex: 1, margin: 5, alignSelf: 'center', marginTop: 10,
            }}
            >
              <Pressable
                onPress={() => setChecked1(!isChecked1)}
              >
                <Feather
                  name="star"
                  size={35}
                  fill={pawYellow}
                  color={isChecked1 ? pawYellow : pawGrey}
                />
              </Pressable>
              <Pressable onPress={() => {
                setChecked2(!isChecked2);
                setChecked1(!isChecked1);
              }}
              >
                <Feather
                  name="star"
                  size={35}
                  fill={pawYellow}
                  color={isChecked2 ? pawYellow : pawGrey}
                />
              </Pressable>
              <Pressable onPress={() => {
                setChecked3(!isChecked3);
                setChecked2(!isChecked2);
                setChecked1(!isChecked1);
              }}
              >
                <Feather
                  name="star"
                  size={35}
                  fill={pawYellow}
                  color={isChecked3 ? pawYellow : pawGrey}
                />
              </Pressable>
              <Pressable onPress={() => {
                setChecked4(!isChecked4);
                setChecked3(!isChecked3);
                setChecked2(!isChecked2);
                setChecked1(!isChecked1);
              }}
              >
                <Feather
                  name="star"
                  size={35}
                  fill={pawYellow}
                  color={isChecked4 ? pawYellow : pawGrey}
                />
              </Pressable>
              <Pressable onPress={() => {
                setChecked5(!isChecked5);
                setChecked4(!isChecked4);
                setChecked3(!isChecked3);
                setChecked2(!isChecked2);
                setChecked1(!isChecked1);
              }}
              >
                <Feather
                  name="star"
                  size={35}
                  fill={pawYellow}
                  color={isChecked5 ? pawYellow : pawGrey}
                />
              </Pressable>

            </View>
          </View>
          <Text style={[styles.filterText, { textAlign: 'center', fontSize: 15 }]}>
            Were they pet friendly?
          </Text>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <Pressable onPress={() => {
              setCheckedx(!isCheckedx);
              if (!isCheckedcheck) {
                setCheckedcheck(!isCheckedcheck);
              }
            }}
            >
              <Feather
                name="x"
                size={10}
                color={isCheckedx ? pawWhite : pawPink}
                style={[styles.settingsExitButton, {
                  backgroundColor: pawGrey, marginRight: 10, marginTop: 4, marginBottom: 0,
                }]}
              />
            </Pressable>
            <Pressable onPress={() => {
              setCheckedcheck(!isCheckedcheck);
              if (!isCheckedx) {
                setCheckedx(!isCheckedx);
              }
            }}
            >
              <Feather
                name="check"
                size={10}
                color={isCheckedcheck ? pawWhite : pawPink}
                style={[styles.settingsExitButton, {
                  backgroundColor: pawGrey, marginLeft: 10, marginTop: 4, marginBottom: 0,
                }]}
              />
            </Pressable>
          </View>
          <Text style={{ marginTop: 10, marginLeft: 10 }}>Tell Us More!</Text>
          <TextInput
            style={[styles.input, {
              margin: 5, padding: 10, borderWidth: 2, borderRadius: 20, fontSize: 10, alignContent: 'flex-start', borderColor: pawGrey, alignSelf: 'flex-start',
            }]}
            placeholder=""
            placeholderTextColor={isDarkMode === 'light' ? '#edae4985' : '#33333385'}
          />
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <Pressable onPress={toggleReview}>
              <Feather
                name="arrow-right-circle"
                size={30}
                color={pawWhite}
                style={[styles.settingsExitButton, {
                  backgroundColor: pawGrey, marginRight: 50, marginTop: 15, marginBottom: 0,
                }]}
              />
            </Pressable>
            <Pressable onPress={toggleReview}>
              <Feather
                name="check-circle"
                size={30}
                color={pawWhite}
                style={[styles.settingsExitButton, {
                  backgroundColor: pawGrey, marginLeft: 50, marginTop: 15, marginBottom: 0,
                }]}
              />
            </Pressable>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={[styles.filterText, { textAlign: 'center', marginRight: 55, marginBottom: 0 }]}>
              Skip
            </Text>
            <Text style={[styles.filterText, { textAlign: 'center', marginLeft: 55, marginBottom: 0 }]}>
              Submit
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}
