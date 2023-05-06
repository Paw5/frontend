import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './SettingsSlice';
import locationReducer from './LocationSlice';
import calendarReducer from './CalendarSlice';
import locloadReducer from './LocationLoaderSlice';
import servicesReducer from './ServicesSlice';
import postReducer from './PostLoaderSlice';
import cardLoaderReducer from './CardLoaderSlice';

const store = configureStore({
  reducer: {
    locationLoader: locloadReducer,
    servicesLoader: servicesReducer,
    postLoader: postReducer,
    settings: settingsReducer,
    location: locationReducer,
    calendar: calendarReducer,
    cardLoader: cardLoaderReducer,
  },
});

export default store;
