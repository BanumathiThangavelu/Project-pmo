const mongoose = require("mongoose");

const loggedWorkSchema = new mongoose.Schema(
  {
    taskID: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "please add a task_ID"],
    },
    logdate: {
      type: Date,
      required: [true, "please enter date"],
    },
    hour_spent: {
      type: Number,
      required: [true, "please enter hour you spent"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("workLog", loggedWorkSchema);
