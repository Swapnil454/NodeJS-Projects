const {v4: uuidv4} = require("uuid")
const User = require("../models/user")
const {setUser} = require("../service/auth")

async function handleSignup(req, res) {
    const { name, email, password} = req.body;
    try {
        await User.create({
            name,
            email,
            password,
        });
        return res.redirect("/");
    } catch (error) {
        if (error.code === 11000) {
            // This error code indicates a duplicate key error (email already exists)
            return res.render("signup", {
                error: "Email already exists. Please use a different email address."
            });
        }
        // Handle other errors
        return res.render("signup", {
            error: "An error occurred during signup. Please try again."
        });
    }
}

async function handleLogin(req, res) {
    const { email, password} = req.body;
    const user = await User.findOne({
        email,
        password,
    });
    if(!user) return res.render("login",{
        error: "Invalid Username Or Password",
    });
    // const sessionId = uuidv4();
    const token = setUser(user);
    res.cookie("uid", token);
    return res.redirect("/")
}

function handleLogout(req, res) {
    res.clearCookie("uid");
    return res.redirect("/signup");
}

module.exports = {
    handleSignup,
    handleLogin,
    handleLogout,
}