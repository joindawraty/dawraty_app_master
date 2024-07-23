import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import color from '../color';
import MetropolisSemiBoldText from '../Text/MetropolisSemiBoldText';
import MetropolisRegularText from '../Text/MetropolisRegularText';
import {BASE_API} from '../../services/API_URI';

const InstructorChatHeaderComponent = data => {
  return (
    <View style={styles2.container}>
      <Image source={{uri: BASE_API + data.img_path}} style={styles2.img} />
      <View style={styles2.rightContainer}>
        <MetropolisSemiBoldText style={styles2.nameText}>
          {data.first_name + ' ' + data.last_name}
        </MetropolisSemiBoldText>
        <MetropolisRegularText style={styles2.positionText}>
          {'Biophysics Lecture course'}
        </MetropolisRegularText>
      </View>
    </View>
  );
};

export default InstructorChatHeaderComponent;

const styles2 = StyleSheet.create({
  nameText: {
    fontSize: 16,
  },
  positionText: {
    fontSize: 13,
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  img: {
    height: 60,
    width: 60,
    borderRadius: 40,
    marginRight: 15,
  },
  container: {
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: color.white,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
});
