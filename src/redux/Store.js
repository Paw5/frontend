import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './SettingsSlice';
import locationReducer from './LocationSlice';
import calendarReducer from './CalendarSlice';
import cardLoaderReducer from './CardLoaderSlice';

const store = configureStore({
  reducer: {
    settings: settingsReducer,
    location: locationReducer,
    calendar: calendarReducer,
    cardLoader: cardLoaderReducer,
  },
});

export default store;
