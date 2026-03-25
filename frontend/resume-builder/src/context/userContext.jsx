import React, {createContext, useState, useEffect} from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext=createContext();

const UserProvider=({childern})=>{
    
    const [user,setUSer]=useState(null);
    const [loading,setLoading]=useState(true); //new state to track loading

    useEffect(()=>{
        if(user) return;
        
        const accessToken=localStorage.getItem("token");
        if(!accessToken){
            setLoading(false);
            return;
        }
     
       const fetchUser =async()=>{
        try {
            const response= await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
            setUSer(response.data);
        } catch (error) {
            console.error("user not Authenticated",error);
            cleatUser();
            
        } finally{
            setLoading(false);
        }
       };

       fetchUser();

    },[]);

    const updateUser=(userData)=>{
            setUSer(userData);
            localStorage.setItem("token",userData.token); //save token
            setLoading(false);
    };

    const clearUser=()=>{
        setUSer(null);
        localStorage.removeItem("token");
    };

    return (
        <UserContext.Provider value={{user,loading,updateUser,clearUser}}>
            {childern}
        </UserContext.Provider>
    );
};

export default UserProvider;
