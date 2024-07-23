import axios from '../../../axiosSetup';
import {
  ADD_CART,
  ADD_CART_BULK,
  DELETE_CART,
  GET_CART,
  GET_CART_COUNT,
} from '../API_URI';

export const getCartService = async () => {
  return await axios.get(GET_CART);
};

export const getCartCountService = async () => {
  return await axios.get(GET_CART_COUNT);
};

export const addItemToCartService = async payload => {
  return await axios.post(ADD_CART, payload);
};

export const addBulkItemToCartService = async courseIds => {
  return await axios.post(ADD_CART_BULK, {
    courses: courseIds,
  });
};

export const deleteCartItemService = async courseId => {
  return await axios.delete(`${DELETE_CART}/${courseId}`);
};

export const deleteCartChapterItemService = async (courseId, chapterId) => {
  return await axios.delete(`${DELETE_CART}/${courseId}?chapter=${chapterId}`);
};
