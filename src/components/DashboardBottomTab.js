import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'native-base';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Card} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import color from './color';
const DashboardBottomTab = props => {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <Card
      style={{
        flexDirection: 'row',
        backgroundColor: '#fff',
        elevation: 5,
        height: 90,
      }}>
      {/* <LinearGradient  style={{ paddingBottom: 25, flex:0.4 }}
                        start={{x: 0, y: 1}} end={{x: 1, y: 1}} 
                        colors={route.name == "Dashboard"?['#15D0B8', '#3910DE']: ['#E4E5FA', '#E4E5FA']}>
                    <View style={{flexDirection:'column', padding: 20, flex:0.4,  alignItems:'center', justifyContent:'center'}}>
                        <TouchableOpacity onPress={()=>navigation.navigate('Dashboard')}>
                            <Image source={icons.home} style={{height:25, width:30, resizeMode:'contain'}} />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
                <LinearGradient  style={{ paddingBottom: 25, flex:0.4 }}
                        start={{x: 0, y: 1}} end={{x: 1, y: 1}} 
                        colors={route.name == "Bars"?['#15D0B8', '#3910DE']: ['#E4E5FA', '#E4E5FA']}>
                    <View style={{flexDirection:'column', padding: 20, flex:0.4,  alignItems:'center', justifyContent:'center'}}>
                        <TouchableOpacity  onPress={()=>navigation.navigate('Bars')}>
                            <Image source={icons.bars} style={{height:25, width:30, resizeMode:'contain'}} />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
                <LinearGradient  style={{ paddingBottom: 25, flex:0.4 }}
                        start={{x: 0, y: 1}} end={{x: 1, y: 1}} 
                        colors={route.name == "Swap"?['#15D0B8', '#3910DE']: ['#E4E5FA', '#E4E5FA']}>
                    <View style={{flexDirection:'column', padding: 20, flex:0.4,  alignItems:'center', justifyContent:'center'}}>
                        <TouchableOpacity  onPress={()=>navigation.navigate('Swap')}>
                            <Image source={icons.swap} style={{height:25, width:30, resizeMode:'contain'}} />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
                <LinearGradient  style={{ paddingBottom: 25, flex:0.4 }}
                        start={{x: 0, y: 1}} end={{x: 1, y: 1}} 
                        colors={route.name == "Wallet"?['#15D0B8', '#3910DE']: ['#E4E5FA', '#E4E5FA']}>
                    <View style={{flexDirection:'column', padding: 20, flex:0.4,  alignItems:'center', justifyContent:'center'}}>
                        <TouchableOpacity  onPress={()=>navigation.navigate('Wallet')}>
                            <Image source={icons.wallet} style={{height:25, width:30, resizeMode:'contain'}} />
                        </TouchableOpacity>
                    </View>
                </LinearGradient> */}

      <TouchableOpacity
        onPress={() => navigation.navigate('Dashboard')}
        style={{
          flexDirection: 'column',
          flex: 0.4,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon
          style={{color: route.name == 'Dashboard' ? color.blue : color.bottom}}
          name="home-outline"
          size={25}
        />
        <Text
          style={{
            color: route.name == 'Dashboard' ? color.blue : color.bottom,
            fontSize: 12,
          }}>
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('instructor')}
        style={{
          flexDirection: 'column',
          flex: 0.4,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon
          style={{
            color: route.name == 'instructor' ? color.blue : color.bottom,
          }}
          name="home-outline"
          size={25}
        />
        <Text
          style={{
            color: route.name == 'instructor' ? color.blue : color.bottom,
            fontSize: 12,
          }}>
          Instructor
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Course')}
        style={{
          flexDirection: 'column',
          flex: 0.4,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon
          style={{color: route.name == 'Course' ? color.blue : color.bottom}}
          name="caret-forward-circle-outline"
          size={25}
        />
        <Text
          style={{
            color: route.name == 'Course' ? color.blue : color.bottom,
            fontSize: 12,
          }}>
          Course
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Wishlist')}
        style={{
          flexDirection: 'column',
          flex: 0.4,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon
          style={{color: route.name == 'Wishlist' ? color.blue : color.bottom}}
          name="heart-outline"
          size={25}
        />
        <Text
          style={{
            color: route.name == 'Wishlist' ? color.blue : color.bottom,
            fontSize: 12,
          }}>
          Wishlist
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('ProfileDashboard')}
        style={{
          flexDirection: 'column',
          flex: 0.4,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon
          style={{
            color: route.name == 'ProfileDashboard' ? color.blue : color.bottom,
          }}
          name="person-circle-outline"
          size={25}
        />
        <Text
          style={{
            color: route.name == 'ProfileDashboard' ? color.blue : color.bottom,
            fontSize: 12,
          }}>
          Profile
        </Text>
      </TouchableOpacity>
    </Card>
  );
};
export default DashboardBottomTab;

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
