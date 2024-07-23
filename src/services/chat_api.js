import axios from '../../axiosSetup';
import {GET_USER_COMMENTS, POST_USER_COMMENT} from './API_URI';

export const getComments = async id => {
  return await axios.get(GET_USER_COMMENTS.replace(':id', id));
};

export const postComment = async (id, payload) => {
  return await axios.post(POST_USER_COMMENT.replace(':id', id), payload);
};
