import { setAllJobs } from '@/redux/jobSlice'
import { getjobAPI } from '@/services/allApi';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    // const {searchedQuery} = useSelector(store=>store.job);
    useEffect(()=>{
        const fetchAllJobs = async () => {

            const token = sessionStorage.getItem('token')
            const reqHeader = token ? { Authorization: `Bearer ${token}` } : {}
            try {
                const res = await getjobAPI(reqHeader)
                if (res.status === 200) {
                    dispatch(setAllJobs(res.data))
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchAllJobs();
    },[dispatch])
}

export default useGetAllJobs