const router = require("express").Router();
const Brands = require("../model/Brand");

router.post("/post-brand", async (req, res) => {
    const brand = new Brands({
        brand: req.body.brand,
    });
    try {
        const saveBrand = await brand.save();
        res.status(200).send(saveBrand);
    } catch (error) {
        res.status(400).send(error)
    }
});

router.get("/get-all-brand", async (req, res) => {
    try {
        const brands = await Brands.find({});
        res.status(200).send(brands)
    } catch (error) {
        res.status(400).send(error)
    }
});

router.put("/update-brand/:id", async (req, res) => {
    const brands = await Brands.findById(req.params.id);
    if (brands) {
        brands.Brands = req.body.brand;
        const updatedBrand = await Brands.save();
        if (updatedBrand) {
            return res
                .status(200)
                .send({ message: 'SuccessUpdated', data: updatedBrand });
        }
    }
    return res.status(500).send({ message: ' Error in Updating brand.' });
});

router.delete("/delete-brand/id", async (req, res) => {
    try {
        const brands = await Brands.findByIdAndDelete(req.params.id);
        res.status(200).send(brands);
    } catch (error) {
        res.status(400).send(error)
    }
});

module.exports = router;