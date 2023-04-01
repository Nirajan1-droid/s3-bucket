const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const app = express();
const fs = require("fs");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
AWS.config.update({
    accessKeyId: 'BAKIA3IPNHJUDRRWIQKP6',
    secretAccessKey: 'NEEH3XjFi/8LIAdNoKtWESRmmTtBB1YinwD/lRFf5'
  });//don't try this access key, i modified before commiting

const s3 = new AWS.S3();



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });


app.post('/htmlup', upload.single('fileData'), async(req, res) => {
  
    const name =   req.file.filename;
    console.log("name", name);
    const basename = path.basename(name, path.extname(name));
    console.log(basename);
  const fileBuffer = fs.createReadStream(`./images/${name}`);





  const videoPath = path.join(__dirname, `/images/${basename}.mp4`);
  const audioPath = path.join(__dirname, `/images/${basename}.mp3`);
  
  ffmpeg(videoPath)
    .output(audioPath)
    .noVideo()
    .on('end', () => {
      console.log('Audio extraction finished');
    })
    .on('error', (err) => {
      console.error(`Error extracting audio: ${err.message}`);
    })
    .run();







});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
