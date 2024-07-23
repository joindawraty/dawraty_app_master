import {useCallback, useEffect, useState} from 'react';
import {getCategories} from '../services/dashboard';

const useCategories = () => {
  const [isLoading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const initHandler = useCallback(async () => {
    try {
      const categoriesRes = await getCategories();
      setCategories(categoriesRes.data?.data);
    } catch (err) {
      console.log('[useCategories - initHandler] Error : ', err?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initHandler();
  }, [initHandler]);

  return {
    isLoading,
    categories,
  };
};

export default useCategories;
