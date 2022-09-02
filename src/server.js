const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 3006;
const { authPage } = require("./auth");

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  "/api/worklog",
  authPage(["manager", "admin"]),
  require("./routes/worklog.routes")
);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
