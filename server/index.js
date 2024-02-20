const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const userRoute = require("./routes/User");
const profileRoute = require("./routes/Profile");
const CourseRoute = require("./routes/Course");
const paymentRoute = require("./routes/Payments");
const catagoryRoute = require("./routes/Catagory");
require("dotenv").config();
const { cloudinaryConnection } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dataBase = require("./config/database");
dataBase.connect();
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);
cloudinaryConnection();

app.use("/api/v1/auth", userRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/course", CourseRoute);
app.use("/api/v1/category", catagoryRoute);
app.use("/api/v1/payment", paymentRoute);

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "server is running",
  });
});
// dataBase();
app.listen(process.env.PORT, (req, res) => {
  console.log(`server is running on ${process.env.PORT}`);
});
