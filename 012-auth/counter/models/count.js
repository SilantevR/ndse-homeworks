const { Schema, model } = require("mongoose");

const CountSchema = new Schema({
  book: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});

const Counter = model("Counter", CountSchema);
module.exports = Counter;
