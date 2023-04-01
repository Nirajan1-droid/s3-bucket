const AWS = require('aws-sdk');
const fs = require('fs');

// Set up AWS credentials
AWS.config.update({
  accessKeyId: 'BAKIA3IPNHJUDRRWIQKP6',
  secretAccessKey: 'NEEH3XjFi/8LIAdNoKtWESRmmTtBB1YinwD/lRFf5'
});

// Set up the S3 object
const s3 = new AWS.S3();

// Read the file into a buffer
const fileBuffer = fs.readFileSync('note.txt');
console.log(fileBuffer);
// <Buffer 73 33 20 61 6e 64 20 65 63 32 20 61 72 65 20 74 77 6f 20 64 69 66 66 65 72 65 6e 74 20 65 63 6f 73 79 73 74 65 6d 73 0a 77 69 74 68 20 64 69 66 66 65 ... 3564 more bytes>
// Set up the S3 upload parameters
const params = {
  Bucket: 'nirajannirajan',
  Key: 'uploads/index.txt',
  Body: fileBuffer
};
console.log(params?.Key);
    // console.log(params.Body);

// Upload the file to S3
s3.upload(params, (err, data) => {
  if (err) {
    console.log('Error uploading file:', err);
  } else {
    console.log('File uploaded successfully. ETag:', data.ETag);
  }
});