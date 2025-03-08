import React from 'react'
import axios from 'axios'

const commonApi = async (httpmethod,url,reqBody,reqHeader) => {
    const reqConfig= {
        method:httpmethod,
        url,
        data:reqBody,
        headers:reqHeader? reqHeader: {"Content-Type" : "application/json"}
    }
    return await axios(reqConfig).then(res =>{
        return res
    }).catch(err =>{
        return err
    })

}

export default commonApi