const router = require("express").Router();
const Movie = require("../models/movie.model.js");
// all your routes here

/* GET home page */
router.get("/", (req, res, next) => {
  console.log("Anna went here");
});

router.get("/create", (req, res) => {
  res.render("movies/new-movie");
});

router.post("/create", (req, res) => {
  const { title, genre, plot, cast } = req.body; //destructuring.destructurar

  Movie.create({ title, genre, plot, cast })
    .then((movies) => {
      res.redirect("/movies");
    })
    .catch((err) => {
      console.error("Error creating Celebrity:", err);
      res.render("movies/new-movie");
    });
});

module.exports = router;
