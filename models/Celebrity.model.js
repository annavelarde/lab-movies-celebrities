//  Add your code here

//Iteration 2
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const celebritySchema = new Schema({
  name: String,
  occupation: String,
  catchPhrase: String,
});

const Celebrity = mongoose.model("Celebrity", celebritySchema);
//export the celebrity Schema
module.exports = Celebrity;
