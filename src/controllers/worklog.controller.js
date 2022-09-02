const asyncHandler = require("express-async-handler");

const workLog = require("../models/worklog.model");
//const tasks = require("../models/task.model");
//@desc get worklog
//@route GET {{URL}}/api/worklog
//@access Private
const getworkLog = asyncHandler(async (req, res) => {
  const loggedWork = await workLog.find({}).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    result: loggedWork,
    message: "Fetched all the records",
  });
});

//@desc set worklog
//@route POST {{URL}}/api/worklog
//@access Private
const setworkLog = asyncHandler(async (req, res) => {
  const { taskID, logdate, hour_spent, description } = req.body;
  if (!taskID && !logdate && !hour_spent && !description) {
    res.status(400);
    throw new Error("Please add a all the fields");
  }
  const loggedWork = await workLog.create({
    taskID: taskID,
    logdate: logdate,
    hour_spent: hour_spent,
    description: description,
  });
  res
    .status(200)
    .json({ success: true, result: loggedWork, message: "Successfully added" });
});

//@desc update worklog
//@route PUT {{URL}}/api/worklog/:id
//@access Private
const updateworkLog = asyncHandler(async (req, res) => {
  const loggedWork = await workLog.findById(req.params.id);

  if (!loggedWork) {
    res.status(400);
    throw new Error("log not found");
  }

  const updatedworkLog = await workLog.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedworkLog);
});

//@desc delete worklog
//@route DELETE {{URL}}/api/worklog/:id
//@access Private
const deleteworkLog = asyncHandler(async (req, res) => {
  const loggedWork = await workLog.findById(req.params.id);

  if (!loggedWork) {
    res.status(400);
    throw new Error("log not found");
  }

  await loggedWork.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getworkLog,
  setworkLog,
  updateworkLog,
  deleteworkLog,
};
