import { configureStore } from "@reduxjs/toolkit";
import photoSlice from "./photo-reducer";

const store= configureStore({
    reducer:{photo: photoSlice.reducer}
});

export default store;
