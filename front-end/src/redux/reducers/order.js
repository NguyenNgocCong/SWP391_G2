import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userApi } from "../../api/userApi";
import { CartStore } from "../../services/localStore";

const initState = {
  isLoading: false,
  data: {
    packages: [],
    combos: [],
  },
  error: "",
};
const orderSlice = createSlice({
  name: "order",
  initialState: initState,
  reducers: {
    sendRequest: (state) => {
      state.isLoading = true;
    },
    requestSuccess: (state, action) => {
      state.data = action.payload;
    },
    addToCart: (state, action) => {
      state.data.packages.unshift(action.payload);
      CartStore.setCartLocal(state.data);
    },
    addComboToCart: (state, action) => {
      state.data.combos.unshift(action.payload);
      CartStore.setCartLocal(state.data);
    },
    removeCartPackage: (state, action) => {
      console.log(state.data.packages)
      for (var i in state.data.packages) {
        if(state.data.packages[i].id === action.payload) {
          state.data.packages.splice(i, 1);
          break;
        }
      }
      CartStore.setCartLocal(state.data);
    },
    removeCartCombo: (state, action) => {
      for (var i in state.data.combos) {
        if(state.data.combos[i].id === action.payload) {
          state.data.combos.splice(i, 1);
          break;
        }
      }
      CartStore.setCartLocal(state.data);
    },

    requestFail: (state, action) => {
      state.error = action.payload;
    },
    resetStateCart: () => {
      console.log(initState)
      return initState;
    },
  },
});

export const getAllCartReduce = createAsyncThunk(
  "getCart",
  async ({ page }, { dispatch }) => {
    try {
      const data = await userApi.getCarts({ page });
      dispatch(requestSuccess(data));
    } catch (error) {
      dispatch(requestFail(error?.data?.message));
    }
  }
);

export const getAllCartLocal = createAsyncThunk(
  "getCartLocal",
  async (params = null, { dispatch }) => {
    try {
      const data = CartStore.getCartLocal();
      dispatch(requestSuccess(data));
    } catch (error) {
      dispatch(requestFail(error.message));
    }
  }
);

export const addPackageLocal = createAsyncThunk(
  "addPackageLocal",
  async (data, { dispatch, getState }) => {
    try {
      dispatch(addToCart(data));
    } catch (error) {
      dispatch(requestFail(error.message));
    }
  }
);

export const addComboLocal = createAsyncThunk(
  "addComboLocal",
  async (data, { dispatch, getState }) => {
    try {
      dispatch(addComboToCart(data));
    } catch (error) {
      dispatch(requestFail(error.message));
    }
  }
);

export const getAllCartServer = createAsyncThunk(
  "addComboLocal",
  async (data, { dispatch, getState }) => {
    try {
      const data = await userApi.getCarts();
      let combos = data.filter((x) => x._combo).map((x) => x._combo);
      let packages = data.filter((x) => x._package).map((x) => x._package);

      CartStore.setCartLocal({ combos, packages });
      dispatch(getAllCartLocal());
    } catch (error) {
      dispatch(getAllCartLocal());
    }
  }
);

export const resetCart = createAsyncThunk(
  "addComboLocal",
  async (data, { dispatch, getState }) => {
    try {
      let combos = [];
      let packages = [];
      CartStore.setCartLocal({ combos, packages });
      dispatch(getAllCartLocal());
    } catch (error) {
      dispatch(getAllCartLocal());
    }
  }
);

export const {
  sendRequest,
  requestSuccess,
  requestFail,
  resetStateCart,
  addToCart,
  removeCartPackage,
  addComboToCart,
  removeCartCombo,
} = orderSlice.actions;
export default orderSlice;
