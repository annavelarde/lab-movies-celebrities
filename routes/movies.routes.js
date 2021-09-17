const router = require("express").Router();

// all your routes here

/* GET home page */
router.get("/", (req, res, next) => {
  console.log("Anna went here");
});

module.exports = router;
