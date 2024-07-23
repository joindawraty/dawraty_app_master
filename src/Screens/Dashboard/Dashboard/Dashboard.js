// export default Login
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'native-base';
import color from '../../../components/color';

import StudentComponent from '../../../components/FrontDashComponent/StudentComponent';
import LetsContinueComponent from '../../../components/Dashboard/LetContinueComponent';
import BannerSlider from '../../../components/BannerSlider';
import MetropolisSemiBoldText from '../../../components/Text/MetropolisSemiBoldText';
import SearchBarButton from '../../../components/SearchBarButton';
import RoutePaths from '../../../util/RoutePaths';

// import {GET_COURSES_START} from '../../../redux/_ActionsType';

const HorizontalHeadingRow = props => {
  const {title, btnText, onPress, containerStyle} = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
        ...containerStyle,
      }}>
      <MetropolisSemiBoldText style={{color: color.blue, fontSize: 16}}>
        {title}
      </MetropolisSemiBoldText>
      <TouchableOpacity onPress={onPress}>
        <MetropolisSemiBoldText style={{color: color.skyBlue}}>
          {btnText}
        </MetropolisSemiBoldText>
      </TouchableOpacity>
    </View>
  );
};

function Dashboard(props) {
  const navigation = useNavigation();

  return (
    <ScrollView style={{flex: 1, backgroundColor: color.white}}>
      <SearchBarButton style={{marginHorizontal: 15}} />
      <View style={{marginLeft: 15, marginTop: 15}}>
        <BannerSlider style={{marginTop: 0, alignSelf: 'center'}} />
      </View>
      <StudentComponent />
      {/* <HorizontalHeadingRow
        title={'Lets Continue'}
        btnText={'See all'}
        onPress={() => navigation.navigate(RoutePaths.courses)}
      />
      <LetsContinueComponent /> */}
      {/* <HorizontalHeadingRow
        title={'Learn Next'}
        btnText={'See all'}
        onPress={() => navigation.navigate('Course')}
        containerStyle={{
          marginBottom: 15,
        }}
      /> */}
    </ScrollView>
  );
}
// const mapStateToProps = state => ({
//   error: state.LoginReducer.error,
//   courses: state.UserReducer.courses,
//   loading: state.LoaderReducer.loader,
// });

// const mapDispatchToProps = () => ({});

export default Dashboard;
