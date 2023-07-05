import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import providerReducer from './provider/providerSlice';
import typeReducer from './type/typeSlice';
import serviceReducer from './service/serviceSlice';
import adminReducer from './admin/adminSlice';
import bookingReducer from './booking/bookingSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    provider: providerReducer,
    type: typeReducer,
    service: serviceReducer,
    admin: adminReducer,
    booking: bookingReducer
  },
});

export default store;
