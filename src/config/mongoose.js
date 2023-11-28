const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGOOSE_url;
mongoose.connect(url);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongoose connection error: "));
db.once("open", () => console.log("Mongoose Connected!🚀"));
