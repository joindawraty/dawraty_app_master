import {Box} from 'native-base';
import React from 'react';
import {SafeAreaView, View, FlatList, StyleSheet, Text} from 'react-native';

const DATA = [
  {
    date: '27/3/2021',
    cname:
      'Biophysics chapter 13: Introduction to MR contest and pulse sequence',
    amount: 'KD 10.000',
    transaction: 'Successful',
  },
  {
    date: '27/3/2021',
    cname:
      'Biophysics chapter 13: Introduction to MR contest and pulse sequence',
    amount: 'KD 10.000',
    transaction: 'Successful',
  },
  {
    date: '27/3/2021',
    cname:
      'Biophysics chapter 13: Introduction to MR contest and pulse sequence',
    amount: 'KD 10.000',
    transaction: 'Successful',
  },
];

const Item = ({date, cname, amount, transaction}) => (
  <Box
    style={{
      margin: 10,
      borderRadius: 10,
      elevation: 5,
      padding: 10,
      backgroundColor: '#fff',
    }}>
    <View style={{flexDirection: 'row', margin: 5}}>
      <View style={{flexDirection: 'column', flex: 0.3}}>
        <Text style={{fontSize: 12}}>{date}</Text>
      </View>
      <View style={{flexDirection: 'column', flex: 0.3}}>
        <Text style={{fontSize: 12}}>{cname}</Text>
      </View>
      <View
        style={{flexDirection: 'column', flex: 0.3, alignItems: 'flex-end'}}>
        <Text style={{fontSize: 12}}>{amount}</Text>
      </View>
      <View
        style={{flexDirection: 'column', flex: 0.3, alignItems: 'flex-end'}}>
        <Text style={{fontSize: 12, color: 'green'}}>{transaction}</Text>
      </View>
    </View>
  </Box>
);

const PaymentHistory = () => {
  const renderItem = ({item}) => (
    <Item
      date={item.date}
      cname={item.cname}
      amount={item.amount}
      transaction={item.transaction}
    />
  );

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', margin: 5}}>
        <View
          style={{
            flexDirection: 'column',
            flex: 0.3,
            alignItems: 'flex-start',
            marginLeft: 10,
          }}>
          <Text style={{fontSize: 14, color: 'black', fontWeight: '500'}}>
            Date
          </Text>
        </View>
        <View style={{flexDirection: 'column', flex: 0.3}}>
          <Text style={{fontSize: 14, color: 'black', fontWeight: '500'}}>
            Course Name
          </Text>
        </View>
        <View
          style={{flexDirection: 'column', flex: 0.3, alignItems: 'center'}}>
          <Text style={{fontSize: 14, color: 'black', fontWeight: '500'}}>
            Amount
          </Text>
        </View>
        <View
          style={{flexDirection: 'column', flex: 0.3, alignItems: 'center'}}>
          <Text style={{fontSize: 14, color: 'black', fontWeight: '500'}}>
            Transaction
          </Text>
          <Text style={{fontSize: 14, color: 'black', fontWeight: '500'}}>
            Status
          </Text>
        </View>
      </View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default PaymentHistory;
