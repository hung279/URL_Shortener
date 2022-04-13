const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const app = express();

dotenv.config();

const PORT = 3000;

const AppError = require("./utils/appError");
const errorHandler = require("./middlewares/errorHandle");
const urlRouter = require("./routes/url.router");

//connect to DB
require("./config/database")();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(urlRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
