import {Card} from 'native-base';
import React from 'react';
import {SafeAreaView, View, FlatList, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const DATA = [
  {
    year: '2021',
    month: 'January',
    amount: 'KD 1,210',
  },
  {
    year: '2021',
    month: 'January',
    amount: 'KD 1,210',
  },
  {
    year: '2021',
    month: 'January',
    amount: 'KD 1,210',
  },
  {
    year: '2021',
    month: 'January',
    amount: 'KD 1,210',
  },
  {
    year: '2021',
    month: 'January',
    amount: 'KD 1,210',
  },
  {
    year: '2021',
    month: 'January',
    amount: 'KD 1,210',
  },
];

const Item = ({year, month, amount, body1, navigation}) => (
  <Card
    style={{
      flexDirection: 'row',
      paddingBottom: 10,
      margin: 10,
      backgroundColor: '#fff',
    }}>
    <View style={{flexDirection: 'column', flex: 0.3, marginRight: 5}}>
      <Text style={{fontSize: 12, color: '#000'}}>{year}</Text>
    </View>
    <View style={{flexDirection: 'column', flex: 0.5, marginRight: 5}}>
      <Text style={{fontSize: 12, color: '#000'}}>{month}</Text>
    </View>
    <View style={{flexDirection: 'column', flex: 0.4, marginRight: 5}}>
      <Text style={{fontSize: 12, color: '#000'}}>{amount}</Text>
    </View>
  </Card>
);

const ProfileIncomeHistory = () => {
  const navigation = useNavigation();
  const renderItem = ({item}) => (
    <Item
      year={item.year}
      month={item.month}
      amount={item.amount}
      navigation={navigation}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          paddingBottom: 20,
          paddingTop: 10,
          marginLeft: 10,
        }}>
        <View style={{flexDirection: 'column', flex: 0.3, marginRight: 5}}>
          <Text style={{fontSize: 14, color: '#000', fontWeight: '500'}}>
            Year
          </Text>
        </View>
        <View style={{flexDirection: 'column', flex: 0.5, marginRight: 5}}>
          <Text style={{fontSize: 14, color: '#000', fontWeight: '500'}}>
            Month
          </Text>
        </View>
        <View style={{flexDirection: 'column', flex: 0.4, marginRight: 5}}>
          <Text style={{fontSize: 14, color: '#000', fontWeight: '500'}}>
            Amount
          </Text>
        </View>
      </View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
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
});

export default ProfileIncomeHistory;
