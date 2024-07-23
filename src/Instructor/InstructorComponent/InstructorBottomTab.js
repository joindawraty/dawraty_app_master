import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'native-base';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Card} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import color from '../../components/color';

const InstructorBottomTab = props => {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{flexDirection: 'column', flex: 1}}>
        <Card
          style={{
            flexDirection: 'row',
            backgroundColor: '#fff',
            elevation: 5,
            height: 60,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('InstructorDashboard')}
            style={{
              flexDirection: 'column',
              flex: 0.4,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon
              style={{
                color:
                  route.name == 'InstructorDashboard'
                    ? color.blue
                    : color.bottom,
              }}
              name="home-outline"
              size={25}
            />
            <Text
              style={{
                color:
                  route.name == 'InstructorDashboard'
                    ? color.blue
                    : color.bottom,
                fontSize: 12,
              }}>
              Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Student')}
            style={{
              flexDirection: 'column',
              flex: 0.4,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon
              style={{
                color: route.name == 'Student' ? color.blue : color.bottom,
              }}
              name="search-outline"
              size={25}
            />
            <Text
              style={{
                color: route.name == 'Student' ? color.blue : color.bottom,
                fontSize: 12,
              }}>
              Student
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('InstructorCourse')}
            style={{
              flexDirection: 'column',
              flex: 0.4,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon
              style={{
                color:
                  route.name == 'InstructorCourse' ? color.blue : color.bottom,
              }}
              name="search-outline"
              size={25}
            />
            <Text
              style={{
                color:
                  route.name == 'InstructorCourse' ? color.blue : color.bottom,
                fontSize: 12,
              }}>
              Courses
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('InstructorProfile')}
            style={{
              flexDirection: 'column',
              flex: 0.4,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon
              style={{
                color:
                  route.name == 'InstructorProfile' ? color.blue : color.bottom,
              }}
              name="person-circle-outline"
              size={25}
            />
            <Text
              style={{
                color:
                  route.name == 'InstructorProfile' ? color.blue : color.bottom,
                fontSize: 12,
              }}>
              Profile
            </Text>
          </TouchableOpacity>
        </Card>
      </View>
    </View>
  );
};
export default InstructorBottomTab;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  text: {
    fontSize: widthPercentageToDP('4%'),
    color: '#FFFFFF',
    fontFamily: 'OpenSans-SemiBold',
  },
});
