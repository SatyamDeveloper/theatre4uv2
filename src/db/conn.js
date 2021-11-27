const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL || "mongodb://localhost/theatre4u";

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));
