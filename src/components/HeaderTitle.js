import React from 'react';
import {StyleSheet} from 'react-native';

// Components
import MetropolisSemiBoldText from './Text/MetropolisSemiBoldText';

const HeaderTitle = props => {
  const {title} = props;
  return (
    <MetropolisSemiBoldText style={styles.titleText}>
      {title}
    </MetropolisSemiBoldText>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 18,
  },
});

export default HeaderTitle;
