const { NextApiRequest, NextApiResponse } = require("next");
const { isEmpty } = require('lodash');
const AWS = require('aws-sdk');

export default async function handler(req, res) {

    const { body, body: { fileName, fileType } } = req;

    AWS.config.update({
        accessKeyId: process.env.S3_UPLOAD_KEY,
        secretAccessKey: process.env.S3_UPLOAD_SECRET,
        region: process.env.S3_UPLOAD_REGION,
        signatureVersion: 'v4',
    });

    const S3Bucket = process.env.S3_UPLOAD_BUCKET;

    var s3 = new AWS.S3();

    if (isEmpty(body)) {
        return res.status(400).send({ error: true, message: 'No file uploaded', data: [] })
    }



    const s3Params = {
        Bucket: S3Bucket,
        Key: `uploads/${fileName}`,
        ContentType: fileType,
    };

    try {
        s3.getSignedUrl("putObject", s3Params, async (err, data) => {
            if (err) {
                return res.json({ success: false, error: err });
            }
            const returnData = {
                signedRequest: data,
                url: `https://${S3Bucket}.s3.amazonaws.com/uploads/${fileName}`
            };
            // const imageUrl = await prisma.user.update({
            //     where: {
            //         email: session.user.email
            //     },
            //     data: {
            //         business: {
            //             update: {
            //                 businessLogo: returnData.url
            //             }
            //         }
            //     }
            // })
            return res.status(200).json(returnData);
        });


    }
    catch (err) {
        return res.status(500).json(err);
    }
};


