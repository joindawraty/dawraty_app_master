// export default Login
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {CloseIcon, ScrollView} from 'native-base';
import {Style} from '../../assets/Styles/Style';
import color from '../../components/color';
import Password from '../../components/Password';
import ConfirmPassword from '../../components/Confirmpassword';
import {showError} from '../../components/InputError';
// import {
//   REGISTER_INSTRUCTOR_START,
//   REMOVE_ERROR,
// } from '../../redux/_ActionsType';
import SweetAlert from 'react-native-sweet-alert';
import AppTextInput from '../../components/AppTextInput';
import {successToast} from '../../util/toastUtils';

const height = hp('100%');
const width = wp('100%');
// let e = 'test123@gmail.com'
// let p = 'test@123'
let e = '';
let p = '';

function TeacherRegister(props) {
  const navigation = useNavigation();
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [country, setCountry] = useState('');
  const [mobile, setMobile] = useState('');
  const [checked, setChecked] = useState(false);
  const [loader, setLoader] = useState(false);
  const [submitted, setSubmit] = useState(false);
  const [error, setError] = useState({
    email: null,
    password: null,
    first_name: null,
    confirm: null,
    last_name: null,
    mobile_number: null,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(props);
    if (props.user && submitted) {
      dispatch({
        type: REMOVE_ERROR,
      });
      const user = props.user;
      setSubmit(false);
      if (user.status == 400) {
        SweetAlert.showAlertWithOptions({
          title: 'Error',
          subTitle: props.user.message,
          style: 'error',
        });
      } else {
        successToast('Otp sent!');
        navigation.navigate('Otp');
      }
    }
    if (props.error && submitted) {
      //   dispatch({
      //     type: REMOVE_ERROR,
      //   });
      setSubmit(false);
      SweetAlert.showAlertWithOptions({
        title: 'Error',
        subTitle: props.error.message,
        style: 'error',
      });
    }
  }, [props]);

  useEffect(() => {}, []);

  const submit = () => {
    let err = {};
    if (fname == null || fname == '') {
      err.fname = 'First Name is required';
    }
    if (lname == null || lname == '') {
      err.lname = 'Last Name is required';
    }
    if (email == null || email == '') {
      err.email = 'Email is required';
    }
    if (mobile == null || mobile == '') {
      err.mobile = 'Mobile is required';
    }
    if (password == null || password == '') {
      err.password = 'Password is required';
    }
    if (cpassword == null || cpassword == '') {
      err.cpassword = 'Confirm Password is required';
    }
    if (cpassword != password) {
      err.cpassword = "Confirm Password dosn't match";
    }
    setError(err);
    if (Object.keys(err).length > 0) {
      return;
    }
    dispatch({
      //   type: REGISTER_INSTRUCTOR_START,
      payload: {
        first_name: fname,
        last_name: lname,
        email,
        password,
        cpassword,
        mobile_number: mobile,
      },
    });
    setSubmit(true);
  };

  return (
    <SafeAreaView style={{flex: 1, padding: 10, backgroundColor: '#fff'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{flex: 0.4, alignItems: 'flex-end'}}>
          <CloseIcon style={{color: '#000'}} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <View
            style={{flexDirection: 'column', flex: 1, alignItems: 'center'}}>
            <Text style={Style.font18}>{'Register'}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <View
            style={{flexDirection: 'column', flex: 1, alignItems: 'center'}}>
            <Text style={Style.font12gray}>
              {'Already have an account? '}
              <Text
                onPress={() => navigation.navigate('Login')}
                style={[
                  Style.font12,
                  {textDecorationLine: 'underline', fontWeight: 'bold'},
                ]}>
                {'Login'}
              </Text>
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <View style={{flexDirection: 'column', flex: 1}}>
            <Text style={Style.textinputbox}>{'First Name'}</Text>
            <AppTextInput
              style={Style.textemail}
              placeholder={'First Name'}
              value={fname}
              onChangeText={text => setFname(text)}
              placeholderTextColor={'#CACACA'}
            />
            {error.first_name && showError(error.first_name)}
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <View style={{flexDirection: 'column', flex: 1}}>
            <Text style={Style.textinputbox}>{'Last Name'}</Text>
            <TextInput
              style={Style.textemail}
              placeholder={'Last Name'}
              value={lname}
              onChangeText={text => setLname(text)}
              placeholderTextColor={'#CACACA'}
            />
            {error.last_name && showError(error.last_name)}
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <View style={{flexDirection: 'column', flex: 1}}>
            <Text style={Style.textinputbox}>{'Email'}</Text>
            <TextInput
              style={Style.textemail}
              placeholder={'Your Email'}
              keyboardType="email-address"
              value={email}
              onChangeText={text => setEmail(text)}
              placeholderTextColor={'#CACACA'}
            />
            {error.email && showError(error.email)}
          </View>
        </View>

        <View style={{flexDirection: 'row', marginTop: 10}}>
          <View style={{flexDirection: 'column', flex: 1}}>
            <Text style={Style.textinputbox}>{'Password'}</Text>
            <Password onChangeText={setPassword} value={password} />
            {error.password && showError(error.password)}
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <View style={{flexDirection: 'column', flex: 1}}>
            <Text style={Style.textinputbox}>{'Confirm Password'}</Text>
            <ConfirmPassword password={cpassword} setPassword={setCpassword} />
            {error.confirm && showError(error.confirm)}
          </View>
        </View>
        {/* <View style={{flexDirection:'row',marginTop:10}}>
                        <View style={{flexDirection:'column',flex:1}}>
                            <Text style={Style.textinputbox}>{'Select Country'}</Text>
                                <DropDownPicker
                                    items={[
                                        {label: 'EN', value: 'en', },
                                        {label: 'GN', value: 'gr', },
                                    ]}
                                    style={Style.textemail}
                                    arrowColor={color.Lefticon}
                                    arrowSize={10}
                                    value={country}
                                    placeholder="Select Country"
                                    placeholderTextColor={'#CACACA'}
                                    itemStyle={[{
                                        justifyContent: 'flex-start',
                                    }]}
                                    />
                        </View>
                    </View> */}
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <View style={{flexDirection: 'column', flex: 1}}>
            <Text style={Style.textinputbox}>{'Mobile Number'}</Text>
            <View style={[{flexDirection: 'row'}, Style.textemail]}>
              <TextInput
                placeholder="Enter Mobile Number"
                value={mobile}
                style={{flex: 1, color: '#000'}}
                autoCapitalize="none"
                keyboardType="phone-pad"
                onChangeText={text => setMobile(text)}
                placeholderTextColor={'#CACACA'}
              />
              {error.mobile_number && showError(error.mobile_number)}
              {/* <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center', marginRight: 10}}>
                                <Iconion name='call'
                                    type='ionicon'
                                    size={18}
                                    color="#000"
                                    style={{color: "#000"}}
                                />
                                
                            </TouchableOpacity> */}
            </View>
          </View>
        </View>

        <View style={{flexDirection: 'row', paddingVertical: wp('8%')}}>
          <View style={{flexDirection: 'column', flex: 1}}>
            <TouchableOpacity onPress={submit} style={Style.loginbutton}>
              {props.loading && submitted && (
                <ActivityIndicator size="small" color="#fff" />
              )}
              {(!props.loading || !submitted) && (
                <Text style={{color: '#fff'}}>{'Register'}</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flexDirection: 'row', marginTop: 10}}>
          <View
            style={{
              flexDirection: 'column',
              flex: 1,
              alignItems: 'center',
              marginTop: 5,
            }}>
            <Text style={{color: color.blue, fontSize: 12}}>{'Services'}</Text>
            <Text
              style={{
                color: color.blue,
                fontSize: 14,
                fontWeight: 'bold',
                marginTop: 5,
                marginBottom: 20,
              }}>
              {'Terms'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default TeacherRegister;
