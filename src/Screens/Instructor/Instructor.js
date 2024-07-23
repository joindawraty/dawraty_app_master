import React, {useEffect, useRef, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import MetropolisSemiBoldText from '../../components/Text/MetropolisSemiBoldText';
import StudentOrInstructorItem from '../../components/StudentOrInstructorItem';
import ListFooterComponent from '../../components/ListFooterComponent';

import color from '../../components/color';
import RoutePaths from '../../util/RoutePaths';
import {
  getInstructorStudents,
  getStudentInstructors,
} from '../../services/instructor_api';
import {BASE_API} from '../../services/API_URI';
import {appConstants} from '../../constants';
import {useTranslation} from 'react-i18next';
import {useOrientation} from '../../util/useOrientation';

const InstructorsOrStudents = () => {
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);
  const [isRefreshing, setRefreshing] = useState(false);
  const [instructorData, setInstructorData] = useState([]);
  const {userData} = useSelector(state => state.user);
  const orientation = useOrientation();

  const {t} = useTranslation();

  const pageNo = useRef(1);
  const isEndReached = useRef(false);

  const getInstructors = async () => {
    try {
      let res = null;
      if (userData?.user?.type === appConstants.Instructor) {
        res = await getInstructorStudents(pageNo.current);
      } else {
        res = await getStudentInstructors(pageNo.current);
      }
      if (res && res.data && res.data.data) {
        const resData = res.data.data;
        if (pageNo.current === 1) {
          setInstructorData(resData.data);
        } else {
          setInstructorData(prevCourses => [...prevCourses, ...resData.data]);
        }
        isEndReached.current = resData.data?.length < resData?.per_page;
      }
      setRefreshing(false);
      setLoading(false);
    } catch (error) {
      setRefreshing(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    pageNo.current = 1;
    isEndReached.current = true;
    getInstructors();
  };

  const onEndReached = () => {
    if (isEndReached.current || isLoading) {
      return;
    }
    setLoading(true);
    pageNo.current += 1;
    getInstructors();
  };

  const onStartChat = item => {
    navigation.navigate(RoutePaths.InstructorChat, {
      data: item,
    });
  };

  const renderItem = ({item}) => (
    <StudentOrInstructorItem
      title={item.first_name + ' ' + item.last_name}
      image={{uri: BASE_API + item.img_path}}
      // desc={'Biophysics Instructor'}
      onPress={() => onStartChat(item)}
    />
  );

  const renderFooter = () => {
    if (isLoading && !isRefreshing) {
      return <ListFooterComponent />;
    }
    return null;
  };

  const renderEmptyComponent = () => {
    if (!isLoading && !isRefreshing && !instructorData?.length) {
      return (
        <View style={styles.noDataContainer}>
          <MetropolisSemiBoldText style={styles.noDataText}>
            {t('common.noResultFound')}
          </MetropolisSemiBoldText>
        </View>
      );
    }
  };
  return (
    <FlatList
      key={orientation}
      data={instructorData}
      renderItem={renderItem}
      numColumns={orientation === 'PORTRAIT' ? 4 : 4}
      keyExtractor={(item, index) => index.toString()} // Ensure key is a string
      contentContainerStyle={[
        styles.listContentContainerStyle,
        !isLoading &&
          !isRefreshing &&
          !instructorData?.length &&
          styles.listContentContainerStyle2,
      ]}
      columnWrapperStyle={{justifyContent: 'center'}} // Center items
      onRefresh={onRefresh}
      refreshing={isRefreshing}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.1}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmptyComponent}
    />
  );
};

const styles = StyleSheet.create({
  listContentContainerStyle: {
    flexGrow: 1,
    paddingLeft: 15,
    paddingTop: 15,
    backgroundColor: color.white,
  },
  listContentContainerStyle2: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataText: {},
});

export default InstructorsOrStudents;
