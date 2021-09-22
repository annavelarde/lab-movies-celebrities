//Iteration 2
// const mongooose = require("mongoose");
// const { Schema, model } = mongoose;

//code above and below are the same. if you chose the one below, remember to add model in the line 16. otherwise, you will ave to pass mongoose.model

const { Schema, model } = require("mongoose");
//same => const { Schema, model } = require("mongoose");

const celebritySchema = new Schema({
  name: String,
  occupation: String,
  catchPhrase: String,
});
//first Celebrity: model Second // Celebrity in string: collection
const Celebrity = model("Celebrity", celebritySchema);
//export the celebrity Schema
module.exports = Celebrity;
