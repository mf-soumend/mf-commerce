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
  selectedCategory: string;
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  selectedCategory: "",
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
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoriesThunk.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.categories = [{ name: "All", slug: "all", url: "" }, ...data];
        state.loading = false;
        state.selectedCategory = "all";
      })
      .addCase(fetchCategoriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedCategory } = categorySlice.actions;
export const selectCategories = (state: any) => state.categories.categories;
export const selectSelectedCategory = (state: any) =>
  state.categories.selectedCategory;
export const selectCategoryLoading = (state: any) => state.categories.loading;
export const selectCategoryError = (state: any) => state.categories.error;

export default categorySlice.reducer;
