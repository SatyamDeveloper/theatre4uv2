const mongoose = require("mongoose");

const websiteSchema = new mongoose.Schema({
  filter: [
    {
      link: { type: String },
      value: { type: String },
    },
  ],
  searchListData: {
    type: Array,
  },
  views: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Website", websiteSchema);
