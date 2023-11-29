require("./src/config/mongoose");
const express = require("express");

require("dotenv").config();
const PORT = process.env.PORT || 2000;
const path = require("path");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const { productRoutesV2, productRoutesV1 } = require("./src/routes");

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/", (req, res) => {
//   res.send({
//     status: "Successfully",
//     message: "Welcome to Express API",
//   });
// });
app.use("/api/v1", productRoutesV1);
app.use("/api/v2", productRoutesV2);
app.use("/static", express.static(`${__dirname}/src/public/images`));
app.use((req, res, next) => {
  res.status(404);
  res.send({
    status: "Failed",
    message: "Resource " + req.originalUrl + " Not Found",
  });
});

app.listen(PORT, () => {
  console.log(`Express is on PORT:${PORT}`);
});
