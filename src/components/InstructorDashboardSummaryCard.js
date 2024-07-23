import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// ** Components
import MetropolisMediumText from './Text/MetropolisMediumText';
import MetropolisRegularText from './Text/MetropolisRegularText';
import MetropolisSemiBoldText from './Text/MetropolisSemiBoldText';

// ** MISC
import color from './color';

const InstructorDashboardSummaryCard = props => {
  const {title, amount, percentage, iconName, onSeeAll} = props;
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <MetropolisMediumText style={styles.titleText}>
          {title}
        </MetropolisMediumText>
        <MetropolisMediumText onPress={onSeeAll} style={styles.seeAllText}>
          {'See all'}
        </MetropolisMediumText>
      </View>
      <View style={styles.bottomContainer}>
        <View>
          <MetropolisSemiBoldText style={styles.amtText}>
            {amount}
          </MetropolisSemiBoldText>

          <MetropolisRegularText style={styles.percText}>
            {percentage}
          </MetropolisRegularText>
        </View>
        <Icon name={iconName} size={36} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: color.greyNew,
    marginRight: 15,
  },
  topContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {fontSize: 14, color: color.black},
  seeAllText: {
    fontSize: 12,
    color: color.skyBlue,
    textDecorationLine: 'underline',
    textDecorationColor: color.blue,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  amtText: {
    fontSize: 16,
    color: color.black,
    marginTop: 20,
  },
  percText: {
    fontSize: 14,
    color: color.green,
    marginTop: 10,
  },
});

export default InstructorDashboardSummaryCard;
