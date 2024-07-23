import axios from '../../axiosSetup';
import {
  ADD_ADDRESSES,
  CHECKOUT_ORDERS,
  GET_ADDRESSES,
  GET_CHECKOUT_PRODUCTS,
  GET_COUNTRIES,
  PROMO_CODE,
  APPLE_IAP_PURCHASE,
} from './API_URI';

export const addAddressAPI = async payload => {
  return await axios.post(ADD_ADDRESSES, payload);
};

export const getAddressesAPI = async () => {
  return await axios.get(GET_ADDRESSES);
};

export const getCoutriesAPI = async () => {
  return await axios.get(GET_COUNTRIES);
};

export const getCheckoutProductsAPI = async () => {
  return await axios.get(GET_CHECKOUT_PRODUCTS);
};

export const checkoutOrdersAPI = async payload => {
  return await axios.post(CHECKOUT_ORDERS + '?get_by=payment', payload);
};

export const processAppleIAP = async payload => {
  return await axios.post(APPLE_IAP_PURCHASE, payload);
};

export const applyPromoCodeAPI = async payload => {
  return await axios.post(PROMO_CODE, payload);
};
