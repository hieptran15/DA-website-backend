const router=require("express").Router();
const Products=require("../model/Products");
const multer = require("multer");
const path = require("path");

 //storage engine
 const storage = multer.diskStorage({
     destination: './upload/images',
     filename: (req, file, cb) => {
         return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
     }
 })
const upload = multer({
    storage: storage,
    limits: {fileSize: 10000000}
})
router.post("/post-product",async (req,res)=>{
  console.log(req.file);
    const product=new Products({
        name:req.body.name,
        category:req.body.category,
        price:req.body.price,
        description:req.body.description,
        brand:req.body.brand,
        rate:req.body.rate,
        img_url: req.body.img_url
    });
    try {
        const saveProducts=await product.save();
        res.status(200).send(saveProducts)
        
    } catch (error) {
        res.status(400).send(error)
    }
});
router.get("/get-product",async(req,res)=>{
    // const product=await Products.find({});
    // res.send(product);
    try{
       const { page = 1 ,limit = 9 } = req.query;
       const category = req.query.category ? { category: req.query.category } : {};
       const brand = req.query.brand ? { brand: req.query.brand } : {};
       const searchKeyword = req.query.name
              ? {
                  name: {
                    $regex: req.query.name,
                    $options: '$i',
                  },
                }
              : {};
        const sortOrder = req.query.price
              ? req.query.price === 'lowest'
                ? { price: 1 }
                : { price: -1 }
              : { _id: -1 };

    const product = await Products.find({ ...category, ...searchKeyword, ...brand }).limit(limit * 1).skip((page - 1) * limit).sort(
      sortOrder
    );
    res.send(product);
    } catch (e) {
      res.status(500).json({ message: "error" })
    }
})
router.get("/get-product/:id",async(req,res)=>{
  const product = await Products.findById(req.params.id);
  res.send(product);

})
router.delete("/delete-product/:id",async(req,res)=>{
    const deleteProduct= await Products.findByIdAndDelete(req.params.id)
    res.send(deleteProduct)
})
router.put("/update-product/:id", async(req,res)=>{

    const product = await Products.findById(req.params.id);
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.rate = req.body.rate;
      product.brand = req.body.brand;
      product.category = req.body.category;
      product.description = req.body.description;
      product.img_url = req.body.img_url;
      const updatedProduct = await product.save();
      if (updatedProduct) {
        return res
          .status(200)
          .send({ message: 'SuccessUpdated', data: updatedProduct });
      }
    }
    return res.status(500).send({ message: ' Error in Updating Product.' });
})
module.exports = router;