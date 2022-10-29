/* eslint-disable no-unused-vars */
import {
  StyleSheet, Dimensions, Platform,
} from 'react-native';
import Constants from 'expo-constants';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const TABBAR_WIDTH = Dimensions.get('window').width;
const TAB_WIDTH = TABBAR_WIDTH / 5;

const StatusBarHeight = getStatusBarHeight();

export const pawPink = '#e0777d';
export const pawGreen = '#69a297';
export const pawGrey = '#333333';

// eslint-disable-next-line no-unused-vars
export default StyleSheet.create({
  /* health styles */
  petCard: {
    height: 200,
    width: 160,
    backgroundColor: 'white',
    color: pawGrey,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 0,
    paddingBottom: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'center',
    margin: 10,
    marginTop: 0,
    marginBottom: 10,
    borderRadius: 25,
  },

  shadowProp: {
    shadowColor: pawGrey,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },

  petHeader: {
    fontSize: 32,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 5,
    fontFamily: 'QuicksandBold',
    color: pawGrey,
  },

  petImage: {
    height: 135,
    width: 135,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: pawPink,
  },

  healthContainer: {
    alignSelf: 'center',
    width: (Dimensions.get('window').width - 20),
    backgroundColor: 'white',
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 20,
  },

  healthHeader: {
    fontSize: 20,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 5,
    fontFamily: 'QuicksandBold',
    color: pawGrey,
  },
  /* account styles */
  profileBorder: {
    backgroundColor: 'white',
    height: 220,
    width: 220,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 150,
    marginBottom: 20,
  },
  profileImage: {
    height: 200,
    width: 200,
    alignSelf: 'center',
    borderRadius: 100,
    justifyContent: 'center',
  },
  menuItem: {
    alignSelf: 'center',
    width: (Dimensions.get('window').width - 20),
    backgroundColor: 'white',
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 20,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 18,
    paddingRight: 20,
  },
  menuText: {
    fontSize: 24,
    width: (Dimensions.get('window').width - 120),
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontFamily: 'QuicksandBold',
    color: pawGrey,
    flexBasis: 'auto',
  },
  profileIcon: {
    height: 150,
    width: 150,
    alignSelf: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 80,
    overflow: 'hidden',
    marginBottom: 40,
  },
  accountSwitch: {
    flexBasis: 'auto',
  },
  exitButton: {
    alignSelf: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 25,
    overflow: 'hidden',
    paddingRight: 11,
    paddingLeft: 9,
    marginLeft: 20,
  },
  accountModal: {
    backgroundColor: pawGreen,
    width: Dimensions.get('window').width,
    marginLeft: 0,
    marginTop: StatusBarHeight,
    marginBottom: 150,
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  accountImage: {
    height: 135,
    width: 135,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: pawPink,
    alignSelf: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  accountHeader: {
    fontSize: 32,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 5,
    fontFamily: 'QuicksandBold',
    color: pawGrey,
    flexBasis: 'auto',
    paddingLeft: 5,
  },
  accountCard: {
    height: 200,
    width: 160,
    backgroundColor: 'white',
    color: pawGrey,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 0,
    paddingBottom: 10,
    justifyContent: 'flex-end',
    alignSelf: 'center',
    margin: 10,
    marginTop: 0,
    marginBottom: -30,
    borderRadius: 25,
  },
  cameraIcon: {
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    position: 'absolute',
    right: 120,
    bottom: 40,
    padding: 8,
    paddingLeft: 9,
    borderRadius: 23,
    overflow: 'hidden',
  },
  /* settings styles */
  settingsIcon: {
    alignSelf: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 70,
    overflow: 'hidden',
    marginBottom: 60,
    marginTop: 20,
  },
  settingsItem: {
    alignSelf: 'center',
    width: (Dimensions.get('window').width - 20),
    backgroundColor: 'white',
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 20,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 18,
    paddingRight: 20,
  },
  settingsText: {
    fontSize: 24,
    width: (Dimensions.get('window').width - 120),
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontFamily: 'QuicksandBold',
    color: '#333333',
    flexBasis: 'auto',
    paddingRight: 10,
  },
  settingsSwitch: {
    flexBasis: 'auto',
  },
  settingsExitButton: {
    alignSelf: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 25,
    overflow: 'hidden',
    paddingRight: 11,
    paddingLeft: 9,
  },
  settingsModal: {
    backgroundColor: '#69A297',
    width: Dimensions.get('window').width,
    marginLeft: 0,
    marginTop: StatusBarHeight,
    marginBottom: 150,
    justifyContent: 'flex-start',
    paddingTop: 20,
    paddingLeft: 20,
  },
  /* services styles */
  servImage: {
    height: 160,
    width: 95,
    top: -30,
    left: -5,
    justifyContent: 'center',
    borderWidth: 3,
    borderRadius: 25,
    alignSelf: 'center',
    position: 'absolute',
    borderColor: pawPink,
  },

  servLeft: {
    height: 160,
    width: 90,
    borderRightWidth: 3,
    position: 'absolute',
    justifyContent: 'center',
    alignContent: 'center',
    borderColor: pawPink,
  },

  servCheck: {
    height: 25,
    width: 90,
    top: 100,
    position: 'absolute',
    borderRightWidth: 3,
    borderTopWidth: 3,
    backgroundColor: 'white',
    borderColor: pawPink,
  },
  servContainer: {
    alignSelf: 'center',
    width: (Dimensions.get('window').width - 20),
    backgroundColor: 'white',
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 20,
  },

  servHeader: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 1,
    marginLeft: 105,
    marginTop: 5,
    fontFamily: 'QuicksandBold',
    color: pawGrey,
  },

  servHeader2: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
    marginLeft: 105,
    fontFamily: 'QuicksandBold',
    color: pawGrey,
  },

  servStar1: {
    marginLeft: 260,
    marginTop: 10,
    position: 'absolute',
  },

  servStar2: {
    marginLeft: 280,
    marginTop: 10,
    position: 'absolute',
  },

  servStar3: {
    marginLeft: 300,
    marginTop: 10,
    position: 'absolute',
  },

  servStar4: {
    marginLeft: 320,
    marginTop: 10,
    position: 'absolute',
  },

  servStar5: {
    marginLeft: 340,
    marginTop: 10,
    position: 'absolute',
  },
  /* pm styles */
  pmUserInteraction: {
    backgroundColor: 'white',
    borderRadius: 80,
    overflow: 'hidden',
    height: 80,
    width: TABBAR_WIDTH - 20,
    alignSelf: 'center',
    borderWidth: 4,
    borderColor: pawPink,
    flexDirection: 'row',
    alignContent: 'center',
    marginBottom: 20,
  },
  pmUserImage: {
    height: 80,
    width: 80,
    marginLeft: -3,
    marginTop: -3,
    borderRadius: 100,
    overflow: 'hidden',
    borderWidth: 5,
    borderColor: pawPink,
  },
  pmPreview: {
    paddingTop: 6,
    paddingLeft: 10,
    flex: 2.5,
  },
  pmUserPreview: {
    fontFamily: 'QuicksandSemiBold',
    fontSize: 22,
    color: pawGrey,
  },
  pmUserMessagePreview: {
    paddingTop: 2,
    fontFamily: 'QuicksandLight',
    fontSize: 18,
    color: pawGrey,
  },
  pmMessageIcons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    marginRight: 15,
    paddingTop: 1,
  },
  /* PawPost styles */
  postContainer: {
    alignSelf: 'center',
    width: (Dimensions.get('window').width - 20),
    backgroundColor: 'white',
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 20,
  },

  ppoProfileImage: {
    height: 60,
    width: 60,
    top: 0,
    left: ((Dimensions.get('window').width - 20) / 2) - (60 + 37.5),
    borderRadius: 100,
    borderWidth: 3,
    position: 'absolute',
    borderColor: pawPink,
  },
  postTopBand: {
    height: 100,
    width: 200,
    borderRadius: 25,
    borderColor: pawPink,
    borderWidth: 300,
    zIndex: 51,
  },

  ppoProfileNameNode: {
    height: 30,
    width: 160,
    top: 15,
    left: ((Dimensions.get('window').width - 20) / 2) - 60,
    borderRadius: 100,
    borderWidth: 3,
    justifyContent: 'center',
    position: 'absolute',
    borderColor: pawPink,
    backgroundColor: 'white',
  },

  postHeader: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 1,
    marginLeft: 105,
    marginTop: 5,
    fontFamily: 'QuicksandBold',
    color: pawGrey,
  },

  postHeader2: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
    marginLeft: 20,
    fontFamily: 'QuicksandBold',
    color: pawGrey,
  },

  postDescription: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1,
    marginLeft: 20,
    fontFamily: 'QuicksandBold',
    color: pawGrey,
  },
  postTag: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
    marginLeft: 20,
    fontFamily: 'QuicksandBold',
    color: pawGrey,
  },
  /* PawPic styles */
  picImage: {
    height: 300,
    width: (Dimensions.get('window').width - 18),
    top: 0,
    left: 0,
    justifyContent: 'center',
    borderRadius: 25,
    alignSelf: 'center',
    position: 'absolute',
  },

  picBottomBand: {
    height: 300,
    width: (Dimensions.get('window').width - 18),
    top: 0,
    left: 3,
    justifyContent: 'center',
    borderRadius: 25,
    borderColor: pawPink,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    alignSelf: 'center',
    position: 'absolute',
  },

  likeLoc1: {
    left: (Dimensions.get('window').width - 18) - 40,
    top: 310,
  },

  picContainer: {
    alignSelf: 'center',
    width: (Dimensions.get('window').width - 20),
    backgroundColor: 'white',
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 20,
  },

  ppProfileImage: {
    height: 60,
    width: 60,
    top: 245,
    left: 0,
    borderRadius: 100,
    borderWidth: 3,
    position: 'absolute',
    borderColor: pawPink,
  },

  ppProfileNameNode: {
    height: 25,
    width: 160,
    top: 275,
    left: 37.5,
    borderRadius: 100,
    borderWidth: 3,
    justifyContent: 'center',
    position: 'absolute',
    borderColor: pawPink,
    backgroundColor: 'white',
  },

  picHeader: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 1,
    marginLeft: 105,
    marginTop: 5,
    fontFamily: 'QuicksandBold',
    color: pawGrey,
  },

  picHeader2: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
    marginLeft: 20,
    fontFamily: 'QuicksandBold',
    color: pawGrey,
  },

  picDescription: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1,
    marginLeft: 20,
    fontFamily: 'QuicksandBold',
    color: pawGrey,
  },
  picTag: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
    marginLeft: 20,
    fontFamily: 'QuicksandBold',
    color: pawGrey,
  },
  /* news/events styles */
  eventTab: {
    alignSelf: 'center',
    height: 'auto',
    width: Dimensions.get('window').width - 30,
    backgroundColor: 'white',
    borderRadius: 50,
    overflow: 'hidden',
    padding: 35,
    paddingBottom: 30,
    paddingTop: 25,
    marginRight: 15,
    marginLeft: 15,
  },
  eventHeader: {
    fontFamily: 'QuicksandBold',
    fontSize: 26,
  },
  eventDate: {
    fontFamily: 'QuicksandSemiBold',
    fontSize: 20,
    paddingTop: 5,
  },
  eventText: {
    fontFamily: 'QuicksandRegular',
    fontSize: 20,
    paddingLeft: 5,
    paddingRight: 30,
    textAlign: 'justify',
  },
  newsTab: {
    alignSelf: 'center',
    marginTop: 20,
    height: 'auto',
    width: Dimensions.get('window').width - 30,
    backgroundColor: 'white',
    borderRadius: 50,
    overflow: 'hidden',
    padding: 35,
    paddingBottom: 30,
    paddingTop: 25,
    marginRight: 15,
    marginLeft: 15,
  },
  newsHeader: {
    fontFamily: 'QuicksandBold',
    fontSize: 26,
    textAlign: 'center',
  },
  /* map styles */
  containerMap: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  search: {
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: -10,
    marginTop: -10,
  },
  container: {
    margin: 15,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    width: '90%',
    justifyContent: 'space-between',
  },
  searchBar: {
    padding: 10,
    flexDirection: 'row',
    marginRight: 40,
    width: 45,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 150,
    elevation: 24,
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: '90%',
  },
  filters: {
    position: 'absolute',
    marginLeft: 50,
    height: 45,
    width: 45,
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22.5,
    right: -5,
    elevation: 20,
  },
  filtersClose: {
    position: 'absolute',
    marginLeft: 50,
    height: 45,
    width: 45,
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: pawGreen,
    borderRadius: 22.5,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 0,
    right: 0,
    elevation: 20,
  },
  modalView: {
    margin: 15,
    flexDirection: 'row',
    // alignItems: 'center',
    padding: 45,
    marginTop: StatusBarHeight + 12,
    width: '92%',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 22.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 24,
  },
  tabBarContainer: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    position: 'absolute',
    width: Dimensions.get('window').width + 6,
    height: Platform.OS === 'ios' ? 80 : 73,
    borderRadius: 5,
    zIndex: 5,
    // borderWidth: 4,
    borderColor: 'rgba(158, 150, 150, .25)',
    bottom: -5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 100,
    shadowRadius: 20,
    elevation: 24,
  },
  circleAnimated: {
    width: TAB_WIDTH,
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  circle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FFFFFF',
    bottom: 30,
    borderWidth: 0,
    borderColor: pawGreen, // all pages will be one color so,,, just set it to that color
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 100,
    shadowRadius: 20,
    elevation: 24,
    zIndex: 99,
  },
  circle2: {
    position: 'absolute',
    width: 95,
    height: 95,
    borderRadius: 47.5,
    backgroundColor: '#FFFFFF',
    bottom: Platform.OS === 'ios' ? 16 : 8,
    borderWidth: 7,
    borderColor: pawGreen,
    elevation: 24,
    zIndex: 99,
  },
  pawPupPic: {
    position: 'absolute',
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 12,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginLeft: (((Dimensions.get('window').width) / 5) * 3.5) - 81,
    bottom: Platform.OS === 'ios' ? 102 : 85,
    borderWidth: 7,
    borderColor: pawGreen,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  pawPupPost: {
    position: 'absolute',
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginLeft: (((Dimensions.get('window').width) / 5) * 3.5) - 25, // 55 normally
    bottom: Platform.OS === 'ios' ? 127 : 110, // 0 normally
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 12,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 7,
    borderColor: pawGreen,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  pawPupPM: {
    position: 'absolute',
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginLeft: (((Dimensions.get('window').width) / 5) * 3.5) + 32,
    bottom: Platform.OS === 'ios' ? 102 : 85,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 12,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 7,
    borderColor: pawGreen,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalView1: {
    justifyContent: 'space-evenly',
    backgroundColor: '#FFFFF',
    alignSelf: 'center',
  },
  pawPupHealth: {
    position: 'absolute',
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 12,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginLeft: (((Dimensions.get('window').width) / 5) * 4.5) - 95,
    bottom: Platform.OS === 'ios' ? 92 : 75,
    borderWidth: 7,
    borderColor: pawGreen,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  pawPupAccount: {
    position: 'absolute',
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginLeft: (((Dimensions.get('window').width) / 5) * 4.5) - 55, // 55 normally
    bottom: Platform.OS === 'ios' ? 122 : 105, // 0 normally
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 12,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 7,
    borderColor: pawGreen,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  pawPupSettings: {
    position: 'absolute',
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginLeft: (((Dimensions.get('window').width) / 5) * 4.5) - 5,
    bottom: Platform.OS === 'ios' ? 123 : 106,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 12,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 7,
    borderColor: pawGreen,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  /* inspect pic styles */
  picsModal: {
    backgroundColor: pawGreen,
    width: Dimensions.get('window').width,
    marginLeft: 0,
    height: Dimensions.get('window').height,
    marginTop: 0,
    marginBottom: -20,
    justifyContent: 'flex-start',
    alignContent: 'center',
    paddingLeft: 10,
    zIndex: 1,
  },
  exitPicButton: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    overflow: 'hidden',
    zIndex: 45,
    padding: 9,
  },
  inspicImage: {
    height: (Dimensions.get('window').width),
    width: (Dimensions.get('window').width),
    top: 0,
    left: -10,
    justifyContent: 'center',
    borderRadius: 25,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    alignSelf: 'center',
    position: 'absolute',
  },

  inspicBottomBand: {
    height: (Dimensions.get('window').width) + 200,
    width: (Dimensions.get('window').width),
    top: -200,
    left: -10,
    justifyContent: 'center',
    borderRadius: 25,
    borderColor: pawPink,
    borderWidth: 3,
    alignSelf: 'center',
    position: 'absolute',
  },

  likeLoc2: {
    left: (Dimensions.get('window').width - 18) - 40,
    top: (Dimensions.get('window').width) + 5,
  },

  inspicContainer: {
    alignSelf: 'center',
    width: (Dimensions.get('window').width),
    height: (Dimensions.get('window').width),
    backgroundColor: 'white',
    borderRadius: 25,
    overflow: 'hidden',
    left: -10,
    top: 95,
    position: 'absolute',
    zIndex: -1,
  },

  insppProfileImage: {
    height: 60,
    width: 60,
    top: (Dimensions.get('window').width - 55),
    left: -10,
    borderRadius: 100,
    borderWidth: 3,
    position: 'absolute',
    borderColor: pawPink,
  },

  insppProfileNameNode: {
    height: 25,
    width: 160,
    top: (Dimensions.get('window').width - 25),
    left: 25.5,
    borderRadius: 100,
    borderWidth: 3,
    justifyContent: 'center',
    position: 'absolute',
    borderColor: pawPink,
    backgroundColor: 'white',
  },

  inspicHeader: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 1,
    marginLeft: 105,
    marginTop: 5,
    fontFamily: 'QuicksandBold',
    color: pawGrey,
  },

  inspicHeader2: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
    marginLeft: 20,
    fontFamily: 'QuicksandBold',
    color: pawGrey,
  },

  inspicDescription: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1,
    marginLeft: 20,
    fontFamily: 'QuicksandBold',
    color: pawGrey,
  },
  inspicTag: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
    marginLeft: 20,
    fontFamily: 'QuicksandBold',
    color: pawGrey,
  },
  /* inspect post styles */
  postModal: {
    backgroundColor: pawGreen,
    width: Dimensions.get('window').width,
    marginLeft: 0,
    height: Dimensions.get('window').height,
    marginTop: StatusBarHeight - 28,
    marginBottom: -20,
    justifyContent: 'flex-start',
    alignContent: 'center',
    paddingLeft: 10,
    zIndex: 1,
  },
  exitPostButton: {
    alignSelf: 'center',
    backgroundColor: pawGrey,
    borderRadius: 25,
    overflow: 'hidden',
    zIndex: 45,
    padding: 9,
  },

  inspostContainer: {
    alignSelf: 'center',
    width: (Dimensions.get('window').width),
    height: (Dimensions.get('window').width) + 125,
    backgroundColor: 'white',
    borderRadius: 25,
    overflow: 'hidden',
    left: -10,
    top: -30,
    position: 'absolute',
    zIndex: -1,
  },

  insppoProfileImage: {
    height: 60,
    width: 60,
    top: 8,
    left: ((Dimensions.get('window').width - 20) / 2) - (60 + 37.5),
    borderRadius: 100,
    borderWidth: 3,
    position: 'absolute',
    borderColor: pawPink,
  },

  insppoProfileNameNode: {
    height: 25,
    width: 160,
    top: 25,
    left: ((Dimensions.get('window').width - 20) / 2) - 60,
    borderRadius: 100,
    borderWidth: 3,
    justifyContent: 'center',
    position: 'absolute',
    borderColor: pawPink,
    backgroundColor: 'white',
  },

  inspostHeader: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 1,
    marginLeft: 105,
    marginTop: 5,
    fontFamily: 'QuicksandBold',
    color: pawGrey,
  },

  inspostHeader2: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
    marginLeft: 20,
    fontFamily: 'QuicksandBold',
    color: pawGrey,
  },

  inspostDescription: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1,
    marginLeft: 20,
    fontFamily: 'QuicksandBold',
    color: pawGrey,
  },
  likeLocPost: {
    left: (Dimensions.get('window').width - 18) - 30,
    top: 30,
    position: 'absolute',
  },
  commLocPost: {
    left: (Dimensions.get('window').width - 18) - 70,
    top: 30,
    position: 'absolute',
  },
  inspostTag: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
    marginLeft: 20,
    fontFamily: 'QuicksandBold',
    color: pawGrey,
  },
});
