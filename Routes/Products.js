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
//  const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//       cb(null, true);
//     } else {
//       cb(null, false);
//     }
//   };
const upload = multer({
    storage: storage,
    limits: {fileSize: 10000000}
})
router.post("/post-product",upload.single('img_url'),async (req,res)=>{
    const product=new Products({
        name:req.body.name,
        category:req.body.category,
        price:req.body.price,
        description:req.body.description,
        brand:req.body.brand,
        rate:req.body.rate,
        img_url: `http://localhost:8080/api/product/${req.file.filename}`
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
    const category = req.query.category ? { category: req.query.category } : {};
    const searchKeyword = req.query.searchKeyword
      ? {
          name: {
            $regex: req.query.searchKeyword,
            $options: 'i',
          },
        }
      : {};
    const sortOrder = req.query.sortOrder
      ? req.query.sortOrder === 'lowest'
        ? { price: 1 }
        : { price: -1 }
      : { _id: -1 };
    const product = await Products.find({ ...category, ...searchKeyword }).sort(
      sortOrder
    );
    res.send(product);

})
router.delete("/delete-product/:id",async(req,res)=>{
    const deleteProduct= await Products.findByIdAndDelete(req.params.id)
    res.send(deleteProduct)
})
router.put("/update-product/:id",upload.single('img_url'), async(req,res)=>{
    const productId = req.params.id;
    const product = await Products.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.rate = req.body.rate;
      product.brand = req.body.brand;
      product.category = req.body.category;
      product.description = req.body.description;
      product.img_url = `http://localhost:8080/api/product/${req.file.filename}`;
      const updatedProduct = await product.save();
      if (updatedProduct) {
        return res
          .status(200)
          .send({ message: 'Product Updated', data: updatedProduct });
      }
    }
    return res.status(500).send({ message: ' Error in Updating Product.' });
})
module.exports = router;