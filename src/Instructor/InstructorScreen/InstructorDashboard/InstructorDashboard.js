import React, {useEffect, useState} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';

import RecentCourses from '../../InstructorComponent/RecentCoourses';
import MetropolisSemiBoldText from '../../../components/Text/MetropolisSemiBoldText';
import InstructorDashboardInfoCard from '../../../components/InstructorDashboardInfoCard';
import {RecentOrders} from '../../../Screens/Dashboard/FrontDashboard/Profile';
import InstructorDashboardSummaryCard from '../../../components/InstructorDashboardSummaryCard';
import {getInstructorDashboard} from '../../../services/profile_api';
import color from '../../../components/color';

const InstructorDashboard = Props => {
  const navigation = useNavigation();

  const {t} = useTranslation();

  const [dashboardData, setDashboardData] = useState(null);

  const getInstructorOrders = async () => {
    try {
      const response = await getInstructorDashboard(1);
      if (response && response.data && response.data.success) {
        setDashboardData(response.data?.data);
      }
    } catch (err) {
      console.log(
        '[getInstructorOrders] Error : ',
        err?.response?.data?.message ?? err?.message,
      );
    }
  };

  useEffect(() => {
    getInstructorOrders();
  }, []);

  return (
    <ScrollView
      style={styles.scrollViewStyle}
      contentContainerStyle={styles.scrollViewContentContainer}>
      <MetropolisSemiBoldText style={styles.titleText}>
        {t('common.myDashboard')}
      </MetropolisSemiBoldText>
      <View style={styles.container}>
        <View style={styles.infoCardsContainer}>
          <InstructorDashboardInfoCard
            text={t('common.myCourses')}
            iconName={'tv-outline'}
            count={dashboardData?.courses_assisted_count ?? '0'}
          />
          <InstructorDashboardInfoCard
            text={t('common.myStudents')}
            iconName={'people-outline'}
            count={dashboardData?.total_students_count ?? '0'}
          />
          <InstructorDashboardInfoCard
            text={t('common.Questions')}
            iconName={'chatbubbles-outline'}
            count={dashboardData?.questions_count ?? '0'}
          />
        </View>
      </View>
      <View
        style={{
          marginHorizontal: 16,
          backgroundColor: color.greyNew,
          marginBottom: 14,
          padding: 10,
          borderRadius: 10,
          paddingHorizontal: 15,
        }}>
        <RecentOrders
          navigation={navigation}
          data={dashboardData?.recent_orders ?? []}
        />
      </View>
      <View
        style={{
          marginHorizontal: 16,
          paddingHorizontal: 15,
          paddingTop: 25,
          paddingBottom: 15,
          borderRadius: 10,
          backgroundColor: color.greyNew,
          marginBottom: 15,
        }}>
        <RecentCourses data={dashboardData?.recent_courses_assisted ?? []} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewStyle: {
    flex: 1,
  },
  scrollViewContentContainer: {
    flexGrow: 1,
    backgroundColor: color.white,
  },
  titleText: {
    color: color.blue,
    fontSize: 18,
    marginTop: 10,
    marginBottom: 15,
    marginHorizontal: 15,
  },
  container: {
    // flex: 1,
    marginLeft: 15,
  },
  infoCardsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
});

export default InstructorDashboard;
