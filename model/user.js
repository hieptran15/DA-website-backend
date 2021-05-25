const mongoose=require("mongoose");
const shortid=require("shortid");

const useSchema=new mongoose.Schema({
    _id:{type: String, default:shortid.generate},
    name:{  type:String,required:true, min:6,max:255 },
    email:{ type:String,required:true,min:6, max:255 },
    password:{ type:String,required:true,min:6,max:1024},
    date:{ type:Date, default:Date.now},
    role:{type:String,required:true,default:'ROLE_USER'},
    isAdmin:{type:Boolean,required:true,default:false}
})
module.exports=mongoose.model("user",useSchema)