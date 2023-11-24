const express = require("express");
const ratingAndCommentingController = require("./../controllers/ratingAndCommentingController");

const router = express.Router({ mergeParams: true });

router
  .route("/getallratings")
  .get(ratingAndCommentingController.getAllRatingsAndComments);

router
  .route("/createrating")
  .post(ratingAndCommentingController.createRatingAndComment);

router.route("/:id").get(ratingAndCommentingController.getOneRatingAndComment);

module.exports = router;
