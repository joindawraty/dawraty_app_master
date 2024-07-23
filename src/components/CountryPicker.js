import React, {useCallback, useState} from 'react';
import {StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import MetropolisRegularText from './Text/MetropolisRegularText';

import color from './color';
import {useTranslation} from 'react-i18next';

const CountryPicker = props => {
  const {t} = useTranslation();
  const {style, onChangeText, value: valueFromProp} = props;

  const [open, setOpen] = useState(false);
  const countries = [
    {
      label: t('countries.Bahrain'),
      value: 17,
      short_code: 'bh',
    },
    {
      label: t('countries.Kuwait'),
      value: 112,
      short_code: 'kw',
    },
    {
      label: t('countries.Oman'),
      value: 159,
      short_code: 'om',
    },
    {
      label: t('countries.Qatar'),
      value: 172,
      short_code: 'qa',
    },
    {
      label: t('countries.Saudi Arabia'),
      value: 188,
      short_code: 'sa',
    },
  ];
  const [value, setValue] = useState(valueFromProp ?? countries[1].value);

  const onChangeHandler = useCallback(
    getValue => {
      const newVal = getValue?.();
      onChangeText?.(newVal);
      setValue(newVal);
    },
    [onChangeText],
  );

  return (
    <>
      <DropDownPicker
        items={countries}
        arrowSize={10}
        placeholder={t('common.selectYourCountry')}
        placeholderTextColor={color.greyNew}
        textStyle={styles.text}
        open={open}
        setOpen={setOpen}
        value={value}
        setValue={onChangeHandler}
        dropDownContainerStyle={styles.dropDownContainerStyle}
        listMode="SCROLLVIEW"
        // rtl={true}
        {...props}
        style={{
          ...styles.picker,
          ...style,
          borderColor:
            !!props?.hideErrorMsg &&
            props?.error &&
            typeof props?.error === 'string'
              ? color.red
              : style?.borderColor ?? color.blue,
        }}
      />
      {props?.error &&
      typeof props?.error === 'string' &&
      !!!props?.hideErrorMsg ? (
        <MetropolisRegularText style={{color: 'red', marginTop: 8}}>
          {props?.error}
        </MetropolisRegularText>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  picker: {
    minHeight: 45,
    marginTop: 10,
    backgroundColor: `${color.black}10`,
    borderColor: color.blue,
    borderWidth: 3,
  },
  text: {
    color: `${color.black}80`,
    flexGrow: 1,
    textAlign: 'left',
  },
  dropDownContainerStyle: {
    marginTop: 10,
  },
});

export default CountryPicker;
