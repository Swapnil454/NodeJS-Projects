const express = require("express");
const { handleSignup, handleLogin, handleLogout } = require("../controllers/user");

const router = express.Router();

router.get("/login", (req, res) => {
    return res.render("login");
});
router.post("/",handleSignup)
router.post("/login",handleLogin)
router.get("/logout", handleLogout)

module.exports = router;