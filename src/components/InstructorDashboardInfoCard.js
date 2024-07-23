import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// ** components
import MetropolisMediumText from './Text/MetropolisMediumText';

// ** MISC
import color from './color';

const InstructorDashboardInfoCard = props => {
  const {iconName, text, count} = props;
  return (
    <View style={styles.container}>
      <MetropolisMediumText style={styles.title}>{text}</MetropolisMediumText>
      <Icon name={iconName} size={44} />
      <MetropolisMediumText style={styles.count}>{count}</MetropolisMediumText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 148,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: color.greyNew,
    marginRight: 15,
    padding: 15,
    borderRadius: 10,
  },
  title: {
    fontSize: 14,
    color: color.black,
    textAlign: 'center',
  },
  count: {
    fontSize: 14,
    color: color.black,
  },
});

export default InstructorDashboardInfoCard;
