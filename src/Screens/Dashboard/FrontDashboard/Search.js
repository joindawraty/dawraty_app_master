import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, Image, Text, Pressable} from 'react-native';
// import {connect} from 'react-redux';
// import TopSearchComponent from '../../../components/FrontDashComponent/SearchComponent/TopSearchComponent';
// import BrowseCategories from '../../../components/FrontDashComponent/SearchComponent/BrowseCategories';
import SearchBar from '../../../components/FrontDashComponent/SearchBar';

import color from '../../../components/color';
import {getSearchCourses} from '../../../services/course';
import {BASE_API} from '../../../services/API_URI';
import {useLoading} from '../../../context/Loading/LoadingContext';
import MetropolisSemiBoldText from '../../../components/Text/MetropolisSemiBoldText';
import {useTranslation} from 'react-i18next';
import RoutePaths from '../../../util/RoutePaths';
import MyImage from '../../../components/MyImage';

function Search(props) {
  const [searchData, setSearchData] = useState([]);
  const [isSearched, setSearched] = useState(false);
  const {setIsLoading, isLoading} = useLoading();

  const {t} = useTranslation();

  // const [courses, setCourses] = useState([
  //   {
  //     title: 'Biophysics',
  //   },
  //   {
  //     title: 'physics',
  //   },
  //   {
  //     title: 'Thermodynamics',
  //   },
  //   {
  //     title: 'Chemistry',
  //   },
  //   {
  //     title: 'Maths',
  //   },
  // ]);
  // const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch({
  //     type: GET_COURSES_START,
  //   });
  //   dispatch({
  //     type: GET_CATEGORIES_START,
  //   });
  // }, []);

  // useEffect(() => {
  //   if (props.courses) {
  //     setCourses(props.courses.data);
  //   }
  //   if (props.categories) {
  //     setCategories(props.categories);
  //   }
  // }, [props]);

  const onSearch = async () => {
    try {
      setIsLoading(true);
      const response = await getSearchCourses(search);
      setIsLoading(false);
      if (response && response.data && response.data.success) {
        if (search == '') {
          setSearchData(response.data.data.data);
        } else {
          setSearchData(response.data.data);
        }
      } else {
        setSearchData([]);
      }
      setSearched(true);
    } catch (err) {
      console.log('Error : ', err?.response?.data?.message ?? err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    onSearch();
  }, []);

  const onSearchItemPress = course => {
    props.navigation.navigate(RoutePaths.courseDetails, {
      course,
    });
  };

  const renderItem = ({item, index}) => {
    return (
      <Pressable
        onPress={onSearchItemPress.bind(null, item)}
        style={{
          borderRadius: 5,
          elevation: 5,
          backgroundColor: '#fff',
          flexDirection: 'row',
          marginBottom: 15,
          flex: 1,
          padding: 10,
        }}>
        <MyImage
          resizeMode="cover"
          source={{uri: BASE_API + item.course_image}}
          style={styles.addPhoto}
        />
        <View
          style={{
            padding: 10,
            justifyContent: 'center',
            flex: 1,
          }}>
          <Text
            style={{
              color: '#000',
              fontSize: 15,
              fontWeight: '700',
            }}>
            {item.name}
          </Text>
          <Text
            style={{
              color: '#000',
              fontSize: 12,
              marginTop: 5,
            }}>
            {item?.instructor?.first_name + ' ' + item?.instructor?.last_name}
          </Text>
        </View>
      </Pressable>
    );
  };

  const renderEmptyComponent = () => {
    if (!isLoading && !search?.length) {
      return (
        <View
          style={{
            marginTop: 30,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <MetropolisSemiBoldText style={styles.noDataText}>
            {t('common.noResultFound')}
          </MetropolisSemiBoldText>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder={t('common.search')}
        onChangeText={text => {
          var newText = text.trim();
          setSearch(newText);
        }}
        blurOnSubmit={true}
        onSubmitEditing={() => {
          onSearch();
        }}
      />
      <FlatList
        data={searchData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={renderEmptyComponent}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      />

      {/* <TopSearchComponent courses={courses} />
      <BrowseCategories categories={categories} /> */}
    </View>
  );
}
// const mapStateToProps = state => ({
//   error: state.LoginReducer.error,
//   courses: state.UserReducer.courses,
//   categories: state.UserReducer.categories,
//   loading: state.LoaderReducer.loader,
// });

// const mapDispatchToProps = () => ({});

const styles = StyleSheet.create({
  addPhoto: {
    width: 70,
    height: 70,
    borderRadius: 50,
    resizeMode: 'contain',
    backgroundColor: color.white,
  },
  noDataText: {
    fontSize: 18,
  },
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
});

export default Search;
