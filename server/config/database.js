const mongoose = require("mongoose");
require("dotenv").config();
exports.connect = () => {
  mongoose
    .connect(process.env.MONGODB_URl)
    .then(() => {
      console.log("database connected successfully");
    })
    .catch((err) => {
      console.log("error connecting to Mongodb database");
      console.log(err);
      process.exit(1);
    });
};
