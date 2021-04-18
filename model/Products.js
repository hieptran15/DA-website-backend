const mongoose=require("mongoose");
const shortid=require("shortid");

const useSchema=new mongoose.Schema({
    _id:{type: String, default:shortid.generate},
    name:{type:String,required:true,max:255 },
    category:{ type:String,required:true, max:255 },
    price:{type:Number,required:true},
    description:{type:String,required:true,max:255},
    brand:{type:String,required:true,max:255},
    rate:{type:Number,required:true},
    date:{type:Date, default:Date.now},
    img_url:{type:String,required:true,max:255},
})
module.exports=mongoose.model("products",useSchema)