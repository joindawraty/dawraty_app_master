import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, View, FlatList, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import color from '../../components/color';
import MetropolisSemiBoldText from '../../components/Text/MetropolisSemiBoldText';
import MetropolisMediumText from '../../components/Text/MetropolisMediumText';
import {getInstructorSales} from '../../services/profile_api';
import ListFooterComponent from '../../components/ListFooterComponent';
import moment from 'moment';

const Item = ({title, description, body}) => (
  <View style={{flexDirection: 'row', paddingBottom: 10}}>
    <View style={{flexDirection: 'column', flex: 0.3, marginRight: 5}}>
      <MetropolisMediumText style={{fontSize: 11, color: '#000'}}>
        {title}
      </MetropolisMediumText>
    </View>
    <View style={{flexDirection: 'column', flex: 0.3, marginRight: 5}}>
      <MetropolisMediumText style={{fontSize: 11, color: '#000'}}>
        {description}
      </MetropolisMediumText>
    </View>
    <View style={{flexDirection: 'column', flex: 0.4, marginRight: 5}}>
      <MetropolisMediumText style={{fontSize: 11, color: '#000'}}>
        {body}
      </MetropolisMediumText>
    </View>
  </View>
);

const ProfileRecentOrder = () => {
  const navigation = useNavigation();
  const [instructorSales, setInstructorSales] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isRefreshing, setRefreshing] = useState(false);

  const pageNo = useRef(1);
  const isEndReached = useRef(false);

  const getData = async () => {
    try {
      const response = await getInstructorSales(pageNo.current);
      if (response && response.data && response.data.success) {
        const resData = response.data.data;
        if (pageNo.current === 1) {
          setInstructorSales(resData.data);
        } else {
          setInstructorSales(prevData => [...prevData, ...resData.data]);
        }
        isEndReached.current = resData.data?.length < resData?.per_page;
      }
      setRefreshing(false);
      setLoading(false);
    } catch (err) {
      console.log(
        '[getData] Error : ',
        err?.response?.data?.message ?? err?.message,
      );
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
    getData();
  };

  const onEndReached = () => {
    if (isEndReached.current || isLoading) {
      return;
    }
    setLoading(true);
    pageNo.current += 1;
    getData();
  };

  const renderItem = ({item}) => {
    return (
      <Item
        title={moment(item.created_at).format('DD MMM YYYY')}
        description={'KD ' + item.amount}
        body={item.course_details.name}
      />
    );
  };

  const renderFooter = () => {
    if (isLoading && !isRefreshing) {
      return <ListFooterComponent />;
    }
    return null;
  };

  const renderEmptyComponent = () => {
    if (!isLoading && !isRefreshing && !instructorSales?.length) {
      return (
        <View
          style={{
            marginTop: 30,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <MetropolisSemiBoldText style={styles.noDataText}>
            {'No data found'}
          </MetropolisSemiBoldText>
        </View>
      );
    }
  };
  const renderHeaderComponent = () => {
    return (
      <View
        style={{
          backgroundColor: color.white,
          flexDirection: 'row',
          paddingBottom: 20,
          paddingTop: 10,
        }}>
        <View style={{flexDirection: 'column', flex: 0.3, marginRight: 5}}>
          <MetropolisMediumText style={{fontSize: 14, color: '#000'}}>
            Date
          </MetropolisMediumText>
        </View>
        <View style={{flexDirection: 'column', flex: 0.3, marginRight: 5}}>
          <MetropolisMediumText style={{fontSize: 14, color: '#000'}}>
            Amount
          </MetropolisMediumText>
        </View>
        <View style={{flexDirection: 'column', flex: 0.4, marginRight: 5}}>
          <MetropolisMediumText style={{fontSize: 14, color: '#000'}}>
            Course
          </MetropolisMediumText>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={instructorSales}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        ListEmptyComponent={renderEmptyComponent}
        ListHeaderComponent={renderHeaderComponent}
        stickyHeaderIndices={[0]}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: color.white,
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
  addPhoto: {
    width: 200,
    height: 400,
    resizeMode: 'contain',
  },
  recentTxt: {
    fontSize: 16,
    color: color.blue,
    borderBottomWidth: 1,
    borderBottomColor: color.blue,
    paddingBottom: 10,
  },
});

export default ProfileRecentOrder;
