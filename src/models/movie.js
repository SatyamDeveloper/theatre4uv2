const mongoose = require("mongoose");
const slugify = require("slugify");

const movieSchema = new mongoose.Schema({
  trailer:{
    type: String,
    required: true,
  },
  banner: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: Array,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  rate: {
    type: Number,
    required: true,
  },
  src: {
    type: String,
  },
  director: {
    type: Array,
    required: true,
  },
  actor: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  playlist: [
    {
      src: {
        type: String,
      },
      duration: {
        type: String,
      },
      views: {
        type: Number,
      },
      slug: {
        type: String,
      },
    },
  ],
  uploadedAt:{
    type:Date,
    default:Date.now
  }
});

movieSchema.pre("validate", function (next) {
  this.title
    ? (this.slug = slugify(this.title, { lower: true, strict: true }))
    : null;
  next();
});

module.exports = mongoose.model("Movie", movieSchema);
