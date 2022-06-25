import {createAsyncThunk, createSlice} from "@reduxjs/toolkit/";
import photoService from "./postsService";

const initialState = {
	photos: [],
	photo: {},
	message: '',
	isError: false,
	isSuccess: false,
	isLoading: false,
}

export const getPhotos = createAsyncThunk(
	'photos/getAll',
	async (_, thunkAPI) => {
		try {
			return await photoService.getPhotos()
		} catch (error) {
			const message = (error.message && error.response.data && error.response.data.message) || error.message || error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	},
)

export const getPhotoById = createAsyncThunk(
	'photo/getID',
	async ({entityId}, thunkAPI) => {
		try {
			return await photoService.getPhotoById(entityId)
		} catch (error) {
			const message = (error.message && error.response.data && error.response.data.message) || error.message || error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	},
)

export const deletePhotoById = createAsyncThunk(
	'photo/deleteId',
	async (entityId, thunkAPI) => {
		try {
			return await photoService.deletePhotoById(entityId)
		} catch (error) {
			const message = (error.message && error.response.data && error.response.data.message) || error.message || error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	},
)

export const createPhoto = createAsyncThunk(
	'photo/create',
	async (entityId, thunkAPI) => {
		try {
			return await photoService.deletePhotoById(entityId)
		} catch (error) {
			const message = (error.message && error.response.data && error.response.data.message) || error.message || error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	},
)

export const photoSlice = createSlice({
	name: 'photos',
	initialState,
	reducers: {},
	// TO:DO reset
	extraReducers: (builder) => {
		builder
			.addCase(getPhotos.pending, (state) => {
				state.isLoading = false
			})
			.addCase(getPhotos.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true;
				state.photos = action.payload
			})
			
			.addCase(getPhotos.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true;
				state.message = action.payload
			})
			
			.addCase(getPhotoById.pending, (state) => {
				state.isLoading = false
			})
			.addCase(getPhotoById.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true;
				state.photo = action.payload
			})
			
			.addCase(getPhotoById.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true;
				state.message = action.payload
			})
			
			.addCase(deletePhotoById.pending, (state) => {
				state.isLoading = false
			})
			.addCase(deletePhotoById.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true;
				state.photos = state.photos.filter(
					(photo) => photo._id !== action.payload.id
				)
			})
			
			.addCase(deletePhotoById.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true;
				state.message = action.payload
			})
			
	},
})

export default photoSlice.reducer