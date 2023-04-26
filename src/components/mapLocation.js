import React from 'react';

import { Marker } from 'react-native-maps';

const mapPin = require('../../assets/map_pin_s.png');

export default function mapLocation({ pressAction, coords }) {
  return (
    <Marker
      coordinate={{
        latitude: coords.y,
        longitude: coords.x,
      }}
      image={mapPin}
      onPress={pressAction}
    />
  );
}
