import React from 'react';
import {ScrollView, StyleSheet, SafeAreaView} from 'react-native';

import StudentComponent from '../../../components/FrontDashComponent/StudentComponent';
import SearchBarButton from '../../../components/SearchBarButton';
import BannerSlider from '../../../components/BannerSlider';

/**
 * Do not delete below import
 */
// import FreeCourseAd from '../../../components/FreeCourseAd';
import ExperienceComponent from '../../../components/FrontDashComponent/ExperienceComponent';
import BecomeInstructorComponent from '../../../components/FrontDashComponent/BecomeInstructorComponent';

import RoutePaths from '../../../util/RoutePaths';
import color from '../../../components/color';
import {useSelector} from 'react-redux';
import Categories from '../../../components/FrontDashComponent/Categories';

function FrontDashboard(props) {
  const userData = useSelector(state => state?.user?.userData);

  const onSearchHandler = () => {
    props.navigation.navigate(RoutePaths.search);
  };

  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <ScrollView contentContainerStyle={styles.container}>
        <SearchBarButton onPress={onSearchHandler} />
        <BannerSlider />
        <StudentComponent />
        <Categories />
        {!userData ? (
          <>
            {/* <FreeCourseAd /> */}
            <ExperienceComponent />
            <BecomeInstructorComponent />
          </>
        ) : (
          <ExperienceComponent />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flexGrow: 1,
    minHeight: '100%',
    backgroundColor: color.white,
    paddingHorizontal: 15,
  },
});

export default FrontDashboard;
