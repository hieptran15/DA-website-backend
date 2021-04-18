const router=require("express").Router();
const order = require("../model/order");

router.post("/post-order", async (req,res)=>{
    const orders=new order(req.body);
    const saveOrder=await orders.save();
    res.status(200).json({success:true})
    res.send(saveOrder);
})
router.get("/get-all-order",async (req,res)=>{
    try{
        const orders=await order.find({});
        res.send(orders);
    }catch(error){
        res.status(400).send(error)
    }
})

router.get("/search-order/:name",async (req,res)=>{
    try{
        var regex=new RegExp(req.params.name,"i");
        const orders=await order.find({name:regex})
        res.status(200).json(orders)
    }catch(error){
        res.status(400).send(error)
    }
})

router.delete("/delete-order/:id",async (req,res)=>{
    try{
         const orders=await order.findByIdAndDelete(req.params.id);
        res.status(200).send(orders);
    }catch(error){
        res.status(400).send(error)
    }
})
module.exports = router;