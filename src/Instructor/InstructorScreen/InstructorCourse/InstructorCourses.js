import React, {useEffect, useState} from 'react';
import {View, FlatList, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import MetropolisSemiBoldText from '../../../components/Text/MetropolisSemiBoldText';
import MetropolisRegularText from '../../../components/Text/MetropolisRegularText';
import SearchBar from '../../../components/FrontDashComponent/SearchBar';
import SmallRoundedBtn from '../../../components/SmallRoundedButton';

import color from '../../../components/color';
import RoutePaths from '../../../util/RoutePaths';
import {getInstructorCourses} from '../../../services/instructor_api';
import {BASE_API} from '../../../services/API_URI';
import MyImage from '../../../components/MyImage';

const InstructorCourseItem = ({title, image, status, onEditPress, onPress}) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    style={{
      flex: 1,
      flexDirection: 'row',
      padding: 15,
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
      marginBottom: 15,
    }}>
    <MyImage
      source={image}
      style={{
        height: 65,
        width: 65,
        resizeMode: 'cover',
        borderRadius: 5,
        backgroundColor: color.white,
      }}
    />
    <View
      style={{
        flex: 1,
        marginLeft: 15,
        justifyContent: 'space-between',
      }}>
      <MetropolisSemiBoldText style={{fontSize: 15}}>
        {title}
      </MetropolisSemiBoldText>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <MetropolisRegularText style={{color: 'green'}}>
          {status}
        </MetropolisRegularText>
        {/* <TouchableOpacity
          onPress={onEditPress}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <MetropolisRegularText style={{color: color.skyBlue}}>
            {'Edit Course '}
          </MetropolisRegularText>
          <Icon name="pencil-outline" size={15} color={color.skyBlue} />
        </TouchableOpacity> */}
      </View>
    </View>
  </TouchableOpacity>
);

const CoursesHeaderRow = props => {
  const {title, btnText, onPress, style} = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...style,
      }}>
      <MetropolisSemiBoldText
        style={{
          fontSize: 16,
          color: color.blue,
        }}>
        {title}
      </MetropolisSemiBoldText>
      {btnText && (
        <SmallRoundedBtn
          text={btnText}
          onPress={onPress}
          containerStyle={{backgroundColor: color.blue}}
          textStyle={{
            color: color.white,
            paddingVertical: 2,
            fontSize: 10,
            marginHorizontal: 15,
          }}
        />
      )}
    </View>
  );
};

const InstructorCourse = props => {
  const navigation = useNavigation();
  const {t} = useTranslation();

  const [courses, setCourses] = useState([]);

  const getInstructorOrders = async () => {
    const response = await getInstructorCourses();
    console.log(response);
    if (response && response.data && response.data.success) {
      setCourses(response.data.data);
    }
  };

  useEffect(() => {
    getInstructorOrders();
  }, []);

  const onEditPressHandler = (details = '') => {
    if (details) {
      navigation.navigate(RoutePaths.createCourse, details);
    } else {
      navigation.navigate(RoutePaths.createCourse);
    }
  };

  const renderItem = ({item}) => (
    <InstructorCourseItem
      title={item.name}
      status={item.status}
      image={{uri: BASE_API + item.image}}
      onEditPress={onEditPressHandler.bind(null, item)}
      onPress={() => {
        navigation.navigate(RoutePaths.courseFullDetails, {
          courseId: item.id,
        });
      }}
    />
  );

  return (
    <View style={{flex: 1, backgroundColor: color.white}}>
      <SearchBar />
      <FlatList
        data={courses}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        ListHeaderComponent={() => {
          return (
            <CoursesHeaderRow
              title={t('common.allCourses')}
              // btnText={'Create new course +'}
              onPress={onEditPressHandler}
              style={{
                marginTop: 15,
                marginBottom: 15,
              }}
            />
          );
        }}
      />
    </View>
  );
};

export default InstructorCourse;
