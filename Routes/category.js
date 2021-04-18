const router=require("express").Router();
const category=require("../model/category");

router.post("/post-category",async (req,res)=>{
    const categorys=new category({
        category:req.body.category,
    });
    try{
        const saveCategory =  await categorys.save();
        res.status(200).send(saveCategory)
    }catch (error){
        res.status(400).send(error)
    }
})

router.get("/get-all-category",async (req,res)=>{
    try{
        const categorys=await category.find({});
        res.status(200).send(categorys);
    }catch(error){
        res.status(400).send(error)
    }
})

router.put("/update-category/:id",async (req,res)=>{
    try{
         const categorys=await category.findByIdAndUpdate(req.params.id);
        res.status(200).send(categorys);
    }catch(error){
        res.status(400).send(error)
    }
})

router.delete("/delete-category/:id",async (req,res)=>{
    try{
         const categorys=await category.findByIdAndDelete(req.params.id);
        res.status(200).send(categorys);
    }catch(error){
        res.status(400).send(error)
    }
})

module.exports = router;