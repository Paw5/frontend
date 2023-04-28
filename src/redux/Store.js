import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './SettingsSlice';
import locationReducer from './LocationSlice';
import calendarReducer from './CalendarSlice';
import locloadReducer from './LocationLoaderSlice';
import servicesReducer from './ServicesSlice';
import cardLoaderReducer from './CardLoaderSlice';

const store = configureStore({
  reducer: {
    locationLoader: locloadReducer,
    servicesLoader: servicesReducer,
    settings: settingsReducer,
    location: locationReducer,
    calendar: calendarReducer,
    cardLoader: cardLoaderReducer,
  },
});

export default store;
