import {
  View, Text, Pressable, Linking, TextInput, Image, Platform, Dimensions,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import MapLocation from '../components/mapLocation';
import Network from '../util/Network';
import { setHasLoaded } from '../redux/LocationLoaderSlice';

const mapPin = require('../../assets/map_pin_s.png');
const noPetF = require('../../assets/notPetFriendly.png');
const PetF = require('../../assets/petFriendly.png');

const StatusBarHeight = getStatusBarHeight();
const _ = Network();

export default function MapTab() {
  const dispatch = useDispatch();
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
  const [isNewLocVisible, setNewLocVisible] = useState(false);
  const toggleNewLoc = () => {
    setNewLocVisible(!isNewLocVisible);
    if (isNewLocVisible) {
      setNewLocVisible(!isNewLocVisible);
    }
  };

  const [newLoc, setNewLoc] = useState({});
  const [coordsNow, setCoords] = useState([]);
  const [locNow, setLoc] = useState([]);
  const [descNow, setDesc] = useState([]);
  const [rateNow, setRate] = useState([]);
  const [pfNow, setPF] = useState([]);
  const [eorw, seteorw] = useState([]);
  const [nors, setnors] = useState([]);
  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked3, setChecked3] = useState(false);
  const [isChecked4, setChecked4] = useState(false);
  const [isChecked5, setChecked5] = useState(false);

  const [locPins, setLocPins] = useState(() => []);

  const [isCheckedx, setCheckedx] = useState(false);
  const [isCheckedcheck, setCheckedcheck] = useState(false);
  const [isLocationVisible, setLocationVisible] = useState(false);
  const hasLoaded = useSelector((state) => state.locationLoader.hasLoaded);
  const newLocEntry = newLoc;
  newLocEntry.rating = 0;
  newLocEntry.pet_friendly = true;
  newLocEntry.coords = [];

  const updateNewLoc = (key, value) => {
    if (key !== 'lat' && key !== 'lon') {
      newLocEntry[key] = value;
    } else if (key === 'lat') {
      newLocEntry.coords[0] = value;
    } else {
      newLocEntry.coords[1] = value;
    }
    setNewLoc(newLocEntry);
  };

  const openmap = () => {
    setReviewVisible(!isReviewVisible);
    if (isReviewVisible) {
      setReviewVisible(!isReviewVisible);
    }
    setLocationVisible(!isLocationVisible);
    if (isLocationVisible) {
      setLocationVisible(!isLocationVisible);
    }
    Linking.openURL(`https://www.google.com/maps/place/${Math.abs(Math.trunc(coordsNow[0]))}%C2%B0${Math.abs(Math.trunc((coordsNow[0] % 1) * 60))}'${Math.abs(Math.trunc((((coordsNow[0] % 1) * 60) % 1) * 60))}%22${nors}+${Math.abs(Math.trunc(coordsNow[1]))}%C2%B0${Math.abs(Math.trunc((coordsNow[1] % 1) * 60))}'${Math.abs(Math.trunc((((coordsNow[1] % 1) * 60) % 1) * 60))}%22${eorw}/@${coordsNow[0]},${coordsNow[1]}`);
  };

  const addLocToDB = async () => {
    console.log(newLoc);
    const networkResponse = await _.post('locations', newLoc);
    networkResponse.onSuccess(() => {
      // resetAddForm();
      setNewLoc({});
    });
  };

  if (!hasLoaded) {
    _.get('locations').then((results) => {
      const locations = results.data();
      setLocPins(locations);
      dispatch(setHasLoaded(true));
    });
  }

  const toggleLocation = (coords, loc, desc, rate, pf) => {
    setLocationVisible(!isLocationVisible);
    console.log(coords, loc, desc, rate, pf);
    setCoords(coords);
    setLoc(loc);
    setDesc(desc);
    setRate(rate);
    setPF(pf);
    seteorw('W');
    if (coords[1] > 0) {
      seteorw('E');
    }
    setnors('S');
    if (coords[0] > 0) {
      setnors('N');
    }
    if (isLocationVisible) {
      setLocationVisible(!isLocationVisible);
    }
  };

  return (
    <View>
      <View style={styles.statusBar} />
      <Loader show={initialLocation.loaded}>
        <View style={styles.containerMap}>
          <View>

            <MapView
              style={styles.map}
              customMapStyle={isDarkMode === 'light' ? darkMap : lightMap}
              provider="google"
              showsUserLocation
              followsUserLocation
              region={initialLocation}
              initialRegion={initialLocation}
            >
              {/* eslint-disable-next-line max-len */}
              { locPins.map((location) => <MapLocation pressAction={() => toggleLocation(location.coords, location.name, location.description, location.rating, location.pet_friendly)} coords={location.coords} />) }
            </MapView>

          </View>
        </View>
        <View style={[styles.search, { position: 'absolute', top: StatusBarHeight }]}>
          <SearchBar />
        </View>
        <View style={styles.search}>
          <Pressable style={[styles.filters, { left: Dimensions.get('window').width - 100, bottom: Platform.OS === 'ios' ? 73 : 68 }]} onPress={() => setNewLocVisible(true)}>
            <Feather
              name="plus"
              size={20}
              color={pawGrey}
            />
          </Pressable>
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
              How was
              {' '}
              {locNow}
              ?
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
      <Modal
        isVisible={isLocationVisible}
        animationType="slide"
        hasBackdrop={false}
        onBackdropPress={() => {
          setLocationVisible(!isLocationVisible);
        }}
        onRequestClose={() => {
          setLocationVisible(!isLocationVisible);
        }}

      >
        <View
          showsVerticalScrollIndicator={false}
          style={styles.locationPopup}
        >

          <View style={{ flexDirection: 'row' }}>
            <Pressable
              onPress={toggleLocation}
              style={{ alignSelf: 'flex-start', margin: 10 }}
            >
              <Feather
                name="chevron-left"
                size={30}
                color={pawGrey}
                style={styles.settingsExitButton}
              />
            </Pressable>
            <Image
              style={styles.locationImage}
              source={mapPin}
            />

          </View>
          <Text style={styles.locationName}>{locNow}</Text>
          <Text style={styles.locationDesc} numberOfLines={5}>
            {descNow}
            {' '}
            {'\n\n\n\n'}
          </Text>
          <View>
            <Feather
              name="star"
              size={40}
              color={rateNow <= 1 ? pawWhite : pawYellow}
              style={styles.locStar1}
            />
            <Feather
              name="star"
              size={40}
              color={rateNow <= 2 ? pawWhite : pawYellow}
              style={styles.locStar2}
            />
            <Feather
              name="star"
              size={40}
              color={rateNow <= 3 ? pawWhite : pawYellow}
              style={styles.locStar3}
            />
            <Feather
              name="star"
              size={40}
              color={rateNow <= 4 ? pawWhite : pawYellow}
              style={styles.locStar4}
            />
            <Feather
              name="star"
              size={40}
              color={rateNow === 5 ? pawYellow : pawWhite}
              style={styles.locStar5}
            />
          </View>
          <Image
            source={pfNow === true ? PetF : noPetF}
            style={{
              height: 120, width: 120, margin: 10, marginLeft: 30,
            }}
          />
          <Pressable
            style={[styles.navButton, { justifyContent: 'center' }]}
            onPress={openmap}
          >
            <Text style={styles.navigateMsg}>
              Navigate
              {'     '}
              {'>'}
            </Text>
          </Pressable>
        </View>

      </Modal>
      <Modal
        isVisible={isNewLocVisible}
        animationType="slide"
        hasBackdrop={false}
      >
        <View
          showsVerticalScrollIndicator={false}
          style={styles.locationPopup}
        >

          <View style={{ flexDirection: 'row' }}>
            <Pressable
              onPress={toggleNewLoc}
              style={{ alignSelf: 'flex-start', margin: 10 }}
            >
              <Feather
                name="chevron-left"
                size={30}
                color={pawGrey}
                style={styles.settingsExitButton}
              />
            </Pressable>
            <Pressable style={{
              jusifyContent: 'center', top: 10, alignContent: 'center', backgroundColor: pawWhite, borderRadius: 50, height: 55, width: Dimensions.get('window').width / 1.4,
            }}
            >
              <TextInput
                clearTextOnFocus
                autoCapitalize="words"
                placeholder="Location Name"
                placeholderTextColor={isDarkMode === 'light' ? pawYellow : pawGrey}
                style={[styles.navigateMsg, {
                  fontSize: 22, textAlign: 'center', textAlignVertical: 'center', width: 'auto',
                }]}
                onChangeText={(text) => updateNewLoc('name', text)}
              />
            </Pressable>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Pressable style={{
              jusifyContent: 'center', top: 10, marginRight: 10, alignContent: 'center', backgroundColor: pawWhite, borderRadius: 50, height: 55, width: Dimensions.get('window').width / 2.5,
            }}
            >
              <TextInput
                clearTextOnFocus
                autoCapitalize="words"
                placeholder="Latitude"
                placeholderTextColor={isDarkMode === 'light' ? pawYellow : pawGrey}
                style={[styles.navigateMsg, {
                  fontSize: 22, textAlign: 'center', textAlignVertical: 'center', width: 'auto',
                }]}
                onChangeText={(text) => updateNewLoc('lat', text)}
              />
            </Pressable>
            <Pressable style={{
              jusifyContent: 'center', top: 10, marginRight: 10, alignContent: 'center', backgroundColor: pawWhite, borderRadius: 50, height: 55, width: Dimensions.get('window').width / 2.5,
            }}
            >
              <TextInput
                clearTextOnFocus
                autoCapitalize="words"
                placeholder="Longitude"
                placeholderTextColor={isDarkMode === 'light' ? pawYellow : pawGrey}
                style={[styles.navigateMsg, {
                  fontSize: 22, textAlign: 'center', textAlignVertical: 'center', width: 'auto',
                }]}
                onChangeText={(text) => updateNewLoc('lon', text)}
              />
            </Pressable>
          </View>
          <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'center' }}>
            <Pressable style={{
              jusifyContent: 'center', top: 10, marginRight: 10, alignContent: 'center', backgroundColor: pawWhite, borderRadius: 30, height: (Dimensions.get('window').height / 6) * (2.6 / 3.13), width: Dimensions.get('window').width - 40,
            }}
            >
              <TextInput
                clearTextOnFocus
                placeholder="Location Description"
                placeholderTextColor={isDarkMode === 'light' ? pawYellow : pawGrey}
                style={[styles.navigateMsg, {
                  fontSize: 18, paddingLeft: 15, textAlign: 'left', width: 'auto',
                }]}
                onChangeText={(text) => updateNewLoc('description', text)}
              />
            </Pressable>
          </View>
          <Pressable
            style={[styles.newLocSubmit, { marginTop: 15, alignSelf: 'center', justifyContent: 'center' }]}
            onPress={toggleNewLoc}
          >
            <Text style={[styles.navigateMsg, { textAlign: 'center' }]} onPress={() => { addLocToDB(); }}>
              Submit
              {'   >'}
            </Text>
          </Pressable>
        </View>

      </Modal>
    </View>
  );
}
