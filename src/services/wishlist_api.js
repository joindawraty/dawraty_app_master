import axios from '../../axiosSetup';
import {DELETE_WISHLIST, WISHLIST} from './API_URI';

export const getWishList = async () => {
  return await axios.get(WISHLIST);
};

export const removeWishList = async id => {
  return await axios.delete(DELETE_WISHLIST.replace(':id', id));
};

export const addToWishList = async payload => {
  return await axios.post(WISHLIST, payload);
};
