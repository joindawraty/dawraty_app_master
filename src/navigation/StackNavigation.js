import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Splash1 from '../Screens/Splash/Splash1';

import Login from '../Screens/Auth/Login';
import Register from '../Screens/Auth/Register';
import Otp from '../Screens/Auth/Otp';

import FrontDashboard from '../Screens/Dashboard/FrontDashboard/FrontDashboard';
import Search from '../Screens/Dashboard/FrontDashboard/Search';
import Profile from '../Screens/Dashboard/FrontDashboard/Profile';
import ForgotPassword from '../Screens/Auth/ForgotPassword';
import Dashboard from '../Screens/Dashboard/Dashboard/Dashboard';
import Instructor from '../Screens/Instructor/Instructor';
import Course from '../Screens/Course/Course';
import Wishlist from '../Screens/Wishlist/Wishlist';
import ProfileDashboard from '../Screens/Profile/Profile';
import Cart from '../Screens/Cart/Cart';
import Checkout from '../Screens/Cart/Checkout';
import CheckoutProceed from '../Screens/Cart/CheckoutProceed';
import CourseDetail from '../Screens/Course/CourseDetail';
// import LetsContinueCourseDetail from '../Screens/Dashboard/Dashboard/LetsContinueCourseDetail';
import TeacherRegister from '../Screens/Auth/TeacherRegister';
import Notification from '../Screens/Notification/Notification';
import FrontDashboardCourse from '../Screens/Course/FrontDashboardCourse';
import InstructorDashboard from '../Instructor/InstructorScreen/InstructorDashboard/InstructorDashboard';
import InstructorNotification from '../Instructor/InstructorScreen/InstructorNotification';
import InstructorProfile from '../Instructor/InstructorScreen/InstructorProfile';
import InstructorCourse from '../Instructor/InstructorScreen/InstructorCourse.js/InstructorCourse';
import CreateCourse from '../Instructor/InstructorScreen/InstructorCourse.js/CreateCourse';
import Student from '../Instructor/InstructorScreen/InstructorStudent/Student';
import InstructorChat from '../Screens/Instructor/InstructorChat';
import OnboardingScreen from '../Screens/Splash/OnboardingScreen';
import RoutePaths from '../util/RoutePaths';

const Stack = createNativeStackNavigator();

export default function createHomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerMode: 'screen',
      }}>
      <Stack.Screen name="Splash1" component={Splash1} />
      <Stack.Screen
        name={RoutePaths.OnboardingScreen}
        component={OnboardingScreen}
      />

      <Stack.Screen name="FrontDashboard" component={FrontDashboard} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="CheckoutProceed" component={CheckoutProceed} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="instructor" component={Instructor} />

      <Stack.Screen name="instructorChat" component={InstructorChat} />
      <Stack.Screen name="Course" component={Course} />
      {/* <Stack.Screen
        name="LetsContinueCourseDetail"
        component={LetsContinueCourseDetail}
      /> */}
      <Stack.Screen name="CourseDetail" component={CourseDetail} />
      <Stack.Screen name="Wishlist" component={Wishlist} />
      <Stack.Screen name="ProfileDashboard" component={ProfileDashboard} />
      <Stack.Screen name="TeacherRegister" component={TeacherRegister} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen
        name="FrontDashboardCourse"
        component={FrontDashboardCourse}
      />
      <Stack.Screen
        name="InstructorDashboard"
        component={InstructorDashboard}
      />
      <Stack.Screen name="InstructorProfile" component={InstructorProfile} />
      <Stack.Screen name="InstructorCourse" component={InstructorCourse} />
      <Stack.Screen
        name="InstructorNotification"
        component={InstructorNotification}
      />
      <Stack.Screen name="CreateCourse" component={CreateCourse} />
      <Stack.Screen name="Student" component={Student} />
    </Stack.Navigator>
  );
}
