const express = require("express");
const { handlePostUrl, handleAllUser, HandleUrlAnalytics, handleVisitUrl, handleUpdateUrl, handleDeleteUrl } = require("../controllers/url");

const router = express.Router();

router.post("/", handlePostUrl)
router.get("/allurl", handleAllUser)
router.get("/analytics/:shortId",HandleUrlAnalytics)
router.get("/:shortId", handleVisitUrl)
router.patch("/:shortId", handleUpdateUrl)
router.delete("/:shortId", handleDeleteUrl)

module.exports = router;