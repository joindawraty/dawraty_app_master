import {useCallback} from 'react';
import {addToWishList, removeWishList} from '../services/wishlist_api';

const useWishlist = () => {
  const onRemoveWishlist = useCallback(async id => {
    try {
      const response = await removeWishList(id);
      return response;
    } catch (err) {
      console.log(
        '[onRemoveWishlist] Error : ',
        err?.response?.data?.message ?? err?.message,
      );
      return null;
    }
  }, []);

  const onAddToWishlist = useCallback(async course_id => {
    try {
      const response = await addToWishList({
        course_id: course_id,
      });
      return response;
    } catch (err) {
      console.log(
        '[onAddToWishlist] Error : ',
        err?.response?.data?.message ?? err?.message,
      );
      return null;
    }
  }, []);

  return {onRemoveWishlist, onAddToWishlist};
};

export default useWishlist;
