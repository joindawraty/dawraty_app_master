import {useCallback, useEffect, useState} from 'react';
import {getBanners} from '../services/dashboard';

const useBanners = () => {
  const [isLoading, setLoading] = useState(true);
  const [banners, setBanners] = useState([]);

  const initHandler = useCallback(async () => {
    try {
      const bannersRes = await getBanners();
      setBanners(bannersRes.data?.data);
    } catch (err) {
      console.log('[useBanners - initHandler] Error : ', err?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initHandler();
  }, [initHandler]);

  return {
    isLoading,
    banners,
  };
};

export default useBanners;
