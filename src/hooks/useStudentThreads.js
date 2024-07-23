import {useCallback, useEffect, useState} from 'react';
import {getStudentThreads} from '../services/course';

const useStudentThreads = () => {
  const [isLoading, setLoading] = useState(true);
  const [threads, setThreads] = useState([]);

  const initHandler = useCallback(async () => {
    try {
      const studentThreadsRes = await getStudentThreads();
      setThreads(studentThreadsRes.data?.data);
    } catch (err) {
      console.log(
        '[useStudentThreads - initHandler] Error : ',
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
    threads,
    refresh: initHandler,
  };
};

export default useStudentThreads;
