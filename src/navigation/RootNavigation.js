// import {CommonActions} from '@react-navigation/native';
// import * as React from 'react';
// import {BackHandler} from 'react-native';

// export const navigationRef = React.createRef();

// export function navigate(name, params) {
//   navigationRef.current?.navigate(name, params);
// }

// export const resetRouteAndNavigate = (route, params) => {
//   navigationRef.current?.dispatch(
//     CommonActions.reset({
//       index: 0,
//       routes: [{name: route, params: params}],
//     }),
//   );
// };

// export function back() {
//   console.log(navigationRef.current?.getRootState());
//   let state = navigationRef.current?.getRootState();
//   if (state.index == 0) {
//     BackHandler.exitApp();
//   } else {
//     navigationRef.current?.goBack();
//   }
// }

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import MainStack from './MainStack';

const RootNavigation = () => {
  return (
    <NavigationContainer
      ref={ref => {
        global.navigationRef = ref;
      }}>
      <MainStack />
    </NavigationContainer>
  );
};

export default RootNavigation;
