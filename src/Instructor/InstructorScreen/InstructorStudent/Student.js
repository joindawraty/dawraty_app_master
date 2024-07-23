import React from 'react';
import {View, ScrollView} from 'react-native';

import MyStudent from '../../InstructorComponent/MyStudent';
import InstructorTitleBar from '../../InstructorNavigation/InstructorTitleBar';
import InstructorBottomTab from '../../InstructorComponent/InstructorBottomTab';

const Student = props => {
  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <InstructorTitleBar title="My Students" {...props} />
      <ScrollView>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <MyStudent />
        </View>
      </ScrollView>
      <InstructorBottomTab />
    </View>
  );
};
export default Student;
