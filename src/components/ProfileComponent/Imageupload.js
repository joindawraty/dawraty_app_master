import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';

import MetropolisMediumText from '../Text/MetropolisMediumText';
import MyImage from '../MyImage';

import useSelectImage from '../../hooks/useSelectImage';

import {BASE_API} from '../../services/API_URI';
import color from '../color';

const ImageUpload = props => {
  const {t} = useTranslation();
  const {pickImage} = useSelectImage();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          pickImage().then(response => {
            if (response.data) {
              props.onChangeText(
                'data:' + response.mime + ';base64,' + response.data,
              );
            }
          });
        }}
        style={styles.cardContainer}>
        {!props?.value ? (
          <>
            <MetropolisMediumText style={styles.uploadImgText}>
              {t('common.addProfilePhoto')}
            </MetropolisMediumText>
            <Icon name="add-outline" color={color.blue} size={18} />
          </>
        ) : (
          <MyImage
            source={{
              uri: props.value.includes('base64')
                ? props.value
                : BASE_API + props.value,
            }}
            resizeMode="contain"
            style={styles.profileImage}
          />
        )}
      </Pressable>
      <MetropolisMediumText
        style={[
          styles.profilePicText,
          {
            color: props?.error ? color.red : color.blue,
          },
        ]}>
        {t('common.profilePicture')}
      </MetropolisMediumText>
    </View>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    // position: 'absolute',
    // top: 0,
    // right: 0,
    // bottom: 0,
    // left: 0,
    height: 110,
    width: 140,
  },
  container: {
    marginTop: 15,
    marginLeft: 20,
    height: 140,
    width: 140,
  },
  cardContainer: {
    height: 110,
    // flex: 1,
    backgroundColor: color.white,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: color.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

    padding: 10,
  },
  uploadImgText: {
    fontSize: 14,
    color: color.blue,
    textAlign: 'center',
  },
  profilePicText: {
    fontSize: 14,
    color: color.black,
    textAlign: 'center',
    marginTop: 15,
  },
});

export default ImageUpload;
