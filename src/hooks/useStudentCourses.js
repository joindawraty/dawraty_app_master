import {useCallback, useEffect, useState} from 'react';
import {getStudentCourses} from '../services/course';

const useStudentCourses = () => {
  const [isLoading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  const initHandler = useCallback(async () => {
    try {
      const studentCoursesRes = await getStudentCourses();
      setCourses(studentCoursesRes.data?.data);
    } catch (err) {
      console.log(
        '[useStudentCourses - initHandler] Error : ',
        err?.response?.data?.message ?? err?.response?.data ?? err?.message,
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initHandler();
  }, [initHandler]);

  return {
    isLoading,
    courses,
    refresh: initHandler,
  };
};

export default useStudentCourses;
