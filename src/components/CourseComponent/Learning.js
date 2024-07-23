import React from 'react';
import {StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';

import CourseDetailRowItem from '../../components/CourseDetailRowItem';
import MetropolisMediumText from '../Text/MetropolisMediumText';

import color from '../color';

const Learning = props => {
  const {t} = useTranslation();
  const renderLearningItem = (item, index) => (
    <CourseDetailRowItem
      key={item.id}
      iconColor={color.green}
      iconName={'checkmark-circle-outline'}
      text={t('dynamic', {
        en: item?.objective,
        ar: item?.translation?.value
          ? item?.translation?.value
          : item?.objective,
      })}
      style={{alignItems: undefined}}
    />
  );

  return (
    <>
      <MetropolisMediumText style={styles.title}>
        {t('common.learningObjectives')}
      </MetropolisMediumText>
      {props.objectives.map(renderLearningItem)}
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#000',
    fontSize: 15,
    marginVertical: 15,
  },
});

export default Learning;
