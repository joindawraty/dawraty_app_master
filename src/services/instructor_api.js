import axios from '../../axiosSetup';
import {
  DOS_USER_INSTRUCTOR,
  DOS_USER_STUDENT,
  GET_COURSE_INSTRUCTOR,
} from './API_URI';

export const getStudentInstructors = async page => {
  return await axios.get(DOS_USER_INSTRUCTOR + '?page=' + page);
};

export const getInstructorStudents = async page => {
  return await axios.get(DOS_USER_STUDENT + '?page=' + page);
};

export const getInstructorCourses = async page => {
  return await axios.get(GET_COURSE_INSTRUCTOR);
};
