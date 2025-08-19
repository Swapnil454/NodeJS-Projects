const express = require("express");
const URL = require("../models/url");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        if(!req.user) return res.redirect("/login");
        const allurls = await URL.find({ createdBy: req.user._id});
        console.log("Retrieved URLs:", allurls);
        return res.render('home', {
            urls: allurls,
        });
    } catch (error) {
        console.error("Error fetching URLs:", error);
        return res.render('home', {
            urls: [],
        });
    }
});

router.get("/signup", (req, res) => {
    return res.render("signup");
})

router.get("/login", (req, res) => {
    return res.render("login");
})

module.exports = router;