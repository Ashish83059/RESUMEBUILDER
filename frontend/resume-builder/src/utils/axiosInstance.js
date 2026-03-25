import axios from  "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance=axios.create({
    baseURL:BASE_URL,
    timeout:1000,
    headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
    },
});

 //request interceptor
 axiosInstance.interceptors.request.use(
    (config)=>{
        const accessToken=localStorage.getItem("token");
        if(accessToken){
            config.headers.Authorization=`Bearer ${accessToken}`;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
 );

 //response interceptor
 axiosInstance.interceptors.request.use(
    (response)=>{
        return response;
    },
    (error)=>{
        //handle common error globally
        if(error.response){
            if(error.response.status===401){
                //Redirect to login page
                window.location.href="/";
            }
            else if(error.response.status===500){
                console.log("Server eroor ,please try agai later");
            }
        }
        else if(error.code==="ECONNABORTED"){
            console.log("Request timeout,Please try again");
        }
        return Promise.reject(error);
    }
 );

 export default axiosInstance;