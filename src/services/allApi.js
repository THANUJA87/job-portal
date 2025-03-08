import commonApi from "./commonApi";
import ServerURL from "./serverurl";

export const registerAPI = async (reqBody) =>{
    return await commonApi("POST",`${ServerURL}/register`,reqBody)
}
//login
export const loginAPI = async (reqBody) =>{
    return await commonApi("POST",`${ServerURL}/login`,reqBody)
}
export const getHomeProjectAPI = async () =>{
    return await commonApi("GET",`${ServerURL}/homeproject`,{})
}
//create Company
export const createCompanyAPI = async (reqBody,reqHeaders) =>{
    return await commonApi("POST",`${ServerURL}/company/register`,reqBody,reqHeaders)
}
//update company
export const upadteCompanyAPI = async (reqBody,reqHeaders,id) =>{
    return await commonApi("PUT",`${ServerURL}/company/update/${id}`,reqBody,reqHeaders,id)
}
// view companies

export const getCompanyAPI = async (reqHeader) =>{
    return await commonApi("GET",`${ServerURL}/company/get`,{},reqHeader)
}
// get company By id

export const getCompanyByIdAPI = async (id,reqHeader) =>{
    return await commonApi("GET",`${ServerURL}/company/get/${id}`,{},reqHeader)
}
//delete job
export const deletecompanyAPI = async (id,reqHeader) =>{
    return await commonApi("DELETE",`${ServerURL}/company/${id}/remove`,{},reqHeader)
}
// post job
export const postJobAPI = async (reqBody,reqHeaders) =>{
    return await commonApi("POST",`${ServerURL}/jobs/addjob`,reqBody,reqHeaders)
}

//getAllJobs
export const getjobAPI = async (reqHeader) =>{
    return await commonApi("GET",`${ServerURL}/jobs/getjob`,{},reqHeader)
}

//single Job
export const getSingleJobAPI = async (id,reqHeader) =>{
    return await commonApi("GET",`${ServerURL}/jobs/get/${id}`,{},reqHeader)
}

//admin jobs
export const getAdminJobAPI = async (reqHeaders) =>{
    return await commonApi("GET",`${ServerURL}/jobs/getadmin`,{},reqHeaders)
}

//deletejob

export const deletejobAPI = async (id,reqHeader) =>{
    return await commonApi("DELETE",`${ServerURL}/jobs/${id}/remove`,{},reqHeader)
}

export const saveJobAPI = async (reqBody,reqHeaders,id) =>{
    return await commonApi("POST",`${ServerURL}/${id}/save`,reqBody,reqHeaders)
}

export const getSavejobAPI = async (reqHeader) =>{
    return await commonApi("GET",`${ServerURL}/jobs/savejobs`,{},reqHeader)
}

export const updateUserAPI = async (reqBody,reqHeader) =>{
    return await commonApi("PUT",`${ServerURL}/update`,reqBody,reqHeader)
}



