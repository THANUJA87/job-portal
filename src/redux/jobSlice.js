import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        allAdminJobs:[],
        singleJob:null, 
        searchJobByText:"",
        searchedQuery:"",
        location: '',
        role: '',
        jobType: ''
    },
    reducers:{
        // actions
        setAllJobs:(state,action) => {
            state.allJobs = action.payload;
        },
        
        setSingleJob:(state,action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs:(state,action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText:(state,action) => {
            state.searchJobByText = action.payload;
        },
       
        setSearchedQuery:(state,action) => {
            state.searchedQuery = action.payload;
        },
        setLocation: (state, action) => {
            state.location = action.payload;
        },
        setRole: (state, action) => {
            state.role = action.payload;
        },
        setJobType: (state, action) => {
            state.jobType = action.payload;
        },
        clearFilters: (state) => {
            state.location = '';
            state.role = '';
            state.jobType = '';
            state.searchedQuery = '';
        }
    }
});
export const {
    setAllJobs, 
    setLatestJobs,
    setSingleJob, 
    setAllAdminJobs,
    setSearchJobByText, 
    setSearchedQuery,
    setLocation, 
    setRole, 
    setJobType,
    clearFilters
} = jobSlice.actions;

export default jobSlice.reducer;