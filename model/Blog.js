const mongoose = require("mongoose");
const shortid = require("shortid");
const reviewSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      email: { type: String, required: true, min: 6, max: 255 },
      comment: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );
const useSchema = new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    title: { type: String, required: true },
    img_url: { type: String, required: true },
    description: { type: String, required: true},
    categoryBlog: { type: String, required: true},
    reviews: [reviewSchema]
    },
    {
        timestamps: true,
    })
module.exports = mongoose.model("blogs", useSchema)