import React, {useLayoutEffect, useState} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import MetropolisRegularText from '../../../components/Text/MetropolisRegularText';
import MetropolisMediumText from '../../../components/Text/MetropolisMediumText';
import InputWithTitle from '../../../components/InputWithTitle';
import AppTextInput from '../../../components/AppTextInput';
import SmallRoundedBtn from '../../../components/SmallRoundedButton';

import {Style} from '../../../assets/Styles/Style';
import color from '../../../components/color';
import CommonHeader from '../../../components/CommonHeader';
import {useTranslation} from 'react-i18next';

const CreateCourse = props => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  const {t} = useTranslation();

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerShown: true,
      header: headerProps => {
        return (
          <CommonHeader
            withBackBtn
            {...headerProps}
            title={props?.route?.params?.id ? 'Edit Course' : 'Create Course'}
          />
        );
      },
    });
  }, [props.navigation, props?.route?.params?.id]);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: color.white,
        paddingHorizontal: 15,
        paddingTop: 15,
      }}>
      <InputWithTitle
        title={'Title for course'}
        inputStyle={{
          borderColor: color.greyNew,
        }}
        placeholder={'Title for course'}
      />

      <MetropolisMediumText style={{fontSize: 14, marginTop: 10}}>
        {'Choose category'}
      </MetropolisMediumText>
      <DropDownPicker
        items={[
          {label: 'EN', value: 'en'},
          {label: 'GN', value: 'gr'},
        ]}
        arrowColor={color.Lefticon}
        arrowSize={10}
        placeholder="Choose a category"
        placeholderStyle={{
          color: `${color.black}80`,
        }}
        style={{
          ...Style.textemailsmall,
          borderColor: color.greyNew,
          minHeight: 40,
        }}
        itemStyle={[
          {
            justifyContent: 'flex-start',
          },
        ]}
        open={open}
        setOpen={setOpen}
        value={value}
        setValue={setValue}
        listMode={DropDownPicker.LIST_MODE.SCROLLVIEW}
      />

      <InputWithTitle
        title={'What will students learn from your course'}
        inputStyle={{
          borderColor: color.greyNew,
          textAlignVertical: 'top',
          height: 120,
          paddingTop: 10,
        }}
        containerStyle={{
          marginTop: 10,
        }}
        placeholder={t('common.aboutCourse')}
        textAlignVertical="top"
        multiline
      />

      <InputWithTitle
        title={'Learning Objective of your course'}
        inputStyle={{
          borderColor: color.greyNew,
        }}
        containerStyle={{
          marginTop: 10,
        }}
        placeholder={'Learning Objective'}
      />
      <TouchableOpacity style={{}}>
        <MetropolisRegularText style={{color: color.blue, fontSize: 14}}>
          {'Add Objective +'}
        </MetropolisRegularText>
      </TouchableOpacity>
      <MetropolisMediumText style={{fontSize: 14, marginTop: 15}}>
        {'Add Lecture Videos'}
      </MetropolisMediumText>
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
        <AppTextInput
          style={[
            Style.textcourse,
            {
              width: null,
              flex: 1,
              height: 90,
              borderColor: color.greyNew,
              borderWidth: 2,
            },
          ]}
          placeholder="Title of the Video"
        />
        <TouchableOpacity
          style={{
            height: 90,
            width: 75,
            borderWidth: 2,
            borderColor: color.greyNew,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 5,
            margin: 5,
          }}>
          <MetropolisRegularText
            style={{
              fontSize: 14,
              textAlign: 'center',
              color: color.skyBlue,
              lineHeight: 16,
            }}>
            {'Upload Video here'}
          </MetropolisRegularText>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={{}}>
        <MetropolisRegularText style={{color: color.blue, fontSize: 14}}>
          {'Add New Lecture Video +'}
        </MetropolisRegularText>
      </TouchableOpacity>
      <View
        style={{
          marginVertical: 15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        <SmallRoundedBtn
          text={'Draft'}
          onPress={() => {}}
          containerStyle={{
            backgroundColor: color.white,
            borderWidth: 1,
            borderColor: color.blue,
            marginRight: 10,
          }}
          textStyle={{
            color: color.blue,
            paddingVertical: 8,
            paddingHorizontal: 30,
            fontSize: 14,
          }}
        />
        <SmallRoundedBtn
          text={'Submit For Approval'}
          onPress={() => {}}
          containerStyle={{
            backgroundColor: color.blue,
            marginRight: 5,
          }}
          textStyle={{
            color: color.white,
            paddingVertical: 8,
            paddingHorizontal: 15,
            fontSize: 14,
          }}
        />
      </View>
    </ScrollView>
  );
};
export default CreateCourse;
