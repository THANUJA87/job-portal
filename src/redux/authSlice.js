import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        loading:false,
         user:null,
         updatedUser:null

    },
    reducers:{
        //actions
        setLoading:(state,action) => {
            state.loading = action.payload
        },
        setUser:(state,action)=>{
            state.user = action.payload

        },
        setUpdateUser:(state,action)=>{
            state.user = action.payload

        }
    }
})

export const {setLoading,setUser,setUpdateUser} = authSlice.actions
export default authSlice.reducer