const mongoose = require("mongoose");
const shortid = require("shortid");

const useSchema = new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    firstName: { type: String, required: true, min: 1, max: 255 },
    lastName: { type: String, required: true, min: 1, max: 255 },
    email: { type: String, required: true, min: 6, max: 255 },
    address: { type: String, required: true, min: 1, max: 255 },
    phone: { type: Number, required: true },
    portCode: { type: Number, required: true },
    city: { type: String, required: true, min: 1, max: 255 },
    noteOrder: { type: String, required: true },
    total: { type: Number, required: true },
    cartItems: { type: Array, required: true },
})
module.exports = mongoose.model("order", useSchema)