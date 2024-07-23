import {createAsyncThunk} from '@reduxjs/toolkit';
import {t} from 'i18next';

import {CartApis} from '../../services';
import CartItemModel from '../../model/Cart';
import {showToast, successToast} from '../../util/toastUtils';

export const addToCartRequest = createAsyncThunk(
  'addToCart',
  async (courseData, thunkAPI) => {
    try {
      const cartData = thunkAPI.getState().cart.data;
      const courseIndexInCart = cartData.findIndex(
        course => course.courses?.id === courseData.course_sale.course_id,
      );
      if (courseIndexInCart !== -1) {
        showToast(t('alertMessage.alreadyExistToCartMsg'));
        return thunkAPI.rejectWithValue('Already exist');
      }
      if (thunkAPI.getState().user?.userData) {
        await CartApis.addItemToCartService({
          course_id: courseData?.id,
        });
      }
      const payload = new CartItemModel(
        courseData.course_sale.course_id,
        courseData.name,
        courseData.course_sale.new_price,
        courseData.course_sale.old_price,
        courseData.course_image,
        courseData.instructor.first_name,
        courseData.instructor.last_name,
        courseData.translation,
        courseData.course_sale.on_sale,
        courseData.course_sale.is_free,
      );
      successToast(t('alertMessage.addToCartMsg'));
      return thunkAPI.fulfillWithValue(payload);
    } catch (err) {
      console.log('addToCartRequest : ', err?.response?.data ?? err?.message);
      return thunkAPI.rejectWithValue(err?.response?.data);
    }
  },
);

export const addCourseChapterToCartRequest = createAsyncThunk(
  'addChapterToCart',
  async (courseAndChapterPayload, thunkAPI) => {
    try {
      const {courseData, chapterData} = courseAndChapterPayload;
      if (thunkAPI.getState().user?.userData) {
        await CartApis.addItemToCartService({
          course_id: courseData.course_sale.course_id,
          chapters: [chapterData?.id],
        });
      }
      const payload = new CartItemModel(
        courseData.course_sale.course_id,
        chapterData.name,
        chapterData.price,
        chapterData.price,
        courseData.course_image,
        courseData.instructor.first_name,
        courseData.instructor.last_name,
        chapterData.translation,
        courseData.course_sale.on_sale,
        courseData.course_sale.is_free,
        [chapterData?.id],
      );
      successToast(t('alertMessage.addToCartMsg'));
      return thunkAPI.fulfillWithValue(payload);
    } catch (err) {
      console.log(
        'addCourseChapterToCartRequest : ',
        err?.response?.data ?? err?.message,
      );
      return thunkAPI.rejectWithValue(err?.response?.data);
    }
  },
);

export const getCartItemsRequest = createAsyncThunk(
  'getCartItems',
  async (payload, thunkAPI) => {
    try {
      const res = await CartApis.getCartService();
      return thunkAPI.fulfillWithValue(res);
    } catch (err) {
      console.log('getCartItemsRequest : ', err?.response?.data);
      return thunkAPI.rejectWithValue(err?.response?.data);
    }
  },
);

export const getCartCountService = createAsyncThunk(
  'getCartCount',
  async (payload, thunkAPI) => {
    try {
      const res = await CartApis.getCartCountService();
      console.log('getCartCount res : ', res.data);
      return thunkAPI.fulfillWithValue(res);
    } catch (err) {
      console.log('getCartCountService : ', err?.response?.data);
      return thunkAPI.rejectWithValue(err?.response?.data);
    }
  },
);

export const addBulkItemToCartService = createAsyncThunk(
  'addBulkItemsToCart',
  async (courseIds, thunkAPI) => {
    try {
      const res = await CartApis.addBulkItemToCartService(courseIds);
      return thunkAPI.fulfillWithValue(res);
    } catch (err) {
      console.log('addBulkItemToCartService : ', err?.response?.data);
      return thunkAPI.rejectWithValue(err?.response?.data);
    }
  },
);

export const deleteCartItemRequest = createAsyncThunk(
  'deleteCartItem',
  async (courseId, thunkAPI) => {
    try {
      if (thunkAPI.getState().user?.userData) {
        await CartApis.deleteCartItemService(courseId);
        return thunkAPI.fulfillWithValue(courseId);
      }
      return thunkAPI.fulfillWithValue(courseId);
    } catch (err) {
      console.log('deleteCartItemService : ', err?.response?.data);
      return thunkAPI.rejectWithValue(err?.response?.data);
    }
  },
);

export const deleteCartChapterItemRequest = createAsyncThunk(
  'deleteCartChapterItem',
  async (payload, thunkAPI) => {
    try {
      console.log('payload : ', payload);
      const {courseId, chapterId} = payload;
      if (thunkAPI.getState().user?.userData) {
        const res = await CartApis.deleteCartChapterItemService(
          courseId,
          chapterId,
        );
        console.log('deleteCartChapterItem res : ', res.data);
        return thunkAPI.fulfillWithValue(courseId);
      }
      return thunkAPI.fulfillWithValue(courseId);
    } catch (err) {
      console.log('deleteCartChapterItemRequest : ', err?.response?.data);
      return thunkAPI.rejectWithValue(err?.response?.data);
    }
  },
);
