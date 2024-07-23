import React, {useEffect} from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';

import OnboardingActionBtn from '../../components/OnboardingActionBtn';
import OnboardingItem from '../../components/OnboardingItem';
import withSafeAreaView from '../../hoc/withSafeAreaView';

// import LeaderFromTheBest from '../../components/SVG/LearnFromTheBestIcon';
// import WatchAnyTimeCoursesIcon from '../../components/SVG/WatchAnyTimeCoursesIcon';
// import ExploreCoursesIcon from '../../components/SVG/ExploreCoursesIcon';

import onboarding1 from '../../assets/images/onboarding1.png';
import onboarding2 from '../../assets/images/onboarding2.png';
import onboarding3 from '../../assets/images/onboarding3.png';

import {vw} from '../../util/dimenstions';
import RoutePaths from '../../util/RoutePaths';
import color from '../../components/color';
import {CommonActions} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setOnboardingCompleted} from '../../redux/slices/appSlices';

const slides = [
  {
    key: 's1',
    image: onboarding1,
  },
  {
    key: 's2',
    image: onboarding2,
  },
  {
    key: 's3',
    image: onboarding3,
  },
];

const renderButton = text => {
  return <OnboardingActionBtn text={text} />;
};

const OnboardingScreen = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setOnboardingCompleted(true));
  }, [dispatch]);

  const renderItem = ({item}) => {
    return <OnboardingItem image={item.image} />;
  };

  const onComplete = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: RoutePaths.login}],
      }),
    );
  };

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      onDone={onComplete}
      showSkipButton={true}
      dotStyle={{width: vw(18)}}
      activeDotStyle={{width: vw(40)}}
      onSkip={onComplete}
      renderDoneButton={renderButton.bind(null, 'Next')}
      renderSkipButton={renderButton.bind(null, 'Skip')}
      renderNextButton={renderButton.bind(null, 'Next')}
      style={{
        backgroundColor: color.white,
      }}
    />
  );
};

export default withSafeAreaView(OnboardingScreen);
