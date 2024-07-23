import React from 'react';
import {View, StyleSheet, useWindowDimensions} from 'react-native';
import {SceneMap, TabView} from 'react-native-tab-view';

import AboutCourse from '../../Screens/Course/AboutCourse';
import CourseContent from './CourseContent';
import {Item} from '../TabContent.js/Tabcontent';
import Question from './Question';

import color from '../color';

const renderScene = SceneMap({
  courseContent: CourseContent,
  overview: AboutCourse,
  qa: Question,
});

const Tab = props => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'courseContent', title: 'Course Content'},
    {key: 'overview', title: 'Overview'},
    {key: 'qa', title: 'Q & A'},
  ]);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      animationEnabled
      lazy
      initialLayout={{width: layout.width}}
      renderTabBar={tabProps => {
        return (
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 15,
              borderBottomColor: color.black,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}>
            {routes.map((item, tabIndex) => {
              return (
                <Item
                  title={item.title}
                  active={tabProps.navigationState.index}
                  setActive={() => {
                    tabProps?.jumpTo(item.key);
                  }}
                  index={tabIndex}
                />
              );
            })}
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
  },
  item: {
    backgroundColor: '#f9c2ff',
  },
  title: {
    fontSize: 32,
  },
});

export default Tab;
