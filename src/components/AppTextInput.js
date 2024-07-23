import React, {forwardRef} from 'react';
import {StyleSheet, TextInput} from 'react-native';

import color from './color';
import {fonts} from '../constants';
import MetropolisRegularText from './Text/MetropolisRegularText';
import {useTranslation} from 'react-i18next';

const AppTextInput = forwardRef((props, ref) => {
  const {i18n} = useTranslation();
  return (
    <>
      <TextInput
        ref={ref}
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTextColor={color.darkGrey}
        returnKeyType={props.returnKeyType ? props.returnKeyType : 'next'}
        {...props}
        style={[
          styles.inputFontSize,
          styles.input,
          {
            fontFamily: fonts.MetropolisMedium,
          },
          props?.style,
          {
            borderColor:
              props?.hideErrorMsg &&
              props?.error &&
              typeof props?.error === 'string'
                ? color.red
                : props?.style?.borderColor ?? color.blue,
            textAlign: i18n.language === 'ar' ? 'right' : 'left',
          },
        ]}
        onSubmitEditing={props.onSubmitEditing}
      />
      {props?.error &&
      typeof props?.error === 'string' &&
      !props?.hideErrorMsg ? (
        <MetropolisRegularText style={styles.errorTxt}>
          {props?.error}
        </MetropolisRegularText>
      ) : null}
    </>
  );
});

const styles = StyleSheet.create({
  inputFontSize: {
    fontSize: 14,
  },
  input: {
    color: color.darkGrey,
    height: 55,
    marginTop: 10,
    fontSize: 15,
    paddingStart: 10,
    paddingEnd: 10,
    borderRadius: 10,
    fontFamily: fonts.MetropolisRegular,
    width: '90%',
  },
  errorTxt: {
    color: 'red',
    marginTop: 8,
  },
});

export default AppTextInput;
