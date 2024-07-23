import axios from '../../axiosSetup';
import {store} from '../redux/store';
import {
  GET_COURSE,
  GET_COURSES,
  GET_INSTRUCTOR_COURSES,
  GET_STUDENT_COURSES,
  GET_STUDENT_THREADS,
  GET_FLASHCARDS
} from './API_URI';

export const getCourseDetails = async id => {
  let url = GET_COURSE.replace(':id', id);
  const userData = store.getState()?.user?.userData;
  if (userData) {
    url += '?auth=' + userData?.user?.auth_id;
  }
  return await axios.get(url);
};

export const getStudentThreads = async id => {
  var url = GET_STUDENT_THREADS;
  const userData = store.getState()?.user?.userData;
  const userID = userData.user.id

  url += '/' + userID;
  
  return await axios.get(url)
}

export const getFlashcards = async() => {
  var url = GET_FLASHCARDS

  return await axios.get(url)
}

export const getStudentCourses = async id => {
  var url = GET_STUDENT_COURSES;
  if (id) {
    url += '/' + id;
  }
  return await axios.get(url);
};

export const getInstructorCourses = async id => {
  var url = GET_INSTRUCTOR_COURSES;
  if (id) {
    url += '/' + id;
  }
  return await axios.get(url);
};

export const getSearchCourses = async (serachText = '') => {
  var url = GET_COURSES;
  if (serachText != '') {
    url += '?search=' + serachText;
  }
  const userData = store.getState()?.user?.userData;
  if (!userData) {
    url += '&countryId=112';
  } else {
    url += '&auth=' + userData?.user?.auth_id;
  }
  return await axios.get(url);
};

export const updateThreads = async payload => {
  const userData = store.getState()?.user?.userData;
  const userID = userData.user.id

  return await axios.put(`api/auth/threads/${userID}`, payload)
}

export const lessonCompletionUpdate = async payload => {
  return await axios.post('api/auth/lessonUpdates', payload);
};

export const checkQuestion = async payload => {
  return await axios.post('api/auth/studentQuiz', payload);
};

export const getResult = async id => {
  return await axios.get(`api/auth/studentQuiz?lesson_quiz=${id}`);
};
