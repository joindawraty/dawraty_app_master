// export default Login
import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';
import {ScrollView} from 'native-base';
import {CommonActions, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import MetropolisMediumText from '../../../components/Text/MetropolisMediumText';
import MetropolisSemiBoldText from '../../../components/Text/MetropolisSemiBoldText';
import ProfileInfo from '../../../components/ProfileComponent/Profileinfo';

import color from '../../../components/color';
import {appConstants} from '../../../constants';
import SmallRoundedBtn from '../../../components/SmallRoundedButton';
import TableComponent from '../../../components/TableComponent';
import RoutePaths from '../../../util/RoutePaths';
import MetropolisBoldText from '../../../components/Text/MetropolisBoldText';
import {useDispatch, useSelector} from 'react-redux';
import {authActions} from '../../../redux/actions';
import {useLoading} from '../../../context/Loading/LoadingContext';
import {
  getIncomeHistory,
  getInstructorSales,
  getStudentOrders,
} from '../../../services/profile_api';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import {getTranslationFromMany} from '../../../util/misc';

const ProfileSupportItem = props => {
  const {text, onPress} = props;
  const {i18n} = useTranslation();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 5,
        marginBottom: 10,
      }}>
      <MetropolisMediumText style={{color: color.black, fontSize: 15}}>
        {text}
      </MetropolisMediumText>
      <Icon
        style={{
          transform: [
            {
              scaleX: i18n.language !== 'en' ? -1 : 1,
            },
          ],
        }}
        name={'chevron-forward-outline'}
        size={20}
      />
    </TouchableOpacity>
  );
};

const BasicProfileDetails = props => {
  const {data} = props;
  const {t} = useTranslation();

  const newData = data.map(item => {
    return {
      ...item,
      date: moment(item.created_at).format('DD/MM/YY'),
      courseName: t('dynamic', {
        en: item?.courses?.name,
        ar: getTranslationFromMany(
          item?.courses?.translation,
          'name',
          item?.courses?.name,
        ),
      }),
      amount:
        item?.courses?.country_id === 112
          ? t('course.price_in_kd', {
              price: +item.amount,
            })
          : t('course.price_in_bd', {
              price: +item.amount,
            }),
      transactionStatus:
        item.status === 'CAPTURED'
          ? t('common.successful')
          : t('common.failed'),
    };
  });
  return (
    <SafeAreaView style={{flex: 1}}>
      <MetropolisMediumText
        style={{color: color.blue, fontSize: 16, marginBottom: 15}}>
        {t('common.ordersHistory')}
      </MetropolisMediumText>
      <TableComponent
        headings={[
          t('common.date'),
          t('common.courseName'),
          t('common.amount'),
          t('common.transactionStatus'),
        ]}
        size={[40, 40, 40, 40]}
        shadow
        keys={['date', 'courseName', 'amount', 'transactionStatus']}
        alignment={['left', 'left', 'center', 'center']}
        data={newData}
      />
    </SafeAreaView>
  );
};

export const RecentOrders = props => {
  const {data, navigation} = props;

  const {t} = useTranslation();

  const newData = data.map(item => {
    return {
      ...item,
      created_at: moment(item.created_at).format('DD MMM YYYY'),
      courseName: item.course_details.name,
      amount:
        item.courses?.country_id === 112
          ? t('course.price_in_kd', {
              price: +item.amount ?? 0,
            })
          : t('course.price_in_bd', {
              price: +item.amount ?? 0,
            }),
    };
  });

  return (
    <View>
      <MetropolisMediumText
        style={{
          color: color.blue,
          fontSize: 16,
          marginBottom: 24,
          marginTop: 16,
        }}>
        {t('common.recentOrders')}
      </MetropolisMediumText>
      {newData.length ? (
        <TableComponent
          headings={[
            t('common.date'),
            t('common.amount'),
            t('common.courseName'),
          ]}
          size={[25, 25, 50]}
          keys={['created_at', 'amount', 'courseName']}
          alignment={['left', 'left', 'left']}
          data={newData}
          showViewAll
          onPressViewAll={() => {
            navigation.navigate(RoutePaths.profileRecentOrder);
          }}
        />
      ) : (
        <MetropolisSemiBoldText style={styles.noDataText}>
          {t('common.noResultFound')}
        </MetropolisSemiBoldText>
      )}
    </View>
  );
};

const InstructorProfile = props => {
  const {historyData} = props;
  const {t} = useTranslation();

  const incomeHistory = useMemo(() => {
    const newData = [];
    let totalKD = 0;

    historyData.forEach(item => {
      newData.push({
        ...item,
        amount: t('course.price_in_kd', {
          price: item.month_amount,
        }),
      });
      totalKD += item.month_amount;
    });

    return {
      data: newData,
      total: totalKD,
    };
  }, [historyData, t]);

  return (
    <View style={{flex: 1}}>
      <MetropolisMediumText style={{color: color.blue, fontSize: 16}}>
        {t('common.incomeHistory')}
      </MetropolisMediumText>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginTop: 25,
        }}>
        {incomeHistory.data.length > 0 ? (
          <TableComponent
            headings={[
              t('common.year'),
              t('common.month'),
              t('common.amount'),
              t('common.commission'),
            ]}
            size={[15, 25, 25, 35]}
            keys={['year', 'month', 'amount', 'commission_percent']}
            alignment={['center', 'center', 'center', 'center']}
            data={incomeHistory.data}
            shadow
          />
        ) : (
          <MetropolisSemiBoldText style={styles.noDataText}>
            {t('common.noResultFound')}
          </MetropolisSemiBoldText>
        )}
        {incomeHistory.data.length > 0 && (
          <View
            style={{
              flex: 0.35,
              height: 130,
              marginLeft: 10,
              backgroundColor: color.greyNew,
              alignItems: 'center',
              justifyContent: 'space-evenly',
              padding: 15,
              borderRadius: 10,
            }}>
            <MetropolisBoldText>{t('common.total')}</MetropolisBoldText>
            <Icon name="calculator" size={34} />
            <MetropolisBoldText>
              {t('course.price_in_kd', {
                price: incomeHistory.total,
              })}
            </MetropolisBoldText>
          </View>
        )}
      </View>
    </View>
  );
};

const StudentProfile = props => {
  return <BasicProfileDetails data={props.data} />;
};

const ProfileData = props => {
  const navigation = useNavigation();

  const userData = useSelector(state => state.user?.userData);

  const [historyData, setHistoryData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [instructorSales, setInstructorSales] = useState([]);

  const getHistory = async () => {
    try {
      const response = await getIncomeHistory();
      if (response && response.data && response.data.success) {
        setHistoryData(response.data.data);
      }
    } catch (err) {
      console.log(
        '[getHistory] Error : ',
        err?.response?.data?.message ?? err?.message,
      );
    }
  };

  const getOrders = async () => {
    try {
      const response = await getStudentOrders();
      if (response && response.data && response.data.success) {
        setOrderData(response.data.data);
      }
    } catch (err) {
      console.log(
        '[getOrders] Error : ',
        err?.response?.data?.message ?? err?.message,
      );
    }
  };
  const getInstructorOrders = async () => {
    try {
      const response = await getInstructorSales(1);
      if (response && response.data && response.data.success) {
        setInstructorSales(response.data.data.data);
      }
    } catch (err) {
      console.log(
        '[getInstructorOrders] Error : ',
        err?.response?.data?.message ?? err?.message,
      );
    }
  };

  useEffect(() => {
    if (userData) {
      if (userData.user?.type == appConstants.Instructor) {
        getHistory();
        getInstructorOrders();
      } else {
        getOrders();
      }
    }
  }, [userData]);

  return (
    <>
      {userData && userData?.user?.type ? (
        <ProfileInfo userData={userData} />
      ) : null}
      {userData && userData?.user?.type === appConstants.Instructor ? (
        <InstructorProfile historyData={historyData} />
      ) : userData && userData?.user?.type === appConstants.Student ? (
        <StudentProfile data={orderData} />
      ) : null}
      {userData && userData?.user?.type === appConstants.Instructor && (
        <RecentOrders navigation={navigation} data={instructorSales} />
      )}
    </>
  );
};

function Profile(props) {
  const navigation = useNavigation();
  const {t} = useTranslation();

  const userData = useSelector(state => state.user?.userData);
  const dispatch = useDispatch();

  const {setIsLoading} = useLoading();

  const onLogoutConfirm = async () => {
    try {
      setIsLoading(true);
      await dispatch(authActions.logoutRequest());
      setIsLoading(false);
      navigation.navigate(RoutePaths.login);
    } catch (err) {
      console.log('[onLogoutConfirm] Error : ', err?.message);
    }
  };

  const onDeleteConfirm = async () => {
    try {
      setIsLoading(true);
      await dispatch(authActions.deleteMeRequest());
      setIsLoading(false);
      navigation.navigate(RoutePaths.login);
    } catch (err) {
      console.log('[onDeleteConfirm] Error: ', err?.message);
    }
  };

  const onLoginBtnPress = async () => {
    if (userData && userData.user?.type) {
      Alert.alert(t('common.logout'), t('common.logoutDesc'), [
        {
          text: t('common.cancel'),
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: t('common.logout'),
          onPress: onLogoutConfirm,
          style: 'destructive',
        },
      ]);
    } else {
      navigation.navigate(RoutePaths.login);
    }
  };

  const onDeleteAccountBtnPress = async () => {
    Alert.alert(t('common.deleteAccount'), t('common.deleteAccountDesc'), [
      {
        text: t('common.cancel'),
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: t('common.delete'),
        onPress: onDeleteConfirm,
        style: 'destructive',
      },
    ]);
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <ProfileData />
        {/* <MetropolisSemiBoldText style={styles.supportTxt}>
        {'Support'}
      </MetropolisSemiBoldText> */}
        <ProfileSupportItem
          text={t('routes.about')}
          onPress={() => {
            navigation.navigate(RoutePaths.aboutUs);
          }}
        />
        <ProfileSupportItem
          text={t('common.allCourses')}
          onPress={() => {
            navigation.navigate(RoutePaths.courses);
          }}
        />
        <ProfileSupportItem
          text={t('routes.privacyPolicy')}
          onPress={() => {
            navigation.navigate(RoutePaths.privacyPolicy);
          }}
        />
        <ProfileSupportItem
          text={t('routes.termsCondition')}
          onPress={() => {
            navigation.navigate(RoutePaths.termsAndConditions);
          }}
        />
        {/* <ProfileSupportItem
        text={t('routes.faq')}
        onPress={() => {
          navigation.navigate(RoutePaths.faq);
        }}
      /> */}
        <ProfileSupportItem
          text={t('common.deleteAccountButton')}
          onPress={onDeleteAccountBtnPress}
        />
        <ProfileSupportItem
          text={t('common.myAddresses')}
          onPress={() => {
            navigation.navigate(RoutePaths.myAddresses);
          }}
        />
        <SmallRoundedBtn
          text={
            userData && userData.user?.type
              ? t('common.logout')
              : t('common.login')
          }
          onPress={onLoginBtnPress}
          containerStyle={styles.loginBtn}
          textStyle={styles.loginBtnText}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  noDataText: {
    flex: 1,
    textAlign: 'center',
    marginVertical: 20,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: 15,
    backgroundColor: color.white,
  },
  supportTxt: {
    color: color.blue,
    fontSize: 18,
    marginBottom: 15,
  },
  loginBtn: {
    paddingHorizontal: 35,
    paddingVertical: 15,
    backgroundColor: color.blue,
    alignSelf: 'center',
    marginVertical: 15,
  },
  loginBtnText: {
    fontSize: 18,
  },
});

export default Profile;
