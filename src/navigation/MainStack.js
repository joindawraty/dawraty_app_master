import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';

import FrontDashboardCourse from '../Screens/Course/FrontDashboardCourse';
import CourseDetail from '../Screens/Course/CourseDetail';

import BottomTabNavigation from './BottomTabBar';
import CommonHeader from '../components/CommonHeader';

import Splash1 from '../Screens/Splash/Splash1';
import Login from '../Screens/Auth/Login';
import Register from '../Screens/Auth/Register';
import Otp from '../Screens/Auth/Otp';
import ForgotPassword from '../Screens/Auth/ForgotPassword';

import OnboardingScreen from '../Screens/Splash/OnboardingScreen';
import Search from '../Screens/Dashboard/FrontDashboard/Search';
import Checkout from '../Screens/Cart/Checkout';
import Cart from '../Screens/Cart/Cart';
import CheckoutProceed from '../Screens/Cart/CheckoutProceed';
import Notification from '../Screens/Notification/Notification';
import InstructorChat from '../Screens/Instructor/InstructorChat';
import InstructorCreateCourse from '../Instructor/InstructorScreen/InstructorCourse/CreateCourse.js';
import CourseFullDetails from '../Screens/Dashboard/Dashboard/CourseFullDetails';
import ChangePassword from '../Screens/Auth/ChangePassword';
import VideoPlayerScreen from '../Screens/Common/VideoPlayerScreen';
import ProfileRecentOrder from '../Instructor/InstructorComponent/ProfileRecentOrder';
import AddAddress from '../Screens/Cart/AddAddress';
import PaymentGateway from '../Screens/Cart/PaymentGateway';

import AboutUs from '../Screens/Profile/AboutUs';
import PrivacyPolicy from '../Screens/Profile/PrivacyPolicy';
import TermsAndConditions from '../Screens/Profile/TermsAndConditions';
import FAQ from '../Screens/Profile/FAQ';
import MyAddresses from '../Screens/Profile/MyAddresses';

import {appConstants} from '../constants';
import RoutePaths from '../util/RoutePaths';
import PDFView from '../Screens/Course/PDFView';
import QuizView from '../Screens/Course/QuizView';

const Stack = createNativeStackNavigator();

const defaultScreenOptions = {
  headerShown: false,
};

const MainStack = () => {
  const {t} = useTranslation();
  return (
    <Stack.Navigator
      screenOptions={defaultScreenOptions}
      initialRouteName={RoutePaths.Splash}
      style={{backgroundColor: 'white'}}>
      <Stack.Screen
        name={RoutePaths.home}
        component={BottomTabNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={RoutePaths.courses}
        component={FrontDashboardCourse}
        options={{
          headerShown: true,
          header: props => {
            return (
              <CommonHeader
                title={t('common.courses')}
                withBackBtn
                {...props}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name={RoutePaths.courseDetails}
        component={CourseDetail}
        options={{
          headerShown: true,
          header: props => {
            return <CommonHeader title={''} withBackBtn {...props} />;
          },
        }}
      />
      <Stack.Screen
        name={RoutePaths.courseFullDetails}
        component={CourseFullDetails}
        options={{
          headerShown: true,
          header: props => {
            return <CommonHeader title={''} withBackBtn {...props} />;
          },
        }}
      />
      <Stack.Screen
        name={RoutePaths.search}
        component={Search}
        options={{
          headerShown: true,
          header: props => {
            return (
              <CommonHeader title={t('common.search')} withBackBtn {...props} />
            );
          },
        }}
      />

      <Stack.Screen
        name={RoutePaths.aboutUs}
        component={AboutUs}
        options={{
          headerShown: true,
          header: props => {
            return (
              <CommonHeader title={t('routes.about')} withBackBtn {...props} />
            );
          },
        }}
      />
      <Stack.Screen
        name={RoutePaths.privacyPolicy}
        component={PrivacyPolicy}
        options={{
          headerShown: true,
          header: props => {
            return <CommonHeader title={''} withBackBtn {...props} />;
          },
        }}
      />
      <Stack.Screen
        name={RoutePaths.termsAndConditions}
        component={TermsAndConditions}
        options={{
          headerShown: true,
          header: props => {
            return <CommonHeader title={''} withBackBtn {...props} />;
          },
        }}
      />
      <Stack.Screen
        name={RoutePaths.myAddresses}
        component={MyAddresses}
        options={{
          headerShown: true,
          header: props => {
            return <CommonHeader title={''} withBackBtn {...props} />;
          },
        }}
      />

      <Stack.Screen
        name={RoutePaths.faq}
        component={FAQ}
        options={{
          headerShown: true,
          header: props => {
            return (
              <CommonHeader title={t('routes.faq')} withBackBtn {...props} />
            );
          },
        }}
      />

      {/* Checkout Screen  */}
      <Stack.Screen
        name={RoutePaths.checkout}
        component={Checkout}
        options={{
          headerShown: true,
          header: props => {
            return (
              <CommonHeader
                title={t('common.checkout')}
                withBackBtn
                {...props}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name={RoutePaths.cart}
        component={Cart}
        options={{
          headerShown: true,
          header: props => {
            return (
              <CommonHeader title={t('common.cart')} withBackBtn {...props} />
            );
          },
        }}
      />
      <Stack.Screen
        name={RoutePaths.checkoutProceed}
        component={CheckoutProceed}
        options={{
          headerShown: true,
          header: props => {
            return (
              <CommonHeader
                withBackBtn
                {...props}
                title={t('common.checkout')}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name={RoutePaths.paymentGateway}
        component={PaymentGateway}
        options={{
          headerShown: true,
          header: props => {
            return (
              <CommonHeader withBackBtn {...props} title={'Payment Page'} />
            );
          },
        }}
      />
      <Stack.Screen
        name={RoutePaths.Notification}
        component={Notification}
        options={{
          headerShown: true,
          header: props => {
            return (
              <CommonHeader
                withBackBtn
                {...props}
                title={t('common.notifications')}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name={RoutePaths.InstructorChat}
        component={InstructorChat}
        options={{
          headerShown: true,
          header: props => {
            return <CommonHeader withBackBtn {...props} title={''} />;
          },
        }}
      />
      <Stack.Screen
        name={RoutePaths.createCourse}
        component={InstructorCreateCourse}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={RoutePaths.profileRecentOrder}
        component={ProfileRecentOrder}
        options={{
          headerShown: true,
          header: props => {
            return (
              <CommonHeader
                withBackBtn
                {...props}
                title={t('common.recentOrders')}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name={RoutePaths.pdfView}
        component={PDFView}
        options={{
          headerShown: true,
          header: props => {
            return <CommonHeader withBackBtn {...props} title={''} />;
          },
        }}
      />
      <Stack.Screen
        name={RoutePaths.quizView}
        component={QuizView}
        options={{
          headerShown: true,
          header: props => {
            return <CommonHeader withBackBtn {...props} title={''} />;
          },
        }}
      />

      {/* Startup Screens */}
      <Stack.Screen name={RoutePaths.Splash} component={Splash1} />
      <Stack.Screen name={RoutePaths.Onboarding} component={OnboardingScreen} />
      <Stack.Screen
        name="AddAddress"
        component={AddAddress}
        options={{
          headerShown: true,
          header: props => {
            return (
              <CommonHeader
                withBackBtn
                {...props}
                title={t('checkout.add_address')}
              />
            );
          },
        }}
      />

      {/* Auth Screens */}
      <Stack.Screen name={RoutePaths.login} component={Login} />
      <Stack.Screen
        name={RoutePaths.changePassword}
        component={ChangePassword}
      />
      <Stack.Screen
        name={RoutePaths.register}
        component={Register}
        initialParams={{
          type: appConstants.Student,
        }}
      />
      <Stack.Screen name={RoutePaths.otp} component={Otp} />
      <Stack.Screen
        name={RoutePaths.forgotPassword}
        component={ForgotPassword}
      />
      <Stack.Screen
        name={RoutePaths.videoPlayerScreen}
        component={VideoPlayerScreen}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Group
        screenOptions={{
          presentation: 'fullScreenModal',
        }}>
        <Stack.Screen
          name={RoutePaths.videoPlayerScreen}
          component={VideoPlayerScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Group> */}
    </Stack.Navigator>
  );
};

export default MainStack;
