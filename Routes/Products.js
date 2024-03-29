const router = require("express").Router();
const Products = require("../model/Products");
const expressAsyncHandler = require("express-async-handler")
const path = require("path");
const { count } = require("console");

//storage engine
router.post("/post-product", async (req, res) => {
  const product = new Products({
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    description: req.body.description,
    brand: req.body.brand,
    rate: req.body.rate,
    img_url: req.body.img_url
  });
  try {
    const saveProducts = await product.save();
    res.status(200).send(saveProducts)

  } catch (error) {
    res.status(400).send(error)
  }
});
router.get("/list-all-product", async (req, res) => {
  try {
      const category = req.query.category ? { category: req.query.category } : {};
      const product = await Products.find({...category});
      res.status(200).send(product);
  } catch (error) {
      res.status(400).send(error)
  }
})
router.get("/get-product", expressAsyncHandler(async (req, res) => {
  // const product=await Products.find({});
  // res.send(product);
  try {
    const {limits = 9} = req.query;
    const page = req.query.page;

    const category = req.query.category ? { category: req.query.category } : {};
    const brand = req.query.brand ? { brand: req.query.brand } : {}; 
    const min = req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max = req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const searchKeyword = req.query.searchKeyword
      ? {
        name: {
          $regex: req.query.searchKeyword,
          $options: '$i',
        },
      }
      : {};
    const sortOrder = req.query.price
      ? req.query.price === 'lowest'
        ? { price: 1 }
        : { price: -1 }
      : { _id: -1 };
    const productCount = await Products.count({ ...category, ...searchKeyword, ...brand, ...priceFilter });
    const product = await Products.find({ ...category, ...searchKeyword, ...brand, ...priceFilter }).sort(sortOrder).skip((page - 1) * limits).limit(limits * 1);
    res.send({datas:product, count: productCount,  pages: Math.ceil(productCount / limits)});
  } catch (e) {
    res.status(500).json({ message: "error" })
  }
})
);

router.post('/:id/reviews', async (req, res) => {
  const product = await Products.findById(req.params.id);
  if (product) {
    const review = {
      name: req.body.name,
      email: req.body.email,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rate =
      product.reviews.reduce((a, c) => c.rating + a, 0) /
      product.reviews.length;
    const updatedProduct = await product.save();
    res.status(201).send({
      data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      message: 'Review saved successfully.',
    });
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

router.get("/get-product/:id", async (req, res) => {
  const product = await Products.findById(req.params.id);
  res.send(product);

})
router.delete("/delete-product/:id", async (req, res) => {
  const deleteProduct = await Products.findByIdAndDelete(req.params.id)
  res.send(deleteProduct)
})
router.put("/update-product/:id", async (req, res) => {

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