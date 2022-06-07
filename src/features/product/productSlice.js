import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  product: [],
};

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async () => {
    const response = await axios.get(
      "https://moveon-api-server.sbox.ali2bd.net/api/v1/customer/dummy-product"
    );
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        console.log("pending");
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        console.log("success");
        state.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (state) => {
        console.log("Rejected");
      });
  },
});

// Action creators are generated for each case reducer function
// export const { addProduct } = productSlice.actions;
export const getProduct = (state) => state.product.product;

export default productSlice.reducer;
