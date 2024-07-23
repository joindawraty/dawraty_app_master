import {useCallback, useEffect, useState} from 'react';
import {getDashboardCourses} from '../services/dashboard';

const useCourses = () => {
  const [isLoading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  const initHandler = useCallback(async () => {
    try {
      const coursesRes = await getDashboardCourses();
      setCourses(
        coursesRes.data?.data?.data?.length ? coursesRes.data?.data?.data : [],
      );
    } catch (err) {
      console.log(
        '[useCourses - initHandler] Error : ',
        err?.response?.data ?? err?.message,
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const updateWishlistData = (course, isWishList) => {
    const data = [...courses];
    const index = data.findIndex(item => item.id == course.id);
    data[index].is_wishlist = isWishList;
    setCourses(data);
  };

  useEffect(() => {
    initHandler();
  }, [initHandler]);

  return {
    isLoading,
    courses,
    updateWishlistData,
  };
};

export default useCourses;
