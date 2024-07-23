import React from 'react';
import {View, StyleSheet} from 'react-native';

import MetropolisMediumText from '../../components/Text/MetropolisMediumText';
import RoundedButton from '../../components/RoundedButton';
import TableComponent from '../../components/TableComponent';

import color from '../../components/color';

const DATA = [
  {
    date: '31/3/2021',
    amount: 'KD 2,000',
    name: 'Azaan Shaikh',
    email: 'Azaanshaik@gmail.com',
  },
  {
    date: '01/3/2021',
    amount: 'KD 800',
    name: 'Haider Ali     ',
    email: 'Haiderali@gmail.com',
  },
  {
    date: '28/02/2021',
    amount: 'KD 4,000',
    name: 'Nadeem Shah',
    email: 'Nadeemshah@gmail.com',
  },
];

const RecentOrder = () => {
  return (
    <View style={styles.container}>
      <MetropolisMediumText
        style={{
          fontSize: 16,
          color: color.black,
          paddingTop: 15,
          paddingBottom: 20,
          paddingLeft: 15,
        }}>
        {'Recent Order'}
      </MetropolisMediumText>
      <View style={{height: 2, backgroundColor: color.white}} />
      <TableComponent
        headings={['Date', 'Amount', 'Name', 'Email']}
        size={[20, 20, 24, 36]}
        keys={['date', 'amount', 'name', 'email']}
        alignment={['left', 'left', 'left', 'left']}
        data={DATA}
        containerStyle={{
          paddingHorizontal: 15,
          marginTop: 15,
          marginBottom: 0,
        }}
      />
      <RoundedButton
        bordered={false}
        bgColor={color.blue}
        textColor={color.white}
        text={'View All'}
        onPress={() => {}}
        style={styles.btn}
        textStyle={styles.btnText}
        isLoading={false}
        iconName={''}
        light={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    borderRadius: 10,
    backgroundColor: color.greyNew,
    paddingVertical: 15,
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
    marginTop: 10,
    height: 40,
    width: 80,
    alignSelf: 'flex-end',
    marginRight: 15,
    marginBottom: 5,
  },
  btnText: {fontSize: 10},
});

export default RecentOrder;
