import { createAsyncThunk, createSlice } from "@reduxjs/toolkit/";
import photoService from "./postsService";

const initialState = {
  photos: [],
  photo: {},
  subcategories: [],
  message: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
};

export const getPhotos = createAsyncThunk(
  "photos/getAll",
  async (_, thunkAPI) => {
    try {
      return await photoService.getPhotos();
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSubcategories = createAsyncThunk(
  "subs/getAll",
  async (_, thunkAPI) => {
    try {
      return await photoService.getSubcategory();
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getPhotoById = createAsyncThunk(
  "photo/getID",
  async ({ entityId }, thunkAPI) => {
    try {
      return await photoService.getPhotoById(entityId);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deletePhotoById = createAsyncThunk(
  "photo/deleteId",
  async ({ entityId }, thunkAPI) => {
    try {
      return await photoService.deletePhotoById(entityId);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createPhoto = createAsyncThunk(
  "photo/create",
  async (adData, thunkAPI) => {
    try {
      return await photoService.createPhoto(adData);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updatePhoto = createAsyncThunk(
  "photo/update",
  async (adData, thunkAPI) => {
    try {
      return await photoService.updatePhoto(adData);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const searchPost = createAsyncThunk(
  "post/search",
  async (name, thunkAPI) => {
    try {
      return await photoService.searchPost(name);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const searchPostCity = createAsyncThunk(
  "post/searchCity",
  async (name, thunkAPI) => {
    try {
      return await photoService.searchPostCity(name);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const photoSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPhotos.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(getPhotos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.photos = action.payload;
      })

      .addCase(getPhotos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getSubcategories.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(getSubcategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.subcategories = action.payload;
      })

      .addCase(getSubcategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getPhotoById.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(getPhotoById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.photo = action.payload;
      })

      .addCase(getPhotoById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(deletePhotoById.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(deletePhotoById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.photos = state.photos.advertisementList.filter(
          (photo) => photo.id !== action.payload.id
        );
      })
      .addCase(deletePhotoById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createPhoto.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(createPhoto.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.photos.advertisementList.push(action.payload);
      })

      .addCase(createPhoto.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(updatePhoto.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(updatePhoto.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.photos = state.photos.advertisement((photo) =>
          photo._id !== action.payload.id
            ? {
                ...photo,
                name: action.payload.name,
                description: action.payload.description,
                price: action.payload.price,
                houseNumber: action.payload.houseNumber,
                subcategoryId: action.payload.subcategory.id,
                locality: action.payload.locality.id,
                street: action.payload.street.id,
                region: action.payload.locality.id,
              }
            : photo
        );
      })

      .addCase(updatePhoto.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(searchPost.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(searchPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.photos = action.payload;
      })

      .addCase(searchPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(searchPostCity.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(searchPostCity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.photos = action.payload;
      })

      .addCase(searchPostCity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default photoSlice.reducer;
