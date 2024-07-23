import {useCallback, useEffect, useState} from 'react';
import {getDashboardTestimonials} from '../services/dashboard';

const useTestimonials = () => {
  const [isLoading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState([]);

  const initHandler = useCallback(async () => {
    try {
      const testimonialsRes = await getDashboardTestimonials();
      setTestimonials(testimonialsRes.data?.data);
    } catch (err) {
      console.log('[useTestimonials - initHandler] Error : ', err?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initHandler();
  }, [initHandler]);

  return {
    isLoading,
    testimonials,
  };
};

export default useTestimonials;
