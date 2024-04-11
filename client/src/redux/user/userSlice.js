import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser : null,
    error : null,
    loading: false
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true;
        },
        signInSuccess:(state,action)=>{
            state.loading=false;
            state.currentUser = action.payload;
            state.error=null;
        },
        signInFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        signUpStart:(state)=>{
            state.loading=true;
        },
        signUpSuccess:(state)=>{
            state.loading=false;
            state.currentUser = null;
            state.error=null;
        },
        signUpFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        signOutStart:(state)=>{
            state.loading=true;
        },
        signOutSuccess:(state)=>{
            state.loading=false;
            state.currentUser = 'Sign out';
            state.error=null;
        },
        signOutFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        deleteStart:(state)=>{
            state.loading=true;
        },
        deleteSuccess:(state)=>{
            state.loading=false;
            state.currentUser = 'User deleted';
            state.error=null;
        },
        deleteFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        }
    }
})

export const { signInStart , signInSuccess , signInFailure , deleteStart , deleteSuccess , deleteFailure , signOutStart , signOutSuccess , signOutFailure , signUpStart , signUpSuccess , signUpFailure } = userSlice.actions;

export default userSlice.reducer