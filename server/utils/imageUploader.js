const cloudinary = require("cloudinary");

exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
  try {
    const options = { folder };
    if (height) {
      options.height = height;
    }
    if (quality) {
      options.quality = quality;
    }
    options.resource_type = "auto";

    return await cloudinary.uploader.upload(file.tempFilePath, options);
  } catch (error) {
    console.log(" cloudinary middleware error: " + error.message);

    return Promise.reject(error);
  }
};
exports.uploadVideoToCloudinary = async (file, folder) => {
  try {
    const options = { folder, resource_type: "video" };
    const uploadResult = await cloudinary.v2.uploader.upload(
      file.tempFilePath,
      options
    );
    return uploadResult;
  } catch (error) {
    console.log("Cloudinary upload video error: " + error.message);
    throw error; // Re-throw the error to be caught by the calling function
  }
};
