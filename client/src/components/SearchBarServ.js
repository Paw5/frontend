import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  TextInput, View, Text, Pressable, KeyboardAvoidingView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import lstyles, { pawGrey, grey2yellow, PlaceholderText } from '../constants/Styles';
import dstyles, {
// pink2green, white2lgrey, pawGrey,
} from '../constants/DarkStyles';

export default function SearchBar(searchQuery) {
  const [styles, setStyles] = useState(lstyles);
  const isDarkMode = useSelector((state) => state.settings.darkMode);

  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

  const [isModalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent
        visible={isModalVisible}
        onBackdropPress={() => {
          setModalVisible(!isModalVisible);
        }}
        onRequestClose={() => {
          setModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.filterText}>Filters Will be Here</Text>
          <Pressable
            style={[styles.filtersClose]}
            onPress={() => setModalVisible(!isModalVisible)}
          >
            <Feather
              name="x"
              size={30}
              color={pawGrey}
            />
          </Pressable>
        </View>
      </Modal>
      <KeyboardAvoidingView
        behavior="height"
        style={styles.searchBar}
      >
        <Feather
          name="search"
          size={20}
          color={grey2yellow}
          style={{ marginLeft: 10, alignSelf: 'center' }}
        />
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor={PlaceholderText}
          value={searchQuery}
        />
      </KeyboardAvoidingView>

      <Pressable style={styles.filters} onPress={() => setModalVisible(true)}>
        <Feather
          name="filter"
          size={20}
          color={grey2yellow}
          style={{ justifyContent: 'center', alignSelf: 'center' }}
        />
      </Pressable>
    </View>

  );
}
