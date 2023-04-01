const express = require("express");
const app = express();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

if (!fs.existsSync("./images")) {
  fs.mkdirSync("./images");
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });

app.post("/htmlup", upload.single("myFile"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.listen(5000, () => {
  console.log("backend is running ");
});
