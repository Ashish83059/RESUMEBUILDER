export const BASE_URL="http://localhost:8000";

//utils/apiPaths.js

export const API_PATHS={
AUTH:{
    REGISTER:"api/auth/register", //signup
    LOGIN: "api/auth/login",  //Authentication user and return JWT token
    GET_PROFILE:"api/auth/profile", //Get logged-in user detail
},

RESUME:{
    CREATE:(id)=>"/api/resume", //POST - create a new resume
    GET_ALL:(id)=>"/api/resume", //GET - get all resumes of logged in user
    GET_BY_ID:(id)=>`/api/resume/${id}`,  // GET - get a specific resume
    UPDATE:(id)=>`/api/resume/${id}`, //PUT - update a resume
    DELETE:(id)=>`api/resume/${id}`,  //DELET - delete a resume
    UPLOAD_IMAGES:(id)=>`api/resume/${id}/upload-images`, //PUT- upload a thumbnail  and resume proile image
},

IMAGES:{
   UPLOAD_IMAGES:"api/auth/upload-image",
},

};