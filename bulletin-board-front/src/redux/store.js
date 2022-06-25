import {configureStore} from "@reduxjs/toolkit";
import addPostReducer from './features/posts/postSlice'

export const store = configureStore({
	reducer: {
		posts: addPostReducer,
	},
})