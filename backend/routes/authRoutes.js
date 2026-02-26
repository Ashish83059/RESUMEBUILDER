const express=require("express");
const {registerUser, loginUser, getUserProfile}=require("../controllers/authController");
const {protect}=require("../middlewares/authMiddleware");

const router=express.router();

//Auth Routes
router.post("/register",registerUser );  //Register User
router.post("/login", loginUser); //Login User
router.post("/profile",getUserProfile)  //Get User Profile

module.exports=router;
