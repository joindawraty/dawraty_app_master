import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import FrontCourseComponent from '../../components/FrontDashComponent/FrontCourseComponent';
import CourseList from '../../components/FrontDashComponent/CouseList';
import SearchBar from '../../components/FrontDashComponent/SearchBar';
import {StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import color from '../../components/color';
import MetropolisSemiBoldText from '../../components/Text/MetropolisSemiBoldText';

const FrontDashboardCourse = props => {
  const category = props?.route?.params?.category;
  const isCategory = props?.route?.params?.isCategory;

  const {t} = useTranslation();

  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(category ?? null);

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder={t('common.search')}
        // value={''}
        // onChangeText={() => {}}
        blurOnSubmit={true}
        onSubmitEditing={text => {
          setSearchText(text.trim());
        }}
      />
      {isCategory ? (
        <MetropolisSemiBoldText
          style={{
            fontSize: 17,
            color: color.blue,
            marginHorizontal: 15,
            marginVertical: 10,
          }}>
          {category.name}
        </MetropolisSemiBoldText>
      ) : (
        <CourseList
          selectedCategory={selectedCategory}
          onPress={category => {
            setSelectedCategory(category);
          }}
        />
      )}
      <FrontCourseComponent
        category={selectedCategory}
        searchText={searchText}
        isCategory={isCategory}
      />
      <SafeAreaView />
    </View>
  );
};

export default FrontDashboardCourse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
