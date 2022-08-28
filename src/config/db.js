const mongoose = require("mongoose");
//mongoose.set("useNewUrlParser", true);
//mongoose.set("useUnifiedTopology", true);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`.red.bgCyan);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
