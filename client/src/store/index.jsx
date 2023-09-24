
import { createSlice,configureStore } from "@reduxjs/toolkit";

const userSclice = createSlice({
  name: "user",
  initialState: { isLoggedIn: false },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      localStorage.removeItem("userId");
      localStorage.removeItem("token")
      state.isLoggedIn = false;
    },
  },
});
const theaterSlice=createSlice({
  name:"TheaterAdmin",
  initialState:{isLoggedIn:false},
  reducers:{
    login(state){
      state.isLoggedIn=true;
    },
    logout(state){
      localStorage.removeItem('theaterId')
      localStorage.removeItem('token')
      state.isLoggedIn=false;
    }
  }
})

export const userActions=userSclice.actions
export const theaterActions=theaterSlice.actions

export const store = configureStore({
  reducer: {
    user: userSclice.reducer,
    theaterAdmin: theaterSlice.reducer,
  },
});