import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  TextInput, View, Text, Pressable, KeyboardAvoidingView, TouchableHighlight,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';
import lstyles, { pawGrey, pawGreen } from '../constants/Styles';
import dstyles, { pawYellow } from '../constants/DarkStyles';
import TagList from '../constants/tagList.json';
import SortList from '../constants/sortOptionsForum.json';
import UploadDate from '../constants/uploadDate.json';

export default function SearchBar(searchQuery) {
// each filter option will have its own API to get that specific data
// e.g. SELECT * FROM Services WHERE Rating >= 4
//      -or-                   WHERE Type = 'Restaurant'
  const [styles, setStyles] = useState(lstyles);
  const isDarkMode = useSelector((state) => state.settings.darkMode);
  const PickerItem = Picker.Item;
  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState('Type');
  const [selectedSort, setSelectedSort] = useState('Rating');
  const [tagList] = useState(TagList.tags);
  const [rateList] = useState(SortList.sortOptions);
  const [uploadDate] = useState(UploadDate.uploadDate);

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
        <View style={[styles.modalView, { padding: 25, justifyContent: 'flex-start', alignContent: 'flex-start' }]}>
          <Text style={styles.filterText}>Filters</Text>
          <View style={{ flexDirection: 'row', flex: 1, alignContent: 'center' }}>
            <TouchableHighlight style={{
              borderColor: pawGreen, borderRadius: 50, borderWidth: 2, width: 150, height: 40, justifyContent: 'center', margin: 5,
            }}
            >
              <Picker
                style={styles.signintext}
                itemStyle={styles.signintext}
                selectedValue={selectedType}
                onValueChange={(index) => setSelectedType(index)}
              >
                {tagList.map((value) => (
                  <PickerItem label={value} value={value} key={value} />
                ))}
              </Picker>

            </TouchableHighlight>
            <TouchableHighlight style={{
              borderColor: pawGreen, borderRadius: 50, borderWidth: 2, width: 150, height: 40, justifyContent: 'center', margin: 5,
            }}
            >
              <Picker
                style={styles.signintext}
                itemStyle={styles.signintext}
                selectedValue={selectedSort}
                onValueChange={(index) => setSelectedSort(index)}
              >
                {rateList.map((value) => (
                  <PickerItem label={value} value={value} key={value} />
                ))}
              </Picker>

            </TouchableHighlight>
          </View>
          <TouchableHighlight style={{
            borderColor: pawGreen, borderRadius: 50, borderWidth: 2, width: 250, height: 40, justifyContent: 'center', margin: 5, alignSelf: 'center',
          }}
          >
            <Picker
              style={styles.signintext}
              itemStyle={styles.signintext}
              selectedValue={selectedType}
              onValueChange={(index) => setSelectedType(index)}
            >
              {uploadDate.map((value) => (
                <PickerItem label={value} value={value} key={value} />
              ))}
            </Picker>

          </TouchableHighlight>
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
          color={isDarkMode === 'light' ? pawYellow : pawGrey}
          style={{ marginLeft: 10, alignSelf: 'center' }}
        />
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor={isDarkMode === 'light' ? '#edae4985' : '#33333385'}
          value={searchQuery}
        />
      </KeyboardAvoidingView>

      <Pressable style={styles.filters} onPress={() => setModalVisible(true)}>
        <Feather
          name="filter"
          size={20}
          color={isDarkMode === 'light' ? pawYellow : pawGrey}
          style={{ justifyContent: 'center', alignSelf: 'center' }}
        />
      </Pressable>
    </View>

  );
}
