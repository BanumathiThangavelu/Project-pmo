const asyncHandler = require("express-async-handler");

const workLog = require("../models/worklog.model");
//@desc get worklog
//@route GET {{URL}}/api/worklog
//@access Private
const getworkLog = asyncHandler(async (req, res) => {
  const loggedWork = await workLog.find();

  res.status(200).json(loggedWork);
});

//@desc set worklog
//@route POST {{URL}}/api/worklog
//@access Private
const setworkLog = asyncHandler(async (req, res) => {
  if (!req.body.taskID) {
    res.status(400);
    throw new Error("Please add a task_id");
  }
  if (!req.body.logdate) {
    res.status(400);
    throw new Error("please enter the date");
  }
  if (!req.body.hour_spent) {
    res.status(400);
    throw new Error("please enter the hour you spent");
  }
  if (!req.body.description) {
    res.status(400);
    throw new Error("Please add description");
  }

  const loggedWork = await workLog.create({
    taskID: req.body.taskID,
    logdate: req.body.logdate,
    hour_spent: req.body.hour_spent,
    description: req.body.description,
  });

  res.status(200).json(loggedWork);
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
