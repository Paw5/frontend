import {
  View, ScrollView, Platform,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../components/SearchBarServ';
import lstyles, { } from '../constants/Styles';
import dstyles from '../constants/DarkStyles';
import PawPostPost from '../components/PawPostPost';
import { setHasLoaded } from '../redux/PostLoaderSlice';
import Network from '../util/Network';

const _ = Network();

export default function PawPics() {
  const dispatch = useDispatch();
  const [postList, setPostList] = useState(() => []);
  const [styles, setStyles] = useState(lstyles);
  const isDarkMode = useSelector((state) => state.settings.darkMode);
  const hasLoaded = useSelector((state) => state.postLoader.hasLoaded);

  if (!hasLoaded) {
    _.get('posts').then((results) => {
      const post = results.data().results;
      setPostList(post);
      dispatch(setHasLoaded(true));
    });
  }

  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

  return (
    <View style={styles.background}>
      <View style={styles.statusBar} />
      <View style={styles.search}>
        <SearchBar />
      </View>
      <View style={styles.containerMap}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: Platform.OS === 'android' ? 170 : 190 }}
        >
          { /* eslint-disable-next-line react/jsx-indent */ }
          { postList.map((post) => <PawPostPost id={post.user_id} body={post.body} />) }
        </ScrollView>
      </View>
    </View>
  );
}
