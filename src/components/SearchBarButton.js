import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import MetropolisMediumText from './Text/MetropolisMediumText';
import color from './color';

const SearchBarButton = props => {
  const {onPress, placeholder, style} = props;
  const navigation = useNavigation();

  const {t} = useTranslation();

  const onPressHandler = () => {
    navigation.navigate('search');
  };

  return (
    <Pressable
      onPress={onPress ?? onPressHandler}
      style={[styles.container, style]}>
      <MetropolisMediumText style={styles.text}>
        {placeholder ?? t('common.search')}
      </MetropolisMediumText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    height: 40,
    backgroundColor: color.greyNew,
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderRadius: 10,
  },
  text: {
    color: `${color.black}60`,
    textAlign: 'left',
  },
});

export default SearchBarButton;
