import {createSlice} from '@reduxjs/toolkit';
import {authActions} from '../actions';
import {errorToast, successToast} from '../../util/toastUtils';

const initialState = {
  userData: null,
  token: null,
};

export const loginSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveData: (state, action) => {
      state.userData = action.payload;
    },
    logout: state => {
      Object.assign(state, initialState);
    },
    saveToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(authActions.loginRequest.pending, (state, action) => {
      // handle loading state if needed
    });
    builder.addCase(authActions.loginRequest.fulfilled, (state, action) => {
      const loginData = action.payload.data?.data;
      state.userData =
        loginData && loginData.user?.email_verified_at ? loginData : null;
      state.token = loginData?.token ?? '';
    });
    builder.addCase(
      authActions.updateProfileRequest.fulfilled,
      (state, action) => {
        const loginData = action.payload.data?.data;
        state.userData = {
          ...state.userData,
          user: {
            ...state.userData.user,
            ...loginData,
          },
        };
      },
    );
    builder.addCase(authActions.loginRequest.rejected, (state, action) => {
      if (
        action.payload?.message &&
        Array.isArray(action.payload?.message) &&
        action.payload?.message.length
      ) {
        errorToast(action.payload?.message?.[0]);
      } else {
        typeof action.payload?.message === 'string' &&
          errorToast(action.payload?.message);
      }
      // handle error here or show toast read response from action
    });
    builder.addCase(authActions.registerRequest.fulfilled, (state, action) => {
      const loginData = action.payload.data?.data;
      if (loginData) {
        state.token = loginData?.token;
      }
      if (loginData && loginData.user?.email_verified_at) {
        state.userData = loginData;
      } else if (loginData) {
        state.userData = null;
      }
    });
    builder.addCase(authActions.registerRequest.rejected, (state, action) => {
      errorToast(action.payload?.message);
    });
    // builder.addCase(
    //   authActions.forgotPasswordRequest.pending,
    //   (state, action) => {
    //   },
    // );
    builder.addCase(
      authActions.forgotPasswordRequest.fulfilled,
      (state, action) => {
        const loginData = action.payload.data?.data;
        if (loginData) {
          state.token = loginData?.token;
        }
      },
    );
    builder.addCase(
      authActions.forgotPasswordRequest.rejected,
      (_state, action) => {
        errorToast(action.payload?.message);
      },
    );
    builder.addCase(
      authActions.setNewPasswordRequest.fulfilled,
      (state, action) => {
        console.log('action : ', JSON.stringify(action));
        // const loginData = action.payload.data?.data;
        // if (loginData) {
        //   state.token = loginData?.token;
        // }
      },
    );
    builder.addCase(
      authActions.setNewPasswordRequest.rejected,
      (_state, action) => {
        errorToast(action.payload?.message);
      },
    );
    builder.addCase(authActions.logoutRequest.fulfilled, (state, action) => {
      if (action.payload?.data?.message) {
        successToast(action.payload?.data?.message);
      }
      Object.assign(state, initialState);
    });
    builder.addCase(authActions.logoutRequest.rejected, (state, action) => {
      Object.assign(state, initialState);
    });
  },
});

// Action creators are generated for each case reducer function
export const {saveData, saveToken, logout} = loginSlice.actions;

export default loginSlice.reducer;
