import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import RoundedButton from '../../components/RoundedButton';
import MetropolisSemiBoldText from '../../components/Text/MetropolisSemiBoldText';
import MetropolisMediumText from '../../components/Text/MetropolisMediumText';

import {BASE_API} from '../../services/API_URI';
import color from '../../components/color';
import {useTranslation} from 'react-i18next';
import RoutePaths from '../../util/RoutePaths';
import MyImage from '../../components/MyImage';

const RecentCourseItem = ({title, image, navigation}) => (
  <View
    style={{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: color.greyNew,
      marginBottom: 15,
    }}>
    <MyImage
      source={image}
      style={{
        height: 80,
        width: 80,
        resizeMode: 'cover',
        borderRadius: 15,
        backgroundColor: color.white,
      }}
    />
    <View style={{flex: 1, marginLeft: 10}}>
      <MetropolisMediumText style={{color: color.black}}>
        {title}
      </MetropolisMediumText>
    </View>
  </View>
);

const RecentCourses = ({data}) => {
  const navigation = useNavigation();
  const {t} = useTranslation();

  const renderItem = (item, index) => {
    return (
      <RecentCourseItem
        key={item?.id ?? index}
        title={item.name}
        image={{uri: BASE_API + item.course_image}}
        navigation={navigation}
      />
    );
  };

  return (
    <View>
      <MetropolisMediumText style={styles.titleText}>
        {t('common.myRecentCourses')}
      </MetropolisMediumText>
      {data?.length ? (
        <>
          {data?.map(renderItem)}
          <RoundedButton
            bordered={false}
            bgColor={color.blue}
            textColor={color.white}
            text={t('common.viewAll')}
            onPress={() => {
              navigation.navigate(RoutePaths.myCourses);
            }}
            style={styles.btn}
            textStyle={styles.btnText}
            isLoading={false}
            iconName={''}
            light={true}
          />
        </>
      ) : (
        <MetropolisSemiBoldText style={{alignSelf: 'center', marginBottom: 15}}>
          {t('common.noResultFound')}
        </MetropolisSemiBoldText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listStyle: {
    flex: 1,
  },
  listContainerStyle: {
    paddingHorizontal: 15,
    paddingTop: 15,
    borderRadius: 10,
    backgroundColor: color.greyNew,
    marginBottom: 15,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  btn: {
    marginTop: 5,
    height: 40,
    width: 80,
    alignSelf: 'flex-end',
    marginBottom: 15,
  },
  btnText: {
    fontSize: 10,
  },
  titleText: {
    color: color.blue,
    fontSize: 16,
    marginBottom: 24,
  },
});

export default RecentCourses;
