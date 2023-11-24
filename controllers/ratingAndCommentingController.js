const RatingsAndComments = require("./../models/ratingAndCommentingModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllRatingsAndComments = catchAsync(async (req, res, next) => {
  try {
    const ratings = await RatingsAndComments.find();
    res.status(200).json({
      status: "sucess",
      results: ratings.length,
      data: {
        ratings,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});

exports.createRatingAndComment = catchAsync(async (req, res, next) => {
  try {
    const newRating = await RatingsAndComments.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        rating: newRating,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});

exports.getOneRatingAndComment = catchAsync(async (req, res, next) => {
  try {
    const rating = await RatingsAndComments.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        rating,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});
