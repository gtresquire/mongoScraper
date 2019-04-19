var mongoose = require("mongoose");

// Save reference to Schema constructor
var Schema = mongoose.Schema;

// Create a new UserSchema object 
var ArticleSchema = new Schema({
  // `headline` is required, and of type String
  headline: {
    type: String,
    required: true
  },
  // `url` is required, and of type String
  url: {
    type: String,
    required: true
  },
  // `summary` is required, and of type String
  summary: {
    type: String,
    required: true
  },
  // `save` is required, and of type String
  saved: {
    type: Boolean,
    default: false
  },
  // `note` is an object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // Allows attaching Note to associated Article 
  note: [{
    type: Schema.Types.ObjectId,
    ref: "Note"
  }]
});

// Creates model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export Article model
module.exports = Article;