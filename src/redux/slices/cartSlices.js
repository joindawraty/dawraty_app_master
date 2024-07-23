import {createSlice} from '@reduxjs/toolkit';
import {cartActions} from '../actions';

const initialState = {
  isLoading: false,
  count: 0,
  data: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: builder => {
    /**
     * addToCartRequest
     * Add full course to cart
     */
    builder.addCase(cartActions.addToCartRequest.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(cartActions.addToCartRequest.fulfilled, (state, action) => {
      state.data = [action.payload, ...state.data];
      state.isLoading = false;
    });
    builder.addCase(cartActions.addToCartRequest.rejected, (state, action) => {
      state.isLoading = false;
    });
    /**
     * addCourseChapterToCartRequest
     * Add course chapter to cart
     */
    builder.addCase(
      cartActions.addCourseChapterToCartRequest.pending,
      state => {
        state.isLoading = true;
      },
    );
    builder.addCase(
      cartActions.addCourseChapterToCartRequest.fulfilled,
      (state, action) => {
        state.data = [action.payload, ...state.data];
        state.isLoading = false;
      },
    );
    builder.addCase(
      cartActions.addCourseChapterToCartRequest.rejected,
      state => {
        state.isLoading = false;
      },
    );
    /**
     * getCartItemsRequest
     * Get cart items
     */
    builder.addCase(
      cartActions.getCartItemsRequest.pending,
      (state, action) => {
        state.isLoading = true;
      },
    );
    builder.addCase(
      cartActions.getCartItemsRequest.fulfilled,
      (state, action) => {
        state.isLoading = false;
        if (Array.isArray(action.payload?.data?.data)) {
          state.data = action.payload.data.data;
        }
      },
    );
    builder.addCase(
      cartActions.getCartItemsRequest.rejected,
      (state, action) => {
        console.log('getCartItemsRequest.rejected : ', action.payload);
        state.isLoading = false;
      },
    );
    /**
     * getCartCountService
     * Get cart items count
     */
    builder.addCase(
      cartActions.getCartCountService.pending,
      (state, action) => {
        state.isLoading = true;
      },
    );
    builder.addCase(
      cartActions.getCartCountService.fulfilled,
      (state, action) => {
        state.count = action.payload.data?.data;
        console.log('state.count : ', state.count);
        state.isLoading = false;
      },
    );
    builder.addCase(
      cartActions.getCartCountService.rejected,
      (state, action) => {
        console.log('getCartCountService.rejected : ', action.payload);
        state.isLoading = false;
      },
    );
    /**
     * addBulkItemToCartService
     * Get cart items count
     */
    builder.addCase(
      cartActions.addBulkItemToCartService.pending,
      (state, action) => {
        state.isLoading = true;
      },
    );
    builder.addCase(
      cartActions.addBulkItemToCartService.fulfilled,
      (state, action) => {
        // console.log('addBulkItemToCartService.fulfilled : ', action.payload);
        state.isLoading = false;
      },
    );
    builder.addCase(
      cartActions.addBulkItemToCartService.rejected,
      (state, action) => {
        console.log('addBulkItemToCartService.rejected : ', action.payload);
        state.isLoading = false;
      },
    );
    /**
     * deleteCartItemRequest
     * Get cart items count
     */
    builder.addCase(
      cartActions.deleteCartItemRequest.pending,
      (state, action) => {
        state.isLoading = true;
      },
    );
    builder.addCase(
      cartActions.deleteCartItemRequest.fulfilled,
      (state, action) => {
        console.log('deleteCartItemRequest.fulfilled : ', action.payload);
        state.data = state.data.filter(
          course => course?.courses?.id !== action.payload,
        );
        state.isLoading = false;
      },
    );
    builder.addCase(
      cartActions.deleteCartItemRequest.rejected,
      (state, action) => {
        console.log('deleteCartItemRequest.rejected : ', action.payload);
        state.isLoading = false;
      },
    );
    /**
     * deleteCartChapterItemRequest
     * Get cart items count
     */
    builder.addCase(
      cartActions.deleteCartChapterItemRequest.pending,
      (state, action) => {
        state.isLoading = true;
      },
    );
    builder.addCase(
      cartActions.deleteCartChapterItemRequest.fulfilled,
      (state, action) => {
        // state.data = state.data.filter(
        //   course => course?.courses?.id !== action.payload,
        // );
        state.isLoading = false;
      },
    );
    builder.addCase(
      cartActions.deleteCartChapterItemRequest.rejected,
      (state, action) => {
        console.log('deleteCartChapterItemRequest.rejected : ', action.payload);
        state.isLoading = false;
      },
    );
  },
});

// Action creators are generated for each case reducer function
// export const {} = cartSlice.actions;

export default cartSlice.reducer;
