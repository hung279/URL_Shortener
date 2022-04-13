const Url = require("./../models/url.model");
const asyncHandle = require("./../middlewares/asyncHandle");
const AppError = require("./../utils/appError");

const getHome = (req, res) => {
  res.render("home");
};

const getShortUrl = asyncHandle(async (req, res, next) => {
  const url = await Url.findOne({ urlCode: req.params.code });
  //console.log(url);
  if (!url) {
    return next(new AppError("Not found url with code", 404));
  }

  res.redirect(url.orgUrl);
});

const creatUrl = asyncHandle(async (req, res, next) => {
  const url = await Url.create(req.body);

  if (!url.isUrl(url.orgUrl)) {
    return next(new AppError("Invalid URL", 400));
  }

  //console.log(`${req.protocol}://${req.get("host")}/${url.urlCode}`);

  res.render("shorten", {
    url: `${req.protocol}://${req.get("host")}/${url.urlCode}`,
    pathHome: "/",
  });
  //res.status(201).json(url);
});

const updateUrl = asyncHandle(async (req, res, next) => {
  const { id } = req.params;
  const url = await Url.findByIdAndUpdate(id, req.body);

  if (!url) {
    return next(new AppError("Not found url with ID", 404));
  }

  res.status(200).json({ message: "Update URL successfully" });
});

const deleteUrl = asyncHandle(async (req, res, next) => {
  const { id } = req.params;
  const url = await Url.deleteByIdAndDelete(id);

  if (!url) {
    return next(new AppError("Not found url with ID", 404));
  }

  res.status(200).json({ message: "Delete URL successfully" });
});

module.exports = {
  getHome,
  creatUrl,
  getShortUrl,
};
