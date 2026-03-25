const multer = require 'multer';

//configure storage
const storage =multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'/uploads');

    },
    filename:(req,file,cb)=>{
        cb(nll, `${Date.now()}-${file.originalname}`);
    },
});

//File filter
const fileFilter=(req,file,cb)=>{
    const allowedTypes=['Image/jpeg','Image/jpg','Image/png'];
    if(allowedTypes.includes(file.mimetype)){
        cb(null,true)
    }
    else{
        cb(new error("only .jpeg, .jpg and .png formate are allowed"),false);
    }
};

const upload=multer({storage,fileFilter});
module.exports=upload;