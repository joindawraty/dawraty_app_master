import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';

import MetropolisSemiBoldText from './Text/MetropolisSemiBoldText';
import MetropolisMediumText from './Text/MetropolisMediumText';
import MetropolisLightText from './Text/MetropolisLightText';

import color from './color';

const ExperienceItem = ({title, image, description, name, role}) => (
  <View style={styles.container}>
    <MetropolisSemiBoldText style={styles.titleText}>
      {title}
    </MetropolisSemiBoldText>
    <MetropolisMediumText style={styles.descText}>
      {description}
    </MetropolisMediumText>
    <View style={styles.bottomContainer}>
      <Image source={image} style={styles.addPhoto} />
      <View>
        <MetropolisSemiBoldText style={styles.studNameTxt}>
          {name}
        </MetropolisSemiBoldText>
        <MetropolisLightText style={styles.studCountryTxt}>
          {role}
        </MetropolisLightText>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: widthPercentageToDP('50%'),
    padding: 10,
    paddingTop: 15,
    marginRight: 15,
    marginBottom: 5,
    marginLeft: 5,
    borderRadius: 20,
    elevation: 5,
    backgroundColor: '#f4f4f4',
    shadowColor: color.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  titleText: {
    fontSize: 12,
    color: color.blue,
  },
  descText: {
    fontSize: 10,
    marginVertical: 10,
  },
  addPhoto: {
    width: 32,
    height: 32,
    borderRadius: 16,
    resizeMode: 'cover',
    marginRight: 5,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  studNameTxt: {
    marginBottom: 5,
    fontSize: 12,
  },
  studCountryTxt: {
    fontSize: 10,
  },
});

export default ExperienceItem;
