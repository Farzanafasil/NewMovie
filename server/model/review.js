const mongoose = require("mongoose");
const movies = require('../model/Movies');
const users = require('./User');

const reviewSchema = mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "movies",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Reference to the User model
  },
  review: String,
  rating: Number,
});

const reviewModel = mongoose.model("review", reviewSchema);
module.exports = reviewModel;
