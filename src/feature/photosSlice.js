import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
  favorites: [],
};

const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    setPhotos(state, action) {
      state.data = action.payload;
    },
    addToFavorites(state, action) {
      const itemToAdd = action.payload;
      state.favorites.push(itemToAdd);
    },
  },
});

export const {setPhotos, addToFavorites} = photosSlice.actions;

export default photosSlice.reducer;
