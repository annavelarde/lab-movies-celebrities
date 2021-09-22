const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model.js");

// all your routes here

/* GET home page */
// router.get("/", (req, res, next) => {
//   console.log("");
// });

//all routes

router.get("/create", (req, res) => {
  //end point. address
  res.render("celebrities/new-celebrity");
});

router.post("/create", (req, res) => {
  const { name, occupation, catchPhrase } = req.body; //destructuring.destructurar
  // Celeb.create(req.body).then()

  Celebrity.create({ name, occupation, catchPhrase }) //va en la base de datos
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((err) => {
      console.error("Error creating Celebrity:", err);
      res.render("celebrities/new-celebrity", { ...req.body });
    });
});

router.get("/", (req, res, next) => {
  Celebrity.find()
    .then((allcelebrities) => {
      console.log(allcelebrities);
      res.render("celebrities/celebrities", { allcelebrities });
      // "You never pass an array, you always pass an object. Always." said And
    })
    .catch((err) => {
      console.log("No puedo leer el documento ", err);
      res.redirect("/");
    });
  // We display the data, celebrities.hbs
});

module.exports = router;
