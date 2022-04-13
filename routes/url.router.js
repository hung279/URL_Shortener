const urlController = require("./../controllers/url.controller");

const router = require("express").Router();

router.get("/", urlController.getHome);
router.get("/shorten", urlController.getHome);
router.get("/:code", urlController.getShortUrl);
router.post("/short-url", urlController.creatUrl);

module.exports = router;
