const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model.js");

// all your routes here

/* GET home page */
// router.get("/", (req, res, next) => {
//   console.log("");
// });

//all routes
router.get("/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", (req, res) => {
  const { name, occupation, catchPhrase } = req.body; //destructuring.destructurar

  Celebrity.create({ name, occupation, catchPhrase })
    .then((createdCelebrity) => {
      res.redirect("/celebrities");
    })
    .catch((err) => {
      console.error("Error creating Celebrity:", err);
      res.render("celebrities/new-celebrity");
    });
});

router.get("/celebrities", (req, res) => {
  Celebrity.find()
    .then((allCelebrities) => {
      console.log(allCelebrities);
      res.render("celebrities/celebrities", {
        Celebrities: allCelebrities,
      });
      // "You never pass an array, you always pass an object. Always." said And
    })
    .catch((err) => {
      console.log(err);
    });
  // We display the data, celebrities.hbs
});

module.exports = router;
