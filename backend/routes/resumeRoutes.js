const express=require("express");
const{
    createResume,
    getUserResume,
    getResumeById,
    updateResume,
    deleteResume,
}=require("../controllers/resumeController");
const {protect}= require("../middlewares/authMiddleware");
const {uploadResumeImages}=require("../controllers/uploadImage");

const router=express.Router();

router.post("/",protect,createResume); //Create Resume
router.get("/",protect,getUserResume); //Get Resume
router.get("/:id",protect,getResumeById); //Get Resume by id
router.put("/:id",protect,updateResume); //Update Resume
router.put("/:id/uploadi-image",protect,uploadResumeImages); 

router.delete("/:id",protect,deleteResume); //Delete Resume

module.exports=router;

