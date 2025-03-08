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
        industry: '',
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
        setIndustry: (state, action) => {
            state.industry = action.payload;
        },
        setJobType: (state, action) => {
            state.jobType = action.payload;
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
    setIndustry, 
    setJobType
} = jobSlice.actions;

export default jobSlice.reducer;