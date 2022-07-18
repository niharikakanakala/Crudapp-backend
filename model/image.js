const mongoose = require("mongoose");

const Image = new mongoose.Schema({
    imageName: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
      min: 6,
      max: 1024,
    },
    imageDetails: {
      type: String,
      required: true,
      min: 6,
      max: 1024,
    }
  });

  module.exports = mongoose.model('image', Image );