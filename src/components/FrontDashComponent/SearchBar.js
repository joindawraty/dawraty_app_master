import React, {useCallback, useState} from 'react';
import {
  Image,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import AppTextInput from '../AppTextInput';

import {normalize} from '../../util/dimenstions';
import color from '../color';
import {images} from '../../constants';

const SearchBar = props => {
  const {placeholder, onChangeText, onSubmitEditing} = props;
  const [search, setSearch] = useState('');

  const onChangeTextHandler = useCallback(
    text => {
      setSearch(text);
      onChangeText?.(text);
    },
    [onChangeText],
  );

  return (
    <View style={styles.mainContainer}>
      <AppTextInput
        style={[styles.inputStyle, props.style]}
        placeholder={placeholder}
        value={search}
        onChangeText={onChangeTextHandler}
        placeholderTextColor={'#CACACA'}
        returnKeyType="search"
        onSubmitEditing={() => {
          if (onSubmitEditing) {
            Keyboard.dismiss();
            onSubmitEditing(search);
          }
        }}
      />
      <TouchableOpacity
        onPress={() => {
          if (onSubmitEditing) {
            Keyboard.dismiss();
            onSubmitEditing(search);
          }
        }}
        style={styles.searchContainer}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={images.slider.ic_search}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingLeft: 10,
    marginBottom: 15,
    marginHorizontal: 15,
    justifyContent: 'center',
  },
  image: {
    height: 16,
    width: 16,
  },
  searchContainer: {
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  inputStyle: {
    height: 45,
    fontSize: normalize(15),
    borderRadius: 10,
    backgroundColor: color.greyNew,
    paddingLeft: 20,
    paddingRight: 45,
  },
});

export default SearchBar;
