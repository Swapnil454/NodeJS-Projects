const express = require("express")
const path = require("path")
const multer = require("multer")
const fs = require("fs")

// Create uploads directory if it doesn't exist
if (!fs.existsSync("./uploads")) {
    fs.mkdirSync("./uploads");
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads")
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
})

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit per file
    },
    fileFilter: function(req, file, cb) {
        // Accept images only
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
})

const app = express()
const port = 8001;

app.use(express.urlencoded({extended: false}))
app.use('/uploads', express.static('uploads'))

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

app.get("/", (req, res) => {
    return res.render("home")
})

app.post('/upload', upload.array('images', 5), function (req, res) {
    try {
        if (!req.files || req.files.length === 0) {
            return res.render("home", { error: "Please select at least one file to upload" });
        }

        const uploadedFiles = req.files.map(file => ({
            filename: file.filename,
            path: `/uploads/${file.filename}`
        }));

        return res.render("home", { 
            success: true,
            files: uploadedFiles,
            message: req.body.message || ''
        });

    } catch (error) {
        console.error('Upload error:', error);
        return res.render("home", { error: error.message });
    }
})

app.listen(port, ()=> console.log(`server started at port : ${port}`))