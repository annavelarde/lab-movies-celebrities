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

  Celebrity.create({ name, occupation, catchPhrase }) //va en la base de datos
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((err) => {
      console.error("Error creating Celebrity:", err);
      res.render("celebrities/new-celebrity", {
        errorMessage: "Cannot create celebrity",
      });
    });
});

router.get("/", (req, res, next) => {
  Celebrity.find()
    .then((allcelebrities) => {
      console.log(allcelebrities);
      res.render("celebrities/celebrities", { celebrities: allcelebrities });
      // "You never pass an array, you always pass an object. Always." said And
    })
    .catch((err) => {
      console.log("No puedo leer el documento ", err);
    });
  // We display the data, celebrities.hbs
});

module.exports = router;
