import {useCallback, useEffect, useState} from 'react';
import {getFlashcards} from '../services/course';

const useFlashcards = () => {
  const [isLoading, setLoading] = useState(true);
  const [flashcards, setFlashcards] = useState([]);

  const initHandler = useCallback(async () => {
    try {
      const flashcardsRes = await getFlashcards();
      setFlashcards(flashcardsRes.data?.data);
    } catch (err) {
      console.log(
        '[useFlashcards - initHandler] Error : ',
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
    flashcards,
    refresh: initHandler,
  };
};

export default useFlashcards;
