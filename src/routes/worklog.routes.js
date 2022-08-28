const express = require("express");
const router = express.Router();
const {
  getworkLog,
  setworkLog,
  updateworkLog,
  deleteworkLog,
} = require("../controllers/worklog.controller");

router.route("/").get(getworkLog).post(setworkLog);

router.route("/:id").delete(deleteworkLog).put(updateworkLog);

module.exports = router;
