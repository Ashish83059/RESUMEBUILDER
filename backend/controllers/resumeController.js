const fs=require("node:fs");
const path=require("node:path");
const Resume=require("../models/Resume");
const Resume = require("../models/Resume");


//@desc Create new Resume
//@route POST/api/resume
//@access Private

const createResume=async(req,res)=>{
     try{
       
        const {title}=req.body;
        
        //Default Templete
        const defaultResumeData={
            profileInfo:{
                profileImg:null,
                previewUrl:"",
                fullName:"",
                designation:"",
                summary:""
            },
            contactInfo:{
                email:"",
                phone:"",
                locatione:"",
                linkedin:"",
                github:"",
                website:"",
            },
            workExperience:[
                {
                company:"",
                role:"",
                startDate:"",
                endDate:"",
                description:"",
            },
        ],
        education:[
            {
                degree:"",
                institution:"",
                startDate:"",
                endDate:"",
            },
        ],
        skills:[
            {
                name:"",
                progress:0,

            },
        ],
        projects:[
            {
                title:"",
                description:"",
                github:"",
                livedemo:"",
            },
        ],
        certifications:[
            {
                title:"",
                issuer:"",
                year:"",
            },
        ],
         languages:[
            {
                name:"",
                progress:0,
            },
         ],
         interests:[""],
        };
        
        const newResume=await Resume.create({
            userId:req.user._id,
            title,
            ...defaultResumeData,
        });
     }
     catch(errot){
        res.status(500).json({message:"Failed to create resume",erro:error.message});
     }
};

//@desc Get all resume for logged-in user
//@route GET/api/resume
//@access Private

const getUserResume=async(req,res)=>{
    try {
        const resume=await Resume.findOne({userId:req.uer._id}).sort({
            updateAt:-1,
        }),
        res.json(resume);
    } catch (error) {
        res.status(500).json({message:"Failed to create resume",erro:error.message});
 
    }
};

//@desc Get single Resume by id
//@route GET/api/resume/:id
//@access Private

const getResumeById=async(req,res)=>{
    try {
        const resume=await Resume.fine({_id:req.params.id,userId:req.user._id});
        
        if(!resume){
          return  res.status(404).json({message:"Resume Not Found"});
        }
        res.json(resume);   

    } catch (error) {
        res.status(500).json({message:"Failed to create resume",erro:error.message});
 
    }

};

//@desc update a resume
//@route PUT/api/resume/:id
//@access Private

const updateResume=async(req,res)=>{
    try {
        const resume=await Resume.findOne({_id:req.params.id,userId:req.user._id});
        if(!resume){
            return  res.status(404).json({message:"Resume Not Found or Unothorized"});
          }
     
          //merge updates from the req.body  into existing  resume
          Object.assign(resume,req.body);

          //save updated resume

          const saveResume= await resume.save();
          res.json(savedResume);
    } catch (error) {
        res.status(500).json({message:"Failed to create resume",erro:error.message});
 
    }

};

//@desc Delete a resume
//@route Delete/api/resume/:id
//@access Private

const deleteResume=async(req,res)=>{
    try {
        const resume=await Resume.findOne({_id:req.params.id,userId:req.user._id});
        if(!resume){
            return  res.status(404).json({message:"Resume Not Found or Unothorized"});
          }
    //Delete thumbnailLink and profilePreviewUrl images from uploads folder
    const uploadsFolder=path.join(__dirname,"..",'uploads');
    const baseUrl=`${req.protocol}://${req.get("host")}`;

    if(resume.thumbnailLink){
        const oldThumbnail=path.join(uploadsFolder,path.basename( resume.thumbnailLink));
        if(fs.existsSync(oldThumbnail)) fs.unlinkSync(oldThumbnail);
    }
    if(resume.profileInfo?.profilePreviewUrl){
        const oldProfile=path.join(uploadsFolder,path.basename( resume.profileInfo.profilePreviewUrl));
        if(fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile);
    }

    const deleted=await Resume.findOneAndDelete({_id:req.params.id,userId:req.user._id});
        if(!deleted){
            return  res.status(404).json({message:"Resume Not Found or Unothorized"});
          }
    res.json({message:"Resume Deleted Succesfully"});

    } catch (error) {
        res.status(500).json({message:"Failed to create resume",erro:error.message});
 
    }

};

module.exports={
    createResume,
    getUserResume,
    getResumeById,
    updateResume,
    deleteResume,
};