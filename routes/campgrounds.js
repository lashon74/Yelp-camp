const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, validateCampground, isAuthor } = require("../middleware");
const campground = require("../controllers/campgrounds");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

// FIle that contains all routes with router for a certain webpage

router
  .route("/")
  .get(catchAsync(campground.index))
  .post(isLoggedIn, upload.array('image'),  validateCampground, catchAsync(campground.createCampground));
  

router.get("/new", isLoggedIn, campground.renderNewFrom);

router
  .route("/:id")
  .get(catchAsync(campground.showCampground))
  .put(
    isLoggedIn,
    isAuthor,
    upload.array('image'),
    validateCampground,
    catchAsync(campground.updateCampground)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(campground.deleteCampground));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campground.renderEditForm)
);

module.exports = router;
