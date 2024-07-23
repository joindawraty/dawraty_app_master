import React from 'react';
import {View, StyleSheet, ImageBackground, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import CourseDetailRowItem from '../../components/CourseDetailRowItem';
import MetropolisMediumText from '../Text/MetropolisMediumText';
import MetropolisRegularText from '../Text/MetropolisRegularText';
import SmallIconBtn from '../SmallIconBtn';

import color from '../color';
import RoutePaths from '../../util/RoutePaths';
import SmallRoundedBtn from '../SmallRoundedButton';

const Curriculum = props => {
  const {chapter, image, country_id, onCartPress} = props;

  const navigation = useNavigation();
  const {t} = useTranslation();

  const renderCurriculumItem = (item, index) => {
    return (
      <Pressable
        onPress={() => {
          if (item?.user_purchased_chapter) {
            navigation.navigate(RoutePaths.courseFullDetails, {
              courseId: item?.course_id,
            });
          }
        }}
        key={index}
        style={[
          styles.itemContainer,
          {
            backgroundColor: item?.user_purchased_chapter
              ? `${color.skyBlue}25`
              : color.greyNew,
          },
        ]}>
        <ImageBackground source={{uri: image}} style={styles.itemBackImage}>
          {item?.user_purchased_chapter ? (
            <View style={styles.imageInnerContainer}>
              <Icon name="caret-forward" size={16} color={color.black} />
            </View>
          ) : null}
        </ImageBackground>
        <View style={styles.itemLeftContainer}>
          <MetropolisRegularText style={styles.itemName}>
            {t('dynamic', {
              en: item.name,
              ar: item?.translation?.value
                ? item?.translation?.value
                : item.name,
            })}
          </MetropolisRegularText>
          {item?.video_duration ? (
            <CourseDetailRowItem
              iconName="time-outline"
              iconColor={color.skyBlue}
              text={t('course.course_duration', {
                hours: item?.video_duration?.hours,
                minutes: item?.video_duration?.minutes,
              })}
              style={styles.itemDuration}
            />
          ) : item?.audio_duration ? (
            <CourseDetailRowItem
              iconName="time-outline"
              iconColor={color.skyBlue}
              text={t('course.course_duration', {
                hours: item?.audio_duration?.hours,
                minutes: item?.audio_duration?.minutes,
              })}
              style={styles.itemDuration}
            />
          ) : null}
        </View>
        {!item?.user_purchased_chapter ? (
          <SmallRoundedBtn
            text={
              item.price !== undefined && item.price !== 0
                ? country_id === 112
                  ? t('course.buy_chapter', {price: item.price})
                  : t('course.buy_chapter_in_bd', {price: item.price})
                : t('common.free')
            }
            onPress={() => {
              onCartPress(item, 'chapter');
            }}
            containerStyle={{
              backgroundColor: color.blue,
              borderWidth: 1,
              borderColor: color.blue,
              alignSelf: 'center',
              marginLeft: 10,
            }}
            textStyle={{
              fontSize: 14,
            }}
          />
        ) : null}
      </Pressable>
    );
  };

  return (
    <>
      <MetropolisMediumText style={styles.titleText}>
        {t('common.curriculum')}
      </MetropolisMediumText>
      {chapter.map(renderCurriculumItem)}
    </>
  );
};

const styles = StyleSheet.create({
  imageInnerContainer: {
    alignSelf: 'center',
    padding: 3,
    backgroundColor: color.white,
    borderRadius: 30,
    paddingLeft: 4,
  },
  itemBackImage: {
    borderRadius: 10,
    overflow: 'hidden',
    height: 50,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemDuration: {
    marginBottom: 0,
    marginTop: 5,
  },
  itemName: {
    fontSize: 14,
    lineHeight: 17,
  },
  itemLeftContainer: {
    marginLeft: 8,
    flex: 1,
    paddingVertical: 4,
    justifyContent: 'space-between',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
  },
  titleText: {
    color: color.black,
    fontSize: 15,
    marginVertical: 15,
  },
});

export default Curriculum;
