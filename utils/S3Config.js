const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

//configuring the AWS environment
AWS.config.update({
    accessKeyId: process.env.S3_UPLOAD_KEY,
    secretAccessKey: process.env.S3_UPLOAD_SECRET,
    region: process.env.S3_UPLOAD_REGION
});

var s3 = new AWS.S3();

export const S3Upload = (fileName) => {

    var fileContent = fs.readFileSync(fileName)
    //configuring parameters
    var params = {
        Bucket: process.env.S3_UPLOAD_BUCKET,
        Body: fileContent,
        Key: "folder/" + Date.now() + "_" + path.basename(fileName)
    };

    s3.upload(params, function (err, data) {
        //handle error
        if (err) {
            console.log("Error", err);
        }

        //success
        if (data) {
            console.log("Uploaded in:", data.Location);
        }
    });
}