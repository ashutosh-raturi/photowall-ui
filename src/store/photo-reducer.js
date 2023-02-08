import { createSlice } from "@reduxjs/toolkit";

const initialState={
    title:null,
    description:null,
    image:null,
    id:null,
}
const photoSlice=createSlice({
    name:'photo',
    initialState,
    reducers:{
        setPhotoDetails(state,action)
        {
            state.title=action.payload.title
            state.description=action.payload.description
            state.image=action.payload.image
        },
        setID(state,action)
        {
            state.id=action.payload.id
        }
    }
});

export const actions=photoSlice.actions;
export default photoSlice;
