const cloudinary = require("cloudinary").v2;

exports.cloudinaryConnection = async () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });
  } catch (error) {
    console.log("error while cloudinary connection : ", error);
  }
};
