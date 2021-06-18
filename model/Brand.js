const mongoose=require("mongoose");
const shortid=require("shortid");

const useSchema=new mongoose.Schema({
    _id:{type: String, default:shortid.generate},
    brand:{ type:String,required:true, max:255 },
})
module.exports=mongoose.model("brand",useSchema)