import React from 'react';

import { Marker } from 'react-native-maps';

const mapPin = require('../../assets/map_pin_s.png');

export default function mapLocation({ pressAction }) {
  return (
    <Marker
      coordinate={{
        latitude: 33.213215,
        longitude: -97.1521454,
      }}
      image={mapPin}
      onPress={pressAction}
    />
  );
}
