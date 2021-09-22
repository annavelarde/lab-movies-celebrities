// const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const movieSchema = new Schema({
  title: String,
  genre: String,
  plot: String,
  cast: [{ type: Schema.Types.ObjectId, ref: "Celebrity" }],
});

//ref://Array of object IDs referencing the Celebrity model (basically, the array of celebrities' IDs)

const Movie = model("Movie", movieSchema);
//export the celebrity Schema
module.exports = Movie;

//ref always needs to be the same as the collection. this case Movie.
