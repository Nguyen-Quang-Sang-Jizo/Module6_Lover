import { createSlice } from "@reduxjs/toolkit";
import {
  addProvider,
  filterProvider,
  getProvider,
  getProviderDetail, newlyJoinedProviders,
  searchProviders, searchSexFemaleProviders, searchSexMaleProviders,
  showProviderByUser, topProviders
} from "../../services/providerService";
import {getServiceProvider} from "../../services/serviceProviderService.js";

const initialState = {
  listProvider: [],
  currenProvider: [],
  lease: [],
  showOneProvider: {}

};

const providerSlice = createSlice({
  name: "provider",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getProvider.fulfilled, (state, action) => {
      state.listProvider = action.payload;
      // state.currenProvider = action.payload;
    });

    builder.addCase(filterProvider.fulfilled, (state, { payload }) => {
      let arr = payload.listProvider.filter((element) => {
        return payload.service.some((item) => {
          return element.other.includes(item);
        });
      });
    });

    builder.addCase(addProvider.fulfilled, (state, action) => {
      state.lease = action.payload;
    });

    builder.addCase(getProviderDetail.fulfilled, (state, action) => {
      state.showOneProvider = action.payload;
    });

    builder.addCase(searchProviders.fulfilled, (state, action) => {
      state.listProvider = action.payload;
      state.currenProvider = action.payload;
    });

    builder.addCase(searchSexMaleProviders.fulfilled, (state, action) => {
      state.listProvider = action.payload;
      state.currenProvider = action.payload;
    });

    builder.addCase(searchSexFemaleProviders.fulfilled, (state, action) => {
      state.listProvider = action.payload;
      state.currenProvider = action.payload;
    });

    builder.addCase(newlyJoinedProviders.fulfilled, (state, action) => {
      state.listProvider = action.payload;
      state.currenProvider = action.payload;
    });
    builder.addCase(topProviders.fulfilled, (state, action) => {
      state.listProvider = action.payload;
      state.currenProvider = action.payload;
    });

    builder.addCase(getServiceProvider.fulfilled, (state, action) => {
      state.listProvider = action.payload;
    });

    builder.addCase(showProviderByUser.fulfilled, (state, action) => {
      state.showOneProvider = action.payload;
    });
  },
  
});

export default providerSlice.reducer;
