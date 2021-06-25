const router = require("express").Router();
const order = require("../model/order");

router.post("/post-order", async (req, res) => {
    const orders = new order({
        fullName: req.body.fullName,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        portCode: req.body.portCode,
        city: req.body.city,
        status: req.body.status,
        noteOrder: req.body.noteOrder,
        total: req.body.total,
        cartItems: req.body.cartItems,
    });
    try {
        const saveOrder = await orders.save();
        res.status(200).json({ success: true })
        res.send(saveOrder);

    } catch (error) {
        res.status(400).send(error)
    }
})
router.get("/get-all-order", async (req, res) => {
    try {
        const orders = await order.find({});
        res.send(orders);
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get("/search-order/:name", async (req, res) => {
    try {
        var regex = new RegExp(req.params.name, "i");
        const orders = await order.find({ name: regex })
        res.status(200).json(orders)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete("/delete-order/:id", async (req, res) => {
    try {
        const orders = await order.findByIdAndDelete(req.params.id);
        res.status(200).send(orders);
    } catch (error) {
        res.status(400).send(error)
    }
})

router.patch("/update-status/:id", async (req, res) => {

    const orders = await order.findById(req.params.id);
    if (orders) {
        orders.status = req.body.status; 
       const updatedStatus = await orders.save();
      if (updatedStatus) {
        return res
          .status(200)
          .send({ message: 'SuccessUpdated', data: updatedStatus });
      }
    }
    return res.status(500).send({ message: ' Error in Updating Product.' });
  })
module.exports = router;