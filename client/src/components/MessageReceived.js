import {
  Text, View,
} from 'react-native';
import React from 'react';
import styles from '../constants/Styles';

export default function MessageRecieved() {
  return (

    <View style={styles.messageRecieve}>
      <Text style={styles.messageContents}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </Text>
    </View>
  );
}
