import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductsSlice from "./admin/products-slice";
import adminOrderSlice from "./admin/order-slice";

import shopProductsSlice from "./shop/products-slice";
import cartReducer from "./shop/cart-slice"; // ✅ Renamed correctly
import shopAddressSlice from "./shop/address-slice";
import shopOrderSlice from "./shop/order-slice";
import shopSearchSlice from "./shop/search-slice";
import shopReviewSlice from "./shop/review-slice";
import commonFeatureSlice from "./common-slice";
import shoppingCartReducer from "./shop/cart-slice"; // import your reducer
const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer, // ✅ Now this works
    adminProducts: adminProductsSlice,
    adminOrder: adminOrderSlice,

    shopProducts: shopProductsSlice,
    shopAddress: shopAddressSlice,
    shopOrder: shopOrderSlice,
    shopSearch: shopSearchSlice,
    shopReview: shopReviewSlice,
    shopCart: shoppingCartReducer,
    commonFeature: commonFeatureSlice,
  },
});

export default store;
