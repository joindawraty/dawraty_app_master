import React from 'react';
import {Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import DashboardTitleBar from '../../navigation/DashboardTitleBar';
import Profileinfo from '../../components/ProfileComponent/Profileinfo';
import color from '../../components/color';
import {Card} from 'native-base';
import {slider} from '../../constants/images';
import DropDownPicker from 'react-native-dropdown-picker';
import {Style} from '../../assets/Styles/Style';
import ProfileRecentOrder from '../InstructorComponent/ProfileRecentOrder';
import ProfileIncomeHistory from '../InstructorComponent/ProfileIncomeHistory';
import InstructorBottomTab from '../InstructorComponent/InstructorBottomTab';

const InstructorProfile = props => {
  const navigation = useNavigation();

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <DashboardTitleBar title="Profile" {...props} />
      <ScrollView>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'column', flex: 0.7}}>
            <Profileinfo />
          </View>
          <View
            style={{
              flexDirection: 'column',
              flex: 0.5,
              marginTop: 40,
              alignItems: 'center',
            }}>
            <Image
              source={slider.slider2}
              style={{
                height: 100,
                width: 100,
                resizeMode: 'contain',
                borderRadius: 10,
              }}
            />
            <Text style={{fontSize: 14, color: color.black, marginTop: 10}}>
              Profile Picture
            </Text>
          </View>
        </View>
        <TouchableOpacity style={{flexDirection: 'row'}}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              flex: 1,
              backgroundColor: color.blue,
              margin: 10,
              padding: 15,
              borderRadius: 5,
            }}>
            <Text style={{color: color.white, fontSize: 14}}>Save</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            margin: 10,
            borderBottomWidth: 1,
            paddingBottom: 15,
          }}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              flex: 0.8,
            }}>
            <Text style={{color: color.blue, fontSize: 18, marginTop: 20}}>
              Income History
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              flex: 0.3,
              alignItems: 'flex-end',
            }}>
            <DropDownPicker
              items={[
                {label: 'EN', value: 'en'},
                {label: 'GN', value: 'gr'},
              ]}
              style={Style.textemailsmall}
              arrowColor={color.Lefticon}
              arrowSize={10}
              placeholder="2021"
              placeholderTextColor={'#CACACA'}
              itemStyle={[
                {
                  justifyContent: 'flex-start',
                },
              ]}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'column', flex: 0.7}}>
            <ProfileIncomeHistory />
          </View>
          <View style={{flexDirection: 'column', flex: 0.5, marginTop: 40}}>
            <Card
              style={{
                backgroundColor: '#fff',
                marginTop: 40,
                marginBottom: 20,
                marginRight: 10,
                height: 150,
                justifyContent: 'center',
              }}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flexDirection: 'column',
                    flex: 1,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: color.black,
                      fontWeight: '500',
                    }}>
                    Total Income
                  </Text>
                  <Image
                    source={slider.slider2}
                    style={{height: 80, width: 80, resizeMode: 'contain'}}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      color: color.black,
                      fontWeight: '500',
                    }}>
                    KD 10,210.000
                  </Text>
                </View>
              </View>
            </Card>
          </View>
        </View>
        {/* <ProfileRecentOrder /> */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            marginBottom: 10,
            marginLeft: 10,
          }}>
          <View style={{flexDirection: 'column'}}>
            <Text style={{color: color.blue, fontSize: 20, fontWeight: '700'}}>
              Support
            </Text>
          </View>
        </View>
        <TouchableOpacity style={{flexDirection: 'row', margin: 10}}>
          <View
            style={{
              flexDirection: 'column',
              flex: 0.9,
              justifyContent: 'center',
            }}>
            <Text style={{color: '#000', fontSize: 15, fontWeight: '500'}}>
              About Dawraty
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              flex: 0.1,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Icon name="chevron-forward-outline" size={20} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{flexDirection: 'row', margin: 10}}>
          <View
            style={{
              flexDirection: 'column',
              flex: 0.9,
              justifyContent: 'center',
            }}>
            <Text style={{color: '#000', fontSize: 15, fontWeight: '500'}}>
              Courses
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              flex: 0.1,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Icon name="chevron-forward-outline" size={20} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{flexDirection: 'row', margin: 10}}>
          <View
            style={{
              flexDirection: 'column',
              flex: 0.9,
              justifyContent: 'center',
            }}>
            <Text style={{color: '#000', fontSize: 15, fontWeight: '500'}}>
              Privacy Policy
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              flex: 0.1,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Icon name="chevron-forward-outline" size={20} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{flexDirection: 'row', margin: 10}}>
          <View
            style={{
              flexDirection: 'column',
              flex: 0.9,
              justifyContent: 'center',
            }}>
            <Text style={{color: '#000', fontSize: 15, fontWeight: '500'}}>
              FAQ
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              flex: 0.1,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Icon name="chevron-forward-outline" size={20} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={{flexDirection: 'row', margin: 10}}>
          <View
            style={{
              flexDirection: 'column',
              flex: 0.9,
              justifyContent: 'center',
            }}>
            <Text style={{color: '#000', fontSize: 15, fontWeight: '500'}}>
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <InstructorBottomTab />
    </View>
  );
};
export default InstructorProfile;
