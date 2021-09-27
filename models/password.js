const mongoose = require("mongoose");
const { Schema } = mongoose;

const passwordSchema = new Schema({
  pwd: { type: String, required: true, trim: true },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Password", passwordSchema);
