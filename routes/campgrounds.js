const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, validateCampground, isAuthor } = require("../middleware");
const campground = require('../controllers/campgrounds')

router.route('/')
  .get(catchAsync(campground.index))
  .post(isLoggedIn, validateCampground, catchAsync(campground.createCampground));

router.get("/new", isLoggedIn, campground.renderNewFrom);

router
  .route("/:id")
  .get(catchAsync(campground.showCampground))
  .put(isAuthor, validateCampground, catchAsync(campground.updateCampground))
  .delete(isLoggedIn, isAuthor, catchAsync(campground.deleteCampground));

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campground.renderEditForm));

module.exports = router;
