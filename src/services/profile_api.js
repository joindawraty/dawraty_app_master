import axios from '../../axiosSetup';
import {
  GET_INCOME_HISTORY,
  GET_INSTRUCTOR_DASHBOARD,
  GET_INSTRUCTOR_SALES,
  GET_PAYMENTS,
  GET_STUDENT_ORDERS,
  GET_CREDIT,
} from './API_URI';

export const getIncomeHistory = async () => {
  return await axios.get(GET_INCOME_HISTORY);
};

export const getPaymentHistory = async () => {
  return await axios.get(GET_PAYMENTS);
};

export const getStudentOrders = async () => {
  return await axios.get(GET_STUDENT_ORDERS);
};

export const getInstructorDashboard = async pageNo => {
  return await axios.get(GET_INSTRUCTOR_DASHBOARD);
};

export const getInstructorSales = async pageNo => {
  return await axios.get(GET_INSTRUCTOR_SALES + '?page=' + pageNo);
};

export const getStudentCredit = async id => {
  const resp = axios.get(GET_CREDIT.replace(':id', id));
  return resp;
};
