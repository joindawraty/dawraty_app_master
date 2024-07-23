import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import MetropolisMediumText from './Text/MetropolisMediumText';
import MetropolisRegularText from './Text/MetropolisRegularText';
import RoundedButton from './RoundedButton';

import {normalize} from '../util/dimenstions';
import color from './color';
import {useTranslation} from 'react-i18next';

const TableRow = ({shadow, textColor, keys, size, data, alignment}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        ...(shadow
          ? {
              backgroundColor: color.white,
              shadowColor: color.black,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
              marginBottom: 10,
              padding: 10,
              borderRadius: 10,
            }
          : {
              paddingBottom: 10,
            }),
      }}>
      {keys.map((item, index) => (
        <TableRowItem
          key={`${index}`}
          textColor={textColor[0]}
          alignment={alignment[index]}
          text={data[keys[index]]}
          width={size[index]}
        />
      ))}
    </View>
  );
};

const TableRowItem = props => {
  const {
    text,
    asHeader,
    width,
    containerStyle,
    alignment = 'center',
    textColor = color.black,
  } = props;
  const TextComponent = asHeader ? MetropolisMediumText : MetropolisRegularText;
  return (
    <View
      style={{
        flex: 1 + (width - 100) / 100,
        paddingBottom: 3,
        ...containerStyle,
      }}>
      <TextComponent
        style={{
          textAlign: alignment,
          color: textColor,
          fontSize: 16,
        }}>
        {text}
      </TextComponent>
    </View>
  );
};

const TableComponent = props => {
  const {
    headings,
    data,
    shadow,
    showViewAll,
    size,
    keys,
    alignment,
    containerStyle,
    onPressViewAll,
  } = props;

  const navigation = useNavigation();

  const {t} = useTranslation();

  const renderItem = (item, index) => (
    <TableRow
      key={index}
      data={data[index]}
      keys={keys}
      navigation={navigation}
      shadow={shadow}
      textColor={[
        color.black,
        color.black,
        color.black,
        item?.body1 === 'Successful' ? color.green : color.red,
      ]}
      size={size}
      alignment={alignment}
    />
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <View
        style={{
          flexDirection: 'row',
          paddingBottom: 20,
        }}>
        {headings.map((item, index) => {
          return (
            <TableRowItem
              key={index}
              text={headings[index]}
              alignment={alignment[index]}
              asHeader
              width={size[index]}
            />
          );
        })}
      </View>
      {data.map(renderItem)}
      {showViewAll && (
        <RoundedButton
          bordered={false}
          bgColor={color.blue}
          textColor={color.white}
          text={t('common.viewAll')}
          onPress={() => {
            if (onPressViewAll) {
              onPressViewAll();
            }
          }}
          style={styles.btn}
          textStyle={styles.btnText}
          isLoading={false}
          iconName={''}
          light={true}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 15,
  },
  btn: {
    marginTop: 10,
    height: 40,
    width: 80,
    alignSelf: 'flex-end',
    // marginRight: 15,
    marginBottom: 5,
  },
  btnText: {fontSize: 10},
});

export default TableComponent;
