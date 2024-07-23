import React, {useState} from 'react';
import {Pressable, ScrollView, View} from 'react-native';

import {useTranslation} from 'react-i18next';

import MetropolisSemiBoldText from '../../components/Text/MetropolisSemiBoldText';
import MetropolisRegularText from '../../components/Text/MetropolisRegularText';
import MetropolisMediumText from '../../components/Text/MetropolisMediumText';
import MetropolisBoldText from '../../components/Text/MetropolisBoldText';

import {getTranslationFromMany} from '../../util/misc';
import color from '../../components/color';
import {vw} from '../../util/dimenstions';
import {fonts} from '../../constants';
import RoundedButton from '../../components/RoundedButton';
import {
  checkQuestion,
  getResult,
  lessonCompletionUpdate,
} from '../../services/course';
import {useLoading} from '../../context/Loading/LoadingContext';
import RoutePaths from '../../util/RoutePaths';
import {errorToast, successToast} from '../../util/toastUtils';

const QuizView = props => {
  const navigation = props?.navigation;
  const courseId = props?.route?.params?.courseId ?? -1;
  const lesson = props?.route?.params?.lesson ?? {};
  const quiz = lesson?.quiz ?? [];

  const {i18n, t} = useTranslation();
  const {isLoading, setIsLoading} = useLoading();

  const [currQuestionIndex, setCurrQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState([]);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);

  // result states
  const [finalResult, setFinalResult] = useState(false);
  const [score, setScore] = useState(0);

  const markAsCompleted = async () => {
    try {
      const payload = {
        course_id: +courseId,
        chapter_id: +lesson?.chapter_id,
        lesson_id:
          lesson?.type === 'quiz' ? +lesson?.id : +lesson?.media[0]?.lesson_id,
      };
      setIsLoading(true);
      const resp = await lessonCompletionUpdate(payload);
      setIsLoading(false);
      if (resp.data?.success) {
        successToast(t('alertMessage.lessonCompleted'));
      } else {
        errorToast(t('alertMessage.wrong'));
      }
    } catch (err) {
      setIsLoading(false);
      console.log('[Item - onChangeState] Error : ', err?.response?.data);
      errorToast(t('alertMessage.wrong'));
    }
  };

  let arExplanation =
    (i18n.language === 'ar' &&
      quiz?.[currQuestionIndex]?.translation[2]?.value ===
        'no ar translation / nor actual explanation available') ||
    'no ar translations'
      ? ''
      : quiz[currQuestionIndex]?.translation[2]?.value;

  const checkAnswer = async () => {
    try {
      const payload = {
        course_id: +courseId,
        lesson_id: lesson?.id,
        lesson_quiz_id: quiz?.[currQuestionIndex]?.id,
        answer: currentAnswer,
      };
      setIsLoading(true);
      const resp = await checkQuestion(payload);
      setIsLoading(false);
      setIsCorrectAnswer(resp.data);

      if (!resp.data?.success) {
        errorToast(resp.data?.message);
      } else {
        successToast(resp.data?.message);
      }
    } catch (err) {
      setIsLoading(false);
      setIsCorrectAnswer(null);
      errorToast(err.response.data.message);
      console.log('[checkAnswer] Error : ', err?.response);
    }
  };

  async function toGetResult() {
    try {
      setIsLoading(true);
      const resp = await getResult(+lesson?.id);
      console.log('resp : ', resp.data);
      setIsLoading(false);
      if (resp.data?.success) {
        setFinalResult(true);
        setScore(Math.ceil(resp.data?.data));
        markAsCompleted();
      } else {
        errorToast(t('alertMessage.wrong'));
      }
    } catch (err) {
      setIsLoading(false);
      console.log('[toGetResult] Error : ', err?.response?.data);
      errorToast(t('alertMessage.wrong'));
    }
  }

  if (finalResult) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: color.white,
          paddingHorizontal: 16,
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <MetropolisBoldText>
            {i18n.language == 'ar' ? 'لقد أكملت' : 'You have completed the'}{' '}
            {i18n.language == 'ar' ? lesson?.translation?.value : lesson?.name}
          </MetropolisBoldText>
          <MetropolisSemiBoldText style={{marginTop: 14}}>
            {i18n.language == 'ar' ? 'درجاتك' : 'Your Score'}
          </MetropolisSemiBoldText>
          <MetropolisBoldText style={{color: color.blue}}>
            {score}%
          </MetropolisBoldText>
        </View>
        <RoundedButton
          bordered={false}
          bgColor={color.blue}
          textColor={color.white}
          text={t('common.next')}
          onPress={() => {
            navigation.navigate(RoutePaths.courseFullDetails, {
              courseId,
              isLessonCompleted: true,
            });
          }}
          isLoading={isLoading}
          iconName={''}
          light={true}
          style={{
            marginTop: 20,
            marginBottom: 30,
            maxHeight: 50,
            marginHorizontal: 16,
          }}
        />
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: color.white,
        }}
        contentContainerStyle={{
          paddingHorizontal: 16,
        }}>
        <MetropolisBoldText
          style={{
            color: color.darkGrey,
          }}>
          {`${t('course.question')} ${
            quiz?.length ? currQuestionIndex + 1 : 0
          } ${t('course.of')} ${quiz?.length ?? 0}`}
        </MetropolisBoldText>
        <MetropolisMediumText
          style={{
            marginTop: 16,
            textAlign: 'left',
            fontSize: 16,
            fontFamily: fonts.MetropolisMedium,
          }}>
          {t('dynamic', {
            en:
              quiz[currQuestionIndex].question?.replace(/(<([^>]+)>)/gi, '') ??
              quiz[currQuestionIndex].question,
            ar:
              getTranslationFromMany(
                quiz[currQuestionIndex].translation,
                'question',
                quiz[currQuestionIndex].question,
              )?.replace(/(<([^>]+)>)/gi, '') ??
              quiz[currQuestionIndex].question,
          })}
        </MetropolisMediumText>
        <MetropolisBoldText
          style={{
            color: color.darkGrey,
            marginTop: 16,
          }}>
          {t(
            quiz[currQuestionIndex]?.question_type !== 'one-answer'
              ? 'course.chooseManyAnswers'
              : 'course.chooseOneAnswer',
          )}
        </MetropolisBoldText>
        {quiz[currQuestionIndex]?.options.map((option, ind) => {
          return (
            <Pressable
              onPress={() => {
                if (isCorrectAnswer) {
                  return;
                }
                if (quiz?.[currQuestionIndex]?.question_type !== 'one-answer') {
                  if (currentAnswer.includes(option)) {
                    const _filterArr = currentAnswer.filter(
                      _item => _item !== option,
                    );
                    setCurrentAnswer(_filterArr);
                  } else {
                    setCurrentAnswer([...currentAnswer, option]);
                  }
                } else {
                  setCurrentAnswer([option]);
                }
              }}
              key={ind}
              style={{
                marginTop: 16,
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: currentAnswer.includes(option)
                  ? isCorrectAnswer !== null
                    ? isCorrectAnswer?.success
                      ? color.green
                      : color.red
                    : color.blue
                  : color.grey,
                borderRadius: 10,
                overflow: 'hidden',
              }}>
              <View
                style={{
                  width: vw(30),
                  backgroundColor: currentAnswer.includes(option)
                    ? isCorrectAnswer !== null
                      ? isCorrectAnswer?.success
                        ? color.green
                        : color.red
                      : color.blue
                    : color.grey,
                }}
              />
              <MetropolisRegularText
                style={{
                  flex: 1,
                  paddingVertical: 15,
                  marginHorizontal: 10,
                }}>
                {option?.replace(/(<([^>]+)>)/gi, '') ?? option}
              </MetropolisRegularText>
            </Pressable>
          );
        })}
        {isCorrectAnswer && isCorrectAnswer?.success === false && (
          <View
            style={{
              padding: 10,
              backgroundColor: color.grey,
              borderRadius: 10,
              marginTop: 16,
            }}>
            <MetropolisMediumText style={{color: color.red}}>
              {i18n.language == 'ar'
                ? 'الجواب غير صحيح'
                : 'The Answer is incorrect'}
            </MetropolisMediumText>
            <MetropolisMediumText
              style={{
                marginTop: 16,
                color: color.black,
              }}>
              {i18n.language == 'ar'
                ? 'The Correct Answer is : \n\n'
                : 'The Correct Answer is : \n\n'}
              {isCorrectAnswer?.data?.map((answer, index) => {
                return (
                  <MetropolisRegularText
                    key={'' + index}
                    style={{color: color.green}}>
                    {answer?.replace(/(<([^>]+)>)/gi, '') ?? answer}
                    {'\n'}
                  </MetropolisRegularText>
                );
              })}
            </MetropolisMediumText>
            <MetropolisMediumText style={{marginTop: 16}}>
              {(i18n.language == 'ar' ? 'توضيح :' : 'Explanation : ') + '\n'}
            </MetropolisMediumText>
            <MetropolisRegularText>{arExplanation}</MetropolisRegularText>
          </View>
        )}
      </ScrollView>
      <RoundedButton
        bordered={false}
        bgColor={color.blue}
        textColor={color.white}
        text={isCorrectAnswer !== null ? t('common.next') : t('common.submit')}
        onPress={() => {
          if (isCorrectAnswer !== null) {
            if (currQuestionIndex === quiz?.length - 1) {
              toGetResult();
              return;
            }
            setIsCorrectAnswer(null);
            setCurrentAnswer([]);
            setCurrQuestionIndex(prevState => prevState + 1);
          } else {
            if (!currentAnswer.length) {
              errorToast(t('alertMessage.selectOneOption'));
            } else {
              checkAnswer();
            }
          }
        }}
        isLoading={isLoading}
        iconName={''}
        light={true}
        style={{
          marginTop: 20,
          marginBottom: 30,
          maxHeight: 50,
          marginHorizontal: 16,
        }}
      />
    </View>
  );
};

export default QuizView;
