import React, {useContext} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import RenderHTML from 'react-native-render-html';

import MetropolisMediumText from '../../components/Text/MetropolisMediumText';

import {fonts} from '../../constants';
import color from '../../components/color';
import Learning from '../../components/CourseComponent/Learning';
import {CourseDetailsContext} from '../Dashboard/Dashboard/CourseFullDetails';
import {useTranslation} from 'react-i18next';
import {getTranslationFromMany} from '../../util/misc';
// import {CourseDetailsContext} from '../Dashboard/Dashboard/CourseFullDetails';

const AboutCourse = props => {
  const {width} = useWindowDimensions();
  const {t} = useTranslation();

  const {
    courseDetails,
    currentLesson,
    setCurrentLesson,
    view,
    setView,
    setVideoUrl,
    setIsDownloadable,
  } = useContext(CourseDetailsContext);

  return (
    <SafeAreaView>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 15,
          paddingTop: 15,
          backgroundColor: color.white,
        }}>
        <MetropolisMediumText style={styles.titleText}>
          {t('common.aboutCourse')}
        </MetropolisMediumText>
        <RenderHTML
          contentWidth={width}
          defaultTextProps={styles.defaultTextProps}
          source={{
            html: t('dynamic', {
              en:
                courseDetails?.description?.replace(/(<([^>]+)>)/gi, '') ?? '',
              ar:
                getTranslationFromMany(
                  courseDetails?.translation,
                  'description',
                  courseDetails?.description?.replace(/(<([^>]+)>)/gi, '') ??
                    '',
                ).replace(/(<([^>]+)>)/gi, '') ?? '',
            }),
          }}
        />
        {courseDetails?.course_objectives?.length ? (
          <Learning objectives={courseDetails?.course_objectives ?? []} />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  titleText: {
    color: color.black,
    fontSize: 15,
  },
  defaultTextProps: {
    style: {
      fontFamily: fonts.MetropolisRegular,
      lineHeight: 16,
      fontSize: 12,
      textAlign: 'left',
      marginTop: 10,
    },
  },
});

export default AboutCourse;
