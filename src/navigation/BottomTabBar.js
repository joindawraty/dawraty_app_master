import React, {memo, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomActionButton from '../components/CustomActionButton';

// ** Default Screens
import FrontDashboard from '../Screens/Dashboard/FrontDashboard/FrontDashboard';
import Search from '../Screens/Dashboard/FrontDashboard/Search';
import Profile from '../Screens/Dashboard/FrontDashboard/Profile';

// ** Instructor Screens
import InstructorCourses from '../Instructor/InstructorScreen/InstructorCourse/InstructorCourses';
import InstructorDashboard from '../Instructor/InstructorScreen/InstructorDashboard/InstructorDashboard';
import Wishlist from '../Screens/Wishlist/Wishlist';

// ** Student Screens
import MyCourses from '../Screens/Course/Course';
import Flashcards from '../Screens/Flashcards/Flashcards';

// Components
import TabBarButton from '../components/BottomTabBarBtn';

// Misc
import CommonHeader from '../components/CommonHeader';
import Instructor from '../Screens/Instructor/Instructor';
import {appConstants} from '../constants';
import RoutePaths from '../util/RoutePaths';

import {useDispatch, useSelector} from 'react-redux';
import {
  getCartCountService,
  getCartItemsRequest,
} from '../redux/actions/cartActions';
import {useTranslation} from 'react-i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Login from '../Screens/Auth/Login';
import {View} from 'react-native';

const Tab = createBottomTabNavigator();

const tabScreenOptions = (title, iconName, {navigation}) => {
  return {
    tabBarButton: ({onPress}) => {
      return (
        <TabBarButton
          title={title}
          focused={navigation.isFocused()}
          onPress={onPress}
          iconName={iconName}
        />
      );
    },
  };
};

const bottomTabScreenOptions = {
  lazy: true,
  header: props => <CommonHeader {...props} />,
  tabBarStyle: {height: 75},
};

const BottomTabNavigation = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const userData = useSelector(state => state.user?.userData);

  useEffect(() => {
    if (userData && userData?.user?.type === appConstants.Student) {
      dispatch(getCartItemsRequest());
      dispatch(getCartCountService());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tab.Navigator
      initialRouteName={!userData ? RoutePaths.login : RoutePaths.dashboard}
      screenOptions={bottomTabScreenOptions}>
      {userData &&
      userData.user &&
      userData.user?.type === appConstants.Student ? (
        <>
          <Tab.Screen
            name={RoutePaths.dashboard}
            component={FrontDashboard}
            options={tabScreenOptions.bind(
              null,
              t('common.myDashboard'),
              'home-outline',
            )}
          />

          <Tab.Screen
            name="ActionButton"
            component={() => null}
            options={{
              tabBarButton: () => (
                <View
                  style={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {/* calling the custom button to display */}
                  <CustomActionButton />
                </View>
              ),
            }}
          />

          <Tab.Screen
            name="MyCourses"
            component={MyCourses}
            options={{tabBarButton: () => null}}
          />
          <Tab.Screen
            name="Instructor"
            component={Instructor}
            options={{
              tabBarButton: () => null, // Hiding the Instructor tab from the bottom tab bar
            }}
          />
          <Tab.Screen
            name="Wishlist"
            component={Wishlist}
            options={{
              tabBarButton: () => null, // Hiding the Wishlist tab from the bottom tab bar
            }}
          />
          <Tab.Screen
            name="Flashcards"
            component={Flashcards}
            options={{tabBarButton: () => null}}
          />
        </>
      ) : userData &&
        userData.user &&
        userData.user?.type === appConstants.Instructor ? (
        <>
          <Tab.Screen
            name={RoutePaths.dashboard}
            component={InstructorDashboard}
            options={tabScreenOptions.bind(
              null,
              t('common.myDashboard'),
              'home-outline',
            )}
          />
          <Tab.Screen
            name={RoutePaths.student}
            component={Instructor}
            options={({navigation}) => {
              return {
                ...tabScreenOptions(t('common.myStudents'), 'people-outline', {
                  navigation,
                }),
                header: props => (
                  <CommonHeader title={t('common.myStudents')} {...props} />
                ),
              };
            }}
          />
          <Tab.Screen
            name={RoutePaths.myCourses}
            component={InstructorCourses}
            options={({navigation}) => {
              return {
                ...tabScreenOptions(
                  t('common.courses'),
                  'play-circle-outline',
                  {
                    navigation,
                  },
                ),
                header: props => (
                  <CommonHeader title={t('common.myCourses')} {...props} />
                ),
              };
            }}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name={RoutePaths.dashboard}
            component={FrontDashboard}
            options={tabScreenOptions.bind(
              null,
              t('common.myDashboard'),
              'home-outline',
            )}
          />
          <Tab.Screen
            name={t('common.search')}
            component={Search}
            options={tabScreenOptions.bind(
              null,
              t('common.search'),
              'search-outline',
            )}
          />
        </>
      )}

      {userData && userData.user ? (
        <Tab.Screen
          name={RoutePaths.myAccount}
          component={Profile}
          options={({navigation}) => ({
            ...tabScreenOptions(
              userData && userData?.user
                ? t('common.myProfile')
                : t('common.login'),
              'person-circle-outline',
              {navigation},
            ),
            header: props => (
              <CommonHeader title={t('common.myProfile')} {...props} />
            ),
          })}
        />
      ) : (
        <Tab.Screen
          name={RoutePaths.login}
          component={Login}
          options={({navigation}) => ({
            ...tabScreenOptions(
              userData && userData?.user
                ? t('common.myProfile')
                : t('common.login'),
              'person-circle-outline',
              {navigation},
            ),
            tabBarStyle: {display: 'none'},
          })}
        />
      )}
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
