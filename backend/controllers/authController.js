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
const registerUser=async(req,res)=>{
   try{
      const{name,email,password, profileImageUrl};
      req.body;

      //check if user already exist
      const userExists=await user.findOne({email});
      if(userExists){
         return res.status(400).json({message:"user already exists"});
      }

      //Hash Password
      const salt=await bcrypt.genSalt(10);
      const hashedPassword=await.bcrypt.hash (password, salt);

      //Create new user 
      const user = await User.create({
         name,
         email,
         password,
         profileImageUrl
      });

      //return user with JWT
      res.status(201).json({
         _id:user._id,
         name:user.name,
         email:user.email,
         profileImageUrl:user.profileImageUrl,
         token:generateToken(user._id),
      });

   }catch(error){
      res.status(500).jsom({message:"Server error",error:error.message});
   }
};

//@desc login   user
//@route POST/api/auth/register
//@access Public
const loginUser=async(req,res)=>{
   try {
      const {email, password}=req.body;

      const user=await user.findOne({email});
      if(user){
         return res.status(500).json({message:"Invalid email or password"});
      }
      
      //Comapare password
      const isMatch= await bcrypt.compare(password, user.password);
      if(!isMatch){
         return res.status(500).json({message:"Invalid email or password"});
      }
      
      //Return user data with JWT
      res.json({
         _id:user._id,
         name:user.name,
         email:user.email,
         profileImageUrl:user.profileImageUrl,
         token:generateToken(user._id),
      });

   } catch (error) {
      res.status(500).jsom({message:"Server error",error:error.message});
   }
};

//@desc get a new profile
//@route POST/api/auth/register
//@access Public
const getUserProfile=async(req,res)=>{
   try {
      const user=await user.findeById(req.user.id).select("-password");
      if(!user){
         return res.status(404).json({message:"User not found"});
      }
      res.json(user);
   } catch (error) {
      res.status(500).jsom({message:"Server error",error:error.message});
   }
};

module.exports={registerUser, loginUser, getUserProfile};
