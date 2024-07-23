import React, {useContext, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  View,
  SafeAreaView,
} from 'react-native';
import {Modal} from 'native-base';
import {ListItem} from '@rneui/themed';
import {useTranslation} from 'react-i18next';
import DropDownPicker from 'react-native-dropdown-picker';

import {CourseDetailsContext} from '../../Screens/Dashboard/Dashboard/CourseFullDetails';
import MetropolisSemiBoldText from '../Text/MetropolisSemiBoldText';
import MetropolisRegularText from '../Text/MetropolisRegularText';
import MetropolisMediumText from '../Text/MetropolisMediumText';
import SmallRoundedButton from '../../components/SmallRoundedButton';
import AppInputText from '../../components/AppTextInput';

import {errorToast, successToast} from '../../util/toastUtils';
import {postComment} from '../../services/chat_api';
import color from '../color';

const Question = () => {
  const {t} = useTranslation();

  const {courseDetails} = useContext(CourseDetailsContext);

  const [expanded, setExpanded] = useState(-1);
  const [isVisible, setVisible] = useState(false);
  const [messageTxt, setMessageTxt] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [viewHeight, setViewHeight] = useState(null);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  // useEffect(() => {
  //   console.log('instructors : ', courseDetails?.instructors);
  // }, []);

  const instructorsArr = useMemo(() => {
    return (
      courseDetails?.instructors?.map?.(instructor => {
        return {
          label: t(
            'courseAuthors.' + instructor?.full_name,
            instructor?.full_name,
          ),
          value: instructor?.id,
        };
      }) ?? []
    );
  }, [courseDetails?.instructors, t]);

  const onSendMessage = async () => {
    try {
      if (!value) {
        errorToast(t('common.selectAnInstructor'));
        return;
      }

      if (!messageTxt || !messageTxt?.trim()) {
        errorToast(t('common.typeMessage'));
        return;
      }
      const payload = {
        comment: messageTxt,
      };

      setLoading(true);
      const response = await postComment(value, payload);
      setLoading(false);

      if (response.data?.success) {
        successToast(t('alertMessage.qAskedSuccess'));
      }
      setMessageTxt('');
      setViewHeight(null);
      setOpen(false);
      setValue(null);
      setVisible(false);
    } catch (err) {
      setLoading(false);
      errorToast(t('alertMessage.wrong'));
      setMessageTxt('');
      setViewHeight(null);
      setOpen(false);
      setValue(null);
      setVisible(false);
      console.log(
        '[onSendMessage] Error : ',
        err?.response?.data?.message ??
          err?.response?.data ??
          err?.response ??
          err?.message,
      );
    }
  };

  useEffect(() => {
    return () => {
      setVisible(false);
    };
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: color.white}}>
      <Modal
        isOpen={isVisible}
        animationPreset="fade"
        onClose={() => {
          setVisible(false);
        }}>
        <View
          onLayout={e => {
            setViewHeight(e.nativeEvent.layout.height);
          }}
          style={{
            padding: 16,
            backgroundColor: color.white,
            height: viewHeight,
            width: Dimensions.get('window').width - 32,
            borderRadius: 10,
          }}>
          {isLoading ? (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <ActivityIndicator size={'large'} color={color.blue} />
            </View>
          ) : (
            <>
              <MetropolisSemiBoldText style={{fontSize: 16}}>
                {t('common.askYourQuestion')}
              </MetropolisSemiBoldText>

              <MetropolisMediumText
                style={{
                  marginTop: 24,
                }}>
                {t('common.selectAnInstructor')}
              </MetropolisMediumText>
              <DropDownPicker
                items={instructorsArr}
                arrowSize={10}
                placeholder={t('common.selectAnInstructor')}
                placeholderTextColor={color.greyNew}
                textStyle={{
                  color: `${color.black}80`,
                  flexGrow: 1,
                  textAlign: 'left',
                }}
                open={open}
                setOpen={setOpen}
                value={value}
                setValue={setValue}
                listMode="SCROLLVIEW"
                style={{
                  minHeight: 45,
                  marginTop: 10,
                  backgroundColor: `${color.black}10`,
                  borderColor: color.blue,
                  borderWidth: 3,
                }}
              />
              <AppInputText
                placeholder={t('common.typeMessage')}
                style={{
                  flexGrow: 1,
                  borderRadius: 10,
                  backgroundColor: color.white,
                  marginTop: 24,
                  marginBottom: 15,
                  paddingTop: 15,
                  paddingBottom: 15,
                  paddingStart: 15,
                  paddingEnd: 15,
                  fontSize: 14,
                  height: null,
                  maxHeight: 200,
                  borderWidth: 1,
                  // maxHeight: vh(100),
                }}
                multiline
                value={messageTxt}
                numberOfLines={4}
                textAlignVertical="top"
                onChangeText={text => {
                  setMessageTxt(text);
                }}
              />

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 14,
                }}>
                <SmallRoundedButton
                  text={t('common.cancel')}
                  onPress={() => {
                    setVisible(false);
                  }}
                  containerStyle={{
                    flex: 0.45,
                    backgroundColor: color.white,
                    borderWidth: 2,
                    borderColor: color.blue,
                    paddingVertical: 10,
                  }}
                  textStyle={{
                    fontSize: 16,
                    color: color.blue,
                  }}
                />
                <SmallRoundedButton
                  text={t('common.submit')}
                  onPress={onSendMessage}
                  containerStyle={{
                    flex: 0.45,
                    paddingVertical: 10,
                    backgroundColor: color.blue,
                    borderWidth: 2,
                    borderColor: color.blue,
                  }}
                  textStyle={{
                    fontSize: 16,
                    color: color.white,
                  }}
                />
              </View>
            </>
          )}
        </View>
      </Modal>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 15,
          marginTop: 15,
        }}>
        <View
          style={{
            backgroundColor: color.greyNew,
            padding: 5,
            borderRadius: 10,
            overflow: 'hidden',
          }}>
          {courseDetails?.question_answers?.map(_item => (
            <ListItem.Accordion
              key={_item?.id}
              containerStyle={{
                backgroundColor: color.greyNew,
                borderRadius: 10,
              }}
              style={{
                backgroundColor: color.greyNew,
              }}
              content={
                <>
                  <ListItem.Content>
                    <MetropolisSemiBoldText>
                      {_item?.question}
                    </MetropolisSemiBoldText>
                  </ListItem.Content>
                </>
              }
              isExpanded={expanded == 0}
              onPress={() => {
                if (expanded == 0) {
                  setExpanded(-1);
                  return;
                }
                setExpanded(0);
              }}>
              <ListItem
                containerStyle={{
                  backgroundColor: color.greyNew,
                  borderRadius: 10,
                  marginTop: -10,
                }}>
                <MetropolisRegularText>{_item?.answer}</MetropolisRegularText>
              </ListItem>
            </ListItem.Accordion>
          ))}
          <MetropolisSemiBoldText
            onPress={() => {
              setVisible(true);
            }}>
            {t('common.anyQuestions')}{' '}
            <MetropolisSemiBoldText
              style={{
                color: '#1E97FF',
              }}>
              {t('common.messageDirectly')}
            </MetropolisSemiBoldText>
          </MetropolisSemiBoldText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Question;
