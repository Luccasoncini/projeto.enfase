const mongoose = require("mongoose");

const QuestionSchema = mongoose.Schema({
  questionDescription: String,
  Options: [{
    optionDescription: String,
    isTrue: Boolean    
  }],
});

module.exports = mongoose.model("Question", QuestionSchema);
