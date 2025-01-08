import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { endPoints } from "src/api";
import { fetchAllCategories } from "src/service";

export interface Category {
  slug: string;
  name: string;
  url: string;
}
interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

interface FetchCategoryPayload {
  data: Category[];
}

// async thunk for fetching categories
export const fetchCategoriesThunk = createAsyncThunk<FetchCategoryPayload>(
  endPoints.product.category,
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAllCategories();
      return { data: response };
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoriesThunk.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.categories = data;
        state.loading = false;
      })
      .addCase(fetchCategoriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectCategories = (state: any) => state.categories.categories;
export const selectCategoryLoading = (state: any) => state.categories.loading;
export const selectCategoryError = (state: any) => state.categories.error;

export default categorySlice.reducer;
