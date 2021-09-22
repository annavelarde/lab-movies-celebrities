const router = require("express").Router();
const Movie = require("../models/movie.model");
const Celebrity = require("../models/Celebrity.model");
// all your routes here

/* GET home page */
// router.get("/", (req, res, next) => {
//   console.log("what's that?");
// });

router.get("/create", (req, res) => {
  Celebrity.find().then((celebrities) => {
    res.render("movies/new-movie", { celebrities });
  });
});

router.post("/create", (req, res) => {
  const { title, genre, plot, cast } = req.body; //destructuring.destructurar
  Movie.create({ title, genre, plot, cast })
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => {
      console.error("Error creating Celebrity:", err);
      res.redirect("movies/create");
    });
});

router.get("/", (req, res, next) => {
  Movie.find()
    .then((allmovies) => {
      console.log(allmovies);
      res.render("movies/movies", { allmovies });
    })
    .catch((err) => {
      console.log("No puedo leer el documento ", err);
    });
});

router.get("/:id", (req, res) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then((singleMovie) => {
      if (!singleMovie) {
        res.redirect("/");
      }
      res.render("movies/movie-details", { singleMovie });
    })
    .catch((err) => {
      console.error("Error: ", err);
      res.redirect("/");
    });
});

router.post("/:id/delete", (req, res) => {
  //   Movie.deleteOne({ _id: new mongoose.mongo.ObjectId(req.params.id) }). you can also do it like that
  Movie.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => {
      console.error("Error: ", err);
      res.redirect("/");
    });
});

module.exports = router;
