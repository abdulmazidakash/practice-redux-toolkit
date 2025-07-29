import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  products: [],
  isLoading: false,
  error: null,
};

const BASE_URL = 'http://localhost:3005/products';

export const fetchProducts = createAsyncThunk(
	'/products/fetchProducts',
	async()=>{
		const res = await axios(BASE_URL);
		console.log(res.data);
		return res.data;
	}
);
export const deleteProduct = createAsyncThunk(
	'/products/deleteProduct',
	async(id)=>{
		const res = await axios.delete(`${BASE_URL}/${id}`);
		console.log(res.data);
		return id;
	}
);
export const createProduct = createAsyncThunk(
	'/products/createProduct',
	async(product)=>{
		const res = await axios.post(BASE_URL, product);
		console.log(res.data);
		return res.data;
	}
);
export const updateProduct = createAsyncThunk(
	'/products/updateProduct',
	async({id, product})=>{
		const res = await axios.put(`${BASE_URL}/${id}`, product);
		console.log(res.data);
		return res.data;
	}
);

export const productsSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
	builder
	.addCase(fetchProducts.pending, (state)=>{
		state.isLoading = true,
		state.error = null
	})
	.addCase(fetchProducts.fulfilled, (state, action)=>{
		state.isLoading = false,
		state.products = action.payload
	})
	.addCase(fetchProducts.rejected, (state, action)=>{
		state.isLoading = false,
		state.error = action.error.message || 'failed to fetch data'
	})
	.addCase(deleteProduct.fulfilled, (state, action)=>{
		state.products = state.products.filter((product)=> product.id !== action.payload) 
	})
	.addCase(createProduct.fulfilled, (state, action)=>{
		state.products.push(action.payload) 
	})
	.addCase(updateProduct.fulfilled, (state, action)=>{
		const index = state.products.findIndex((product)=>product.id === action.payload.id);
		state.products[index] = action.payload
	})
  }
})

export default productsSlice.reducer