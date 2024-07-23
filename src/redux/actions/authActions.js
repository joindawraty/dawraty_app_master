import {createAsyncThunk} from '@reduxjs/toolkit';
import {AuthApis} from '../../services';

export const loginRequest = createAsyncThunk(
  'login',
  async (loginPayload, thunkAPI) => {
    try {
      const res = await AuthApis.login(loginPayload);
      return thunkAPI.fulfillWithValue(res);
    } catch (err) {
      console.log('loginRequest : ', err?.response?.data);
      return thunkAPI.rejectWithValue(err?.response?.data);
    }
  },
);

export const logoutRequest = createAsyncThunk(
  'logout',
  async (payload, thunkAPI) => {
    try {
      const res = await AuthApis.logout(payload);
      return thunkAPI.fulfillWithValue(res);
    } catch (err) {
      console.log('logoutRequest : ', err?.response?.data);
      return thunkAPI.rejectWithValue(err?.response?.data);
    }
  },
);

export const deleteMeRequest = createAsyncThunk(
  'delete',
  async (payload, thunkAPI) => {
    try {
      const res = await AuthApis.deleteMe(payload);
      return thunkAPI.fulfillWithValue(res);
    } catch (err) {
      console.log('deleteMeRequest : ', err?.response?.data);
      return thunkAPI.rejectWithValue(err?.response?.data);
    }
  },
);

export const registerRequest = createAsyncThunk(
  'register',
  async (payload, thunkAPI) => {
    try {
      const res = await AuthApis.register(payload);
      return thunkAPI.fulfillWithValue(res);
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.response?.data);
    }
  },
);

export const forgotOTPVerifyRequest = createAsyncThunk(
  'forgotVerifyOTP',
  async (payload, thunkAPI) => {
    try {
      const res = await AuthApis.forgotVerifyOtp(payload);
      return thunkAPI.fulfillWithValue(res);
    } catch (err) {
      console.log('forgotOTPVerifyRequest : ', err?.response?.data);
      return thunkAPI.rejectWithValue(err?.response?.data);
    }
  },
);

export const forgotPasswordRequest = createAsyncThunk(
  'forgot',
  async (payload, thunkAPI) => {
    try {
      const res = await AuthApis.forgotPassword(payload);
      return thunkAPI.fulfillWithValue(res);
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.response?.data);
    }
  },
);

export const otpVerifyRequest = createAsyncThunk(
  'otpVerify',
  async (payload, thunkAPI) => {
    try {
      const res = await AuthApis.otpVerify(payload);
      return thunkAPI.fulfillWithValue(res);
    } catch (err) {
      console.log('otpVerifyRequest : ', err?.response?.data);
      return thunkAPI.rejectWithValue(err?.response?.data);
    }
  },
);

export const setNewPasswordRequest = createAsyncThunk(
  'forgotNewPassword',
  async (loginPayload, thunkAPI) => {
    try {
      const res = await AuthApis.forgotNewPassword(loginPayload);
      if (res.data?.status !== 200) {
        return thunkAPI.rejectWithValue(res.data);
      }
      return thunkAPI.fulfillWithValue(res);
    } catch (err) {
      console.log('setNewPasswordRequest : ', err?.response?.data);
      return thunkAPI.rejectWithValue(err?.response?.data);
    }
  },
);

export const updateProfileRequest = createAsyncThunk(
  'updateProfile',
  async (payload, thunkAPI) => {
    try {
      const res = await AuthApis.updateProfile(payload);
      return thunkAPI.fulfillWithValue(res);
    } catch (err) {
      console.log('updateProfileRequest : ', err?.response?.data);
      return thunkAPI.rejectWithValue(err?.response?.data);
    }
  },
);
