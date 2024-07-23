import {Progress} from 'native-base';
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import MetropolisSemiBoldText from './Text/MetropolisSemiBoldText';
import MetropolisRegularText from './Text/MetropolisRegularText';
import MetropolisLightText from './Text/MetropolisLightText';
import MyImage from './MyImage';

import color from './color';
import RoutePaths from '../util/RoutePaths';

const StudentCourseItem = ({
  title,
  image,
  name,
  id,
  percentage,
  translation,
}) => {
  const navigation = useNavigation();
  const {t} = useTranslation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(RoutePaths.courseFullDetails, {
          courseId: id,
        });
      }}
      style={{
        flexDirection: 'row',
        marginBottom: 15,
        borderRadius: 10,
        backgroundColor: color.white,
        shadowColor: color.black,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 10,
      }}>
      <MyImage
        source={image}
        style={{
          height: 110,
          width: 110,
          borderRadius: 10,
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 10,
        }}>
        <View
          style={{
            backgroundColor: `${color.white}`,
            height: 40,
            width: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
          }}>
          <Icon name="caret-forward" size={25} color={color.black} />
        </View>
      </MyImage>
      <View style={{flex: 1}}>
        <MetropolisSemiBoldText numberOfLines={2} style={{fontSize: 14}}>
          {title}
        </MetropolisSemiBoldText>
        <View
          style={{
            marginTop: 20,
            flex: 1,
            justifyContent: 'space-between',
          }}>
          <MetropolisRegularText style={{fontSize: 12}}>
            {name}
          </MetropolisRegularText>
          <>
            <Progress
              colorScheme="green"
              value={percentage}
              borderRadius={0}
              style={{height: 4, marginVertical: 10}}
            />
            <MetropolisLightText style={{fontSize: 10}}>
              {t('common.completed', {
                percentage: Math.round(percentage),
              })}
            </MetropolisLightText>
          </>
          {/* {percentage ? (
            <>
              <Progress
                colorScheme="green"
                value={100}
                borderRadius={0}
                style={{height: 4, marginVertical: 10}}
              />
              <MetropolisLightText style={{fontSize: 10}}>
                {'100% completed'}
              </MetropolisLightText>
            </>
          ) : (
            <TouchableOpacity>
              <MetropolisMediumText
                style={{fontSize: 14, color: color.skyBlue}}>
                {'START COURSE'}
              </MetropolisMediumText>
            </TouchableOpacity>
          )} */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default StudentCourseItem;
