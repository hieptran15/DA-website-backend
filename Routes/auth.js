const router=require("express").Router();
const user=require("../model/user");
const jwt = require('jsonwebtoken');
//vlidation
const Joi=require("@hapi/joi");

// const schema=Joi.object({
//     name:Joi.string().min(6).required(),
//     email:Joi.string().min(6).required().email(),
//     password:Joi.string().min(6).required()
// })

router.post("/register", async (req,res)=>{

    //lets validate the data before we a user
    // const validation= Joi.validate(req.body,schema)
    // res.send(validation)

    // Checking user existing in db
    const emailExist = await user.findOne({ email: req.body.email });
    if (emailExist) return res.status(401).send({ message: "Email đã được sử dụng! Vui lòng đăng ký bằng tài khoản email khác" })

    const User=new user({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
    });
    try {
        const saveUser=await User.save();
        res.status(200).send(saveUser)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get("/get-all-users",async (req,res)=>{
    const User=await user.find({});
    res.send(User);
})

router.post("/singIn",async (req,res)=>{
    const singInUser=await user.findOne({
        email:req.body.email,
        password:req.body.password
    });
    const token=jwt.sign({
        _id:user._id,
    },process.env.JWT_SECRET,{
        expiresIn:"48h"
    });

    if(singInUser){
         res.send({
             _id:singInUser.id,
             name:singInUser.name,
             email:singInUser.email,
             password:singInUser.password,
             isAdmin:singInUser.isAdmin,
             role:singInUser.role,
             token:token
         });
    }else{
        res.status(401).send({ message: "email or mat khau khong ton tai" })
    }
   
})
module.exports = router;