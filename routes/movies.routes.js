const router = require("express").Router();
const Movie = require("../models/movie.model");
const Celebrity = require("../models/Celebrity.model");
// all your routes here

/* GET home page */
// router.get("/", (req, res, next) => {
//   console.log("what's that?");
// });

router.get("/create", (req, res) => {
  Celebrity.find().then((celebritiesDB) => {
    res.render("movies/new-movie", { celebritiesDB });
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

//movie details page router

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

//Deleting Movies

router.post("/:id/delete", (req, res) => {
  //   Movie.deleteOne({ _id: new mongoose.mongo.ObjectId(req.params.id) }). you can also do it like that
  const { deleteId } = req.params.id;

  Movie.findByIdAndDelete(deleteId)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => {
      console.error("Error: ", err);
      res.redirect("/");
    });
});

//Editing Movies

router.get("/:id/edit", (req, res) => {
  const { movieId } = req.params.id;

  const updateMovie = Movie.findById(movieId);
  const celebrity = Celebrity.find();

  Promise.all([updateMovie, celebrity])

    .then(([updateMovie, celebrity]) => {
      res.render("movies/edit-movie", { updateMovie, celebrity });
    })
    .catch((err) => {
      console.error("Error: ", err);
      res.redirect("/");
    });
});

module.exports = router;
