const mongoose = require("mongoose");
const shortid = require("shortid");
const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, default: 0 },
    email: { type: String, required: true, min: 6, max: 255 },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const useSchema = new mongoose.Schema({
  _id: { type: String, default: shortid.generate },
  name: { type: String, required: true, max: 255 },
  category: { type: String, required: true, max: 255 },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  brand: { type: String, required: true, max: 255 },
  rate: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  img_url: { type: String, required: true },
  numReviews: { type: Number, default: 0, required: true },
  reviews: [reviewSchema],
})
module.exports = mongoose.model("products", useSchema)