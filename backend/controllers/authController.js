const User=require("../models/User");
const bcrypt= require("bcryptjs");
const jwt=require("jsonwebtoken");

//generate jwt token
const generateToken=(userId)=>{
   return jwt.sign({id:userID},process.env.JWT_SECRET,{expiresIn:"7d"});
};

//@desc register  new user
//@route POST/api/auth/register
//@access Public
const registerUser=async(req,res)=>{};

//@desc login   user
//@route POST/api/auth/register
//@access Public
const loginUser=async(req,res)=>{};

//@desc get a new profile
//@route POST/api/auth/register
//@access Public
const getUserProfile=async(req,res)=>{};

module.exports={registerUser, loginUser, getUserProfile};
