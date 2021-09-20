const router = require("express").Router();
const Movie = require("../models/movie.model.js");
// all your routes here

/* GET home page */
// router.get("/", (req, res, next) => {
//   console.log("what's that?");
// });

router.get("/create", (req, res) => {
  res.render("movies/new-movie");
});

router.post("/create", (req, res) => {
  const { title, genre, plot, cast } = req.body; //destructuring.destructurar

  Movie.create({ title, genre, plot, cast })
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => {
      console.error("Error creating Celebrity:", err);
      res.render("movies/new-movie", {
        errorMessage: "Cannot create movie",
      });
    });
});

router.get("/", (req, res, next) => {
  Movie.find()
    .then((allmovies) => {
      console.log(allmovies);
      res.render("movies/movies", { movies: allmovies });
    })
    .catch((err) => {
      console.log("No puedo leer el documento ", err);
    });
});

module.exports = router;
