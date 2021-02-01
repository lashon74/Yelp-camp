const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Used to config cloudinary account into into app
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRECT,
});

const storage = new CloudinaryStorage({
  cloudinary,
  // Must set params so the images will be contained within a followed and the allowed formats of the images uploaded
  params: {
    folder: "Yelp-Camp",
    allowedFormats: ["jpeg", "png", "jpg"],
  },
});

module.exports = {
  cloudinary,
  storage,
};
