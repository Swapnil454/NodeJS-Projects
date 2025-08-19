const express = require("express");
const path = require("path")
const cookieParser = require("cookie-parser")

const connectMongoDB = require("./connect");
const {restricToUserLoggedIn, cheackAuth} = require("./middlewares/auth")

const urlRouter = require("./routes/url")
const staticRouter = require("./routes/staticRoute")
const userRouter = require("./routes/user")

const app = express();
const PORT = 8080;

connectMongoDB("mongodb://localhost:27017/short-url-3")
    .then(() => console.log("mongodb connect"))
    .catch((err) => console.log("error", err))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use("/url", restricToUserLoggedIn, urlRouter);
app.use("/", cheackAuth ,staticRouter)
app.use("/user", userRouter)



app.listen(PORT, () => console.log(`server started at port: ${PORT}`))