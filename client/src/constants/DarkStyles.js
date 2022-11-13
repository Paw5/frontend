/* eslint-disable global-require */
import {
  StyleSheet, Dimensions, Platform,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const TABBAR_WIDTH = Dimensions.get('window').width;
const TAB_WIDTH = TABBAR_WIDTH / 5;

const StatusBarHeight = getStatusBarHeight();

export const pawYellow = '#edae49';
export const pawGreen = '#69a297';
export const pawGrey = '#333333';
export const pawLightGrey = '#545454';

export const pink2green = pawGreen;
export const white2lgrey = pawLightGrey;
export const pink2lgrey = pawLightGrey;
export const pink2yellow = pawYellow;
export const grey2yellow = pawYellow;
export const white2yellow = pawYellow;
export const white2green = pawGreen;
export const PlaceholderText = '#edae4985';
export const mapColor = 'dark';

export default StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: pawGrey,
  },
  statusBar: {
    height: StatusBarHeight,
    backgroundColor: pawGreen,
  },

  /* register/signin styles */
  signinbutton: {
    backgroundColor: pawLightGrey,
    borderRadius: 50,
    padding: 20,
    marginBottom: 40,
    marginLeft: 40,
    marginRight: 40,
  },
  signintext: {
    color: pawYellow,
    fontFamily: 'QuicksandBold',
    fontSize: 26,
    textAlign: 'center',
  },
  signinModal: {
    backgroundColor: pawGrey,
    flex: 1,
    margin: 0,
    marginTop: Platform.OS === 'android' ? 0 : StatusBarHeight,
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
  signinExitButton: {
    alignSelf: 'center',
    padding: 10,
    backgroundColor: pawYellow,
    borderRadius: 25,
    overflow: 'hidden',
    paddingRight: 11,
    paddingLeft: 9,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: Dimensions.get('window').width / 3,
  },
  signinPrompt: {
    alignSelf: 'center',
    width: Dimensions.get('window').width - 60,
    backgroundColor: pawLightGrey,
    borderRadius: 30,
    marginBottom: 40,
    padding: 15,
  },
  signinPromptText: {
    color: pawYellow,
    fontFamily: 'QuicksandBold',
    fontSize: 26,
    textAlign: 'center',
  },
  signinField: {
    backgroundColor: pawLightGrey,
    alignSelf: 'center',
    width: Dimensions.get('window').width - 40,
    padding: 10,
    fontFamily: 'QuicksandBold',
    borderRadius: 35,
    fontSize: 26,
    justifyContent: 'center',
    marginBottom: 20,
  },

  /* health styles */
  petCard: {
    height: 200,
    width: 160,
    backgroundColor: pawLightGrey,
    color: pawGrey,
    paddingTop: 0,
    paddingBottom: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 0,
    marginBottom: 10,
    borderRadius: 25,
  },
  transparentBG: {
    width: Dimensions.get('window').width - 20,
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 20,
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
    color: pawYellow,
  },
  petImage: {
    height: 135,
    width: 135,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: pawGreen,
  },
  scrollIndicator: {
    marginBottom: 20,
    borderWidth: 2,
    borderColor: pawGreen,
    borderRadius: 10,
    padding: 5,
    width: 115,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  healthContainer: {
    alignSelf: 'center',
    width: (Dimensions.get('window').width - 20),
    backgroundColor: pawLightGrey,
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 20,
    height: 200,
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
    color: pawYellow,
  },
  healthDivider: {
    borderBottomColor: pawGreen,
    borderBottomWidth: 3,
    borderRadius: 50,
    marginLeft: 10,
    marginRight: 10,
  },

  /* account styles */
  profileBorder: {
    backgroundColor: pawYellow,
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
    backgroundColor: pawLightGrey,
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
  usernameField: {
    marginBottom: 50,
    justifyContent: 'center',
    backgroundColor: pawGreen,
  },
  menuText: {
    fontSize: 24,
    width: (Dimensions.get('window').width - 120),
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontFamily: 'QuicksandBold',
    color: pawYellow,
    flexBasis: 'auto',
  },
  usernameFont: {
    width: 'auto',
    fontSize: 32,
    color: pawGrey,
  },
  profileIcon: {
    height: 150,
    width: 150,
    alignSelf: 'center',
    padding: 20,
    backgroundColor: pawYellow,
    borderWidth: 5,
    borderColor: pawYellow,
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
    backgroundColor: pawGreen,
    borderRadius: 25,
    overflow: 'hidden',
    paddingRight: 11,
    paddingLeft: 9,
    marginLeft: 20,
  },
  accountModal: {
    backgroundColor: pawGrey,
    width: Dimensions.get('window').width,
    margin: 0,
    marginTop: Platform.OS === 'android' ? 0 : StatusBarHeight,
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  accountImage: {
    height: 135,
    width: 135,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: pawGreen,
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
    color: pawYellow,
    flexBasis: 'auto',
    paddingLeft: 5,
  },
  accountCard: {
    height: 200,
    width: 160,
    backgroundColor: pawLightGrey,
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
  accountFields: {
    fontSize: 18,
    width: 'auto',
    color: pawGreen,
  },
  cameraIcon: {
    alignSelf: 'flex-end',
    backgroundColor: pawYellow,
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
    backgroundColor: pawGreen,
    borderRadius: 70,
    overflow: 'hidden',
    marginBottom: 60,
    marginTop: 20,
  },
  settingsItem: {
    alignSelf: 'center',
    width: (Dimensions.get('window').width - 20),
    backgroundColor: pawLightGrey,
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
    color: pawYellow,
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
    backgroundColor: pawGrey,
    width: Dimensions.get('window').width,
    marginLeft: 0,
    height: Dimensions.get('window').height,
    marginTop: Platform.OS === 'android' ? 0 : StatusBarHeight,
    marginBottom: -20,
    justifyContent: 'flex-start',
    alignContent: 'center',
    paddingLeft: 10,
    paddingTop: 20,
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
    borderColor: pawGreen,
  },
  servLeft: {
    height: 160,
    width: 90,
    borderRightWidth: 3,
    position: 'absolute',
    justifyContent: 'center',
    alignContent: 'center',
    borderColor: pawGreen,
  },
  servCheck: {
    height: 25,
    width: 90,
    top: 100,
    position: 'absolute',
    borderRightWidth: 3,
    borderTopWidth: 3,
    backgroundColor: pawLightGrey,
    borderColor: pawGreen,
  },
  servContainer: {
    alignSelf: 'center',
    width: (Dimensions.get('window').width - 20),
    backgroundColor: pawLightGrey,
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
    color: pawYellow,
  },
  servHeader2: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
    marginLeft: 105,
    fontFamily: 'QuicksandBold',
    color: pawYellow,
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
    backgroundColor: pawLightGrey,
    borderRadius: 80,
    overflow: 'hidden',
    height: 80,
    width: TABBAR_WIDTH - 20,
    alignSelf: 'center',
    borderWidth: 4,
    borderColor: pawGreen,
    flexDirection: 'row',
    alignContent: 'center',
    marginBottom: 20,
  },
  pmUserImage: {
    height: 80,
    width: 80,
    marginLeft: -4,
    marginTop: -4,
    borderRadius: 100,
    overflow: 'hidden',
    borderWidth: 5,
    borderColor: pawGreen,
  },
  pmPreview: {
    paddingTop: 6,
    paddingLeft: 10,
    flex: 2.5,
  },
  pmUserPreview: {
    fontFamily: 'QuicksandSemiBold',
    fontSize: 22,
    color: pawYellow,
  },
  pmUserMessagePreview: {
    paddingTop: 2,
    fontFamily: 'QuicksandLight',
    fontSize: 18,
    color: pawYellow,
  },
  pmMessageIcons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    marginRight: 15,
    paddingTop: 1,
  },
  PMModal: {
    backgroundColor: pawGrey,
    flex: 1,
    margin: 0,
    justifyContent: 'flex-start',
    marginTop: Platform.OS === 'android' ? 0 : StatusBarHeight,
    paddingBottom: 40,
  },
  pmExitButton: {
    width: 50,
    marginLeft: 20,
    marginTop: 25,
    backgroundColor: pawLightGrey,
    borderRadius: 25,
    overflow: 'hidden',
    paddingRight: 11,
    paddingLeft: 8,
    paddingTop: 11,
    paddingBottom: 9,
  },
  messageTitle: {
    alignSelf: 'center',
    flex: 4,
    backgroundColor: pawLightGrey,
    borderRadius: 100,
    overflow: 'hidden',
    marginRight: 20,
    marginTop: 15,
    marginBottom: 15,
    paddingLeft: 25,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: pawGreen,
    borderWidth: 3,
  },
  userTitle: {
    fontFamily: 'QuicksandBold',
    fontSize: 24,
    color: pawYellow,
    flex: 3,
    alignSelf: 'center',
  },
  messageProfileIcon: {
    height: 60,
    width: 60,
    borderRadius: 30,
    overflow: 'hidden',
    marginLeft: 20,
    borderWidth: 3,
    borderColor: pawGreen,
    margin: 5,
  },
  messageRecieve: {
    backgroundColor: pawLightGrey,
    borderRadius: 50,
    borderBottomLeftRadius: 0,
    overflow: 'hidden',
    padding: 25,
    height: 'auto',
    width: TABBAR_WIDTH / 1.5,
    marginLeft: 20,
    marginTop: 20,
  },
  messageSent: {
    alignSelf: 'flex-end',
    backgroundColor: pawLightGrey,
    borderRadius: 50,
    borderBottomRightRadius: 0,
    overflow: 'hidden',
    padding: 25,
    width: TABBAR_WIDTH / 1.5,
    marginRight: 20,
    marginTop: 20,
  },
  messageContents: {
    fontFamily: 'QuicksandMedium',
    color: pawYellow,
    fontSize: 16,
  },
  replyBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: pawLightGrey,
    borderRadius: 50,
    overflow: 'hidden',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    padding: 10,
    height: 'auto',
  },
  replyContents: {
    fontFamily: 'QuicksandMedium',
    color: pawYellow,
    fontSize: 18,
    marginLeft: 10,
    alignSelf: 'center',
    flex: 3,
    paddingRight: 20,
    padding: 10,
  },
  sendButton: {
    backgroundColor: pawYellow,
    padding: 10,
    paddingLeft: 8,
    paddingBottom: 8,
    borderRadius: 22,
    overflow: 'hidden',
  },

  /* PawPost styles */
  postContainer: {
    alignSelf: 'center',
    width: (Dimensions.get('window').width - 20),
    backgroundColor: pawLightGrey,
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
    borderColor: pawGreen,
  },
  postTopBand: {
    height: 100,
    width: 200,
    borderRadius: 25,
    borderColor: pawGreen,
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
    borderColor: pawGreen,
    backgroundColor: pawLightGrey,
  },
  postHeader: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 1,
    marginLeft: 105,
    marginTop: 5,
    fontFamily: 'QuicksandBold',
    color: pawYellow,
  },
  postHeader2: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
    marginLeft: 20,
    fontFamily: 'QuicksandBold',
    color: pawYellow,
  },
  postDescription: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1,
    marginLeft: 20,
    fontFamily: 'QuicksandBold',
    color: pawYellow,
  },
  postTag: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
    marginLeft: 20,
    fontFamily: 'QuicksandBold',
    color: pawYellow,
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
    borderColor: pawGreen,
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
    backgroundColor: pawLightGrey,
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
    borderColor: pawGreen,
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
    borderColor: pawGreen,
    backgroundColor: pawLightGrey,
  },
  picHeader: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 1,
    marginLeft: 105,
    marginTop: 5,
    fontFamily: 'QuicksandBold',
    color: pawYellow,
  },
  picHeader2: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
    marginLeft: 20,
    fontFamily: 'QuicksandBold',
    color: pawYellow,
  },
  picDescription: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1,
    marginLeft: 20,
    fontFamily: 'QuicksandBold',
    color: pawYellow,
  },
  picTag: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
    marginLeft: 20,
    fontFamily: 'QuicksandBold',
    color: pawYellow,
  },

  /* news/events styles */
  eventTab: {
    alignSelf: 'center',
    height: 'auto',
    width: Dimensions.get('window').width - 30,
    backgroundColor: pawLightGrey,
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
    color: pawYellow,
  },
  eventDate: {
    fontFamily: 'QuicksandSemiBold',
    fontSize: 20,
    paddingTop: 5,
    color: pawYellow,
  },
  eventText: {
    fontFamily: 'QuicksandRegular',
    fontSize: 20,
    paddingLeft: 5,
    paddingRight: 30,
    textAlign: 'justify',
    color: pawYellow,
  },
  newsTab: {
    alignSelf: 'center',
    marginTop: 10,
    height: 'auto',
    width: Dimensions.get('window').width - 30,
    backgroundColor: pawLightGrey,
    borderRadius: 50,
    overflow: 'hidden',
    padding: 35,
    paddingBottom: 30,
    paddingTop: 25,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 20,
  },
  newsHeader: {
    fontFamily: 'QuicksandBold',
    fontSize: 26,
    textAlign: 'center',
    color: pawYellow,
  },

  /* map styles */
  containerMap: {
    backgroundColor: pawGrey,
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
    justifyContent: 'center',
    backgroundColor: pawLightGrey,
    borderRadius: 150,
    elevation: 24,
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: '90%',
    color: pawYellow,
  },
  filters: {
    position: 'absolute',
    marginLeft: 50,
    height: 45,
    width: 45,
    flex: 1,
    backgroundColor: pawLightGrey,
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
    backgroundColor: pawYellow,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: pawGrey,
    borderRadius: 22.5,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 0,
    right: 0,
    elevation: 20,
  },
  filterText: {
    fontFamily: 'QuicksandSemiBold',
    color: pawYellow,
    fontSize: 16,
  },
  modalView: {
    position: 'absolute',
    top: Platform.OS === 'android' ? -6 : StatusBarHeight - 6,
    alignSelf: 'center',
    width: Dimensions.get('window').width - 35,
    padding: 45,
    backgroundColor: pawLightGrey,
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
    backgroundColor: pawLightGrey,
    flexDirection: 'row',
    position: 'absolute',
    width: Dimensions.get('window').width + 6,
    height: Platform.OS === 'ios' ? 80 : 73,
    borderRadius: 5,
    zIndex: 100,
    borderColor: 'rgba(158, 150, 150, .25)',
    bottom: -5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  circleAnimated: {
    width: TAB_WIDTH,
    ...StyleSheet.absoluteFillObject,
    backgroundColor: pawLightGrey,
    alignItems: 'center',
  },
  circle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: pawLightGrey,
    bottom: 30,
    borderWidth: 0,
    borderColor: pawGreen, // all pages will be one color so,,, just set it to that color
    zIndex: 99,
  },
  circle2: {
    position: 'absolute',
    width: 95,
    height: 95,
    borderRadius: 47.5,
    backgroundColor: pawLightGrey,
    bottom: Platform.OS === 'ios' ? 16 : 8,
    borderWidth: 7,
    borderColor: pawGrey,
    zIndex: 99,
  },
  pawPupPic: {
    position: 'absolute',
    flex: 1,
    backgroundColor: pawLightGrey,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 12,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginLeft: (((Dimensions.get('window').width) / 5) * 3.5) - 98,
    bottom: Platform.OS === 'ios' ? 75 : 67,
    borderWidth: 7,
    borderColor: pawGrey,
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
    backgroundColor: pawLightGrey,
    marginLeft: (((Dimensions.get('window').width) / 5) * 3.5) - 41.5, // 55 normally
    bottom: Platform.OS === 'ios' ? 100 : 90, // 0 normally
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 12,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 7,
    borderColor: pawGrey,
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
    backgroundColor: pawLightGrey,
    marginLeft: (((Dimensions.get('window').width) / 5) * 3.5) + 15,
    bottom: Platform.OS === 'ios' ? 73 : 68,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 12,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 7,
    borderColor: pawGrey,
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
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  pawPupHealth: {
    position: 'absolute',
    flex: 1,
    backgroundColor: pawLightGrey,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 12,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginLeft: (((Dimensions.get('window').width) / 5) * 4.5) - 110,
    bottom: Platform.OS === 'ios' ? 62 : 54,
    borderWidth: 7,
    borderColor: pawGrey,
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
    backgroundColor: pawLightGrey,
    marginLeft: (((Dimensions.get('window').width) / 5) * 4.5) - 75,
    bottom: Platform.OS === 'ios' ? 95 : 90,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 12,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 7,
    borderColor: pawGrey,
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
    backgroundColor: pawLightGrey,
    marginLeft: (((Dimensions.get('window').width) / 5) * 4.5) - 25,
    bottom: Platform.OS === 'ios' ? 90 : 85,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 12,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 7,
    borderColor: pawGrey,
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
    backgroundColor: pawGrey,
    width: Dimensions.get('window').width,
    marginLeft: 0,
    height: Dimensions.get('window').height,
    marginTop: Platform.OS === 'android' ? 0 : StatusBarHeight,
    marginBottom: -20,
    justifyContent: 'flex-start',
    alignContent: 'center',
    paddingLeft: 10,
  },
  exitPicButton: {
    backgroundColor: pawGrey,
    borderRadius: 25,
    overflow: 'hidden',
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
    borderColor: pawGreen,
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
    backgroundColor: pawLightGrey,
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
    borderColor: pawGreen,
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
    borderColor: pawGreen,
    backgroundColor: pawLightGrey,
  },
  inspicHeader: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 1,
    marginLeft: 105,
    marginTop: 5,
    fontFamily: 'QuicksandBold',
    color: pawYellow,
  },
  inspicHeader2: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
    marginLeft: 20,
    fontFamily: 'QuicksandBold',
    color: pawYellow,
  },
  inspicDescription: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1,
    marginLeft: 20,
    fontFamily: 'QuicksandBold',
    color: pawYellow,
  },
  inspicTag: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
    marginLeft: 20,
    fontFamily: 'QuicksandBold',
    color: pawYellow,
  },

  /* inspect post styles */
  postModal: {
    backgroundColor: pawGrey,
    margin: 0,
    marginTop: Platform.OS === 'android' ? 0 : StatusBarHeight,
    justifyContent: 'flex-start',
    alignContent: 'center',
    paddingLeft: 10,
  },
  exitPostButton: {
    alignSelf: 'center',
    backgroundColor: pawGrey,
    borderRadius: 25,
    overflow: 'hidden',
    padding: 9,
  },
  inspostContainer: {
    alignSelf: 'center',
    width: (Dimensions.get('window').width),
    height: (Dimensions.get('window').height) / 1.75,
    backgroundColor: pawLightGrey,
    marginLeft: -10,
    borderRadius: 25,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingBottom: 20,
    overflow: 'hidden',
  },
  insppoProfileImage: {
    height: 60,
    width: 60,
    top: 15,
    left: ((Dimensions.get('window').width - 20) / 2) - (60 + 37.5),
    borderRadius: 100,
    borderWidth: 3,
    position: 'absolute',
    borderColor: pawGreen,
  },
  insppoProfileNameNode: {
    height: 25,
    width: 160,
    top: 32,
    left: ((Dimensions.get('window').width - 20) / 2) - 60,
    borderRadius: 100,
    borderWidth: 3,
    justifyContent: 'center',
    position: 'absolute',
    borderColor: pawGreen,
    backgroundColor: pawLightGrey,
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
    color: pawYellow,
  },
  inspostDescription: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1,
    marginLeft: 20,
    fontFamily: 'QuicksandBold',
    color: pawYellow,
    paddingLeft: 0,
    paddingRight: 10,
  },
  likeLocPost: {
    left: (Dimensions.get('window').width - 18) - 30,
    top: 31,
    position: 'absolute',
  },
  commLocPost: {
    left: (Dimensions.get('window').width - 18) - 70,
    top: 31,
    position: 'absolute',
  },
  inspostTag: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
    marginLeft: 20,
    fontFamily: 'QuicksandBold',
    color: pawYellow,
  },
  inspostComment: {
    backgroundColor: pawLightGrey,
    width: (Dimensions.get('window').height - 550),
    height: 25,
    borderRadius: 100,
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 10,
  },
  inspostCommentText: {
    color: pawYellow,
    fontFamily: 'QuicksandSemiBold',
    fontSize: 14,
  },
  onboardModal: {
    backgroundColor: pawGreen,
    width: Dimensions.get('window').width,
    marginLeft: 0,
    height: Dimensions.get('window').height,
    marginTop: Platform.OS === 'android' ? 0 : StatusBarHeight,
    marginBottom: -20,
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
});
