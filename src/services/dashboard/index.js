import axios from '../../../axiosSetup';
import {store} from '../../redux/store';
import {
  GET_BANNERS,
  GET_CATEGORIES,
  GET_CATEGORY_COURSES,
  GET_COURSES,
  GET_TAGS,
  GET_TESTIMONIALS,
} from '../API_URI';

export const getBanners = async () => {
  return await axios.get(GET_BANNERS);
};

export const getCategories = async () => {
  return await axios.get(GET_CATEGORIES);
};

export const getTags = async () => {
  return await axios.get(GET_TAGS);
};

export const getDashboardCourses = async (
  tagId = null,
  page = 1,
  search = '',
) => {
  const requestPayload = {};

  if (search && search.trim().length) {
    requestPayload.search = search.trim();
  }
  if (tagId) {
    requestPayload.tag_id = tagId;
  }
  const auth = store.getState()?.user?.userData?.user;
  if (auth?.country_id) {
    requestPayload.countryId = auth.country_id;
  } else if (!auth) {
    requestPayload.countryId = 112;
  }

  if (auth?.auth_id) {
    requestPayload.auth = auth.auth_id;
  }

  requestPayload.page = page;

  return await axios.get(GET_COURSES, {
    params: requestPayload,
  });
};

export const getCategoryCourses = async (
  tagId = null,
  page = 1,
  search = '',
) => {
  const requestPayload = {};

  const auth = store.getState()?.user?.userData?.user;
  if (auth?.country_id) {
    requestPayload.countryId = auth.country_id;
  } else if (!auth) {
    requestPayload.countryId = 112;
  }

  var url =
    GET_CATEGORY_COURSES + tagId + '?countryId=' + requestPayload.countryId;

  if (auth?.auth_id) {
    url += '&auth=' + auth.auth_id;
  }
  if (search && search.trim().length) {
    url += '&search=' + search.trim();
  }

  return await axios.get(url);
};

export const getDashboardTestimonials = async () => {
  return await axios.get(GET_TESTIMONIALS);
};
