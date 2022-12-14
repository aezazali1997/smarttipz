const prod = process.env.NODE_ENV === 'production';
module.exports = {
  images: {
    domains: [
      `smart-tipz-data-bucket.s3.amazonaws.com`,
      `${process.env.S3_UPLOAD_BUCKET}.amazonaws.com`,
      'smart-tipz-data-bucket.s3.ap-southeast-1.amazonaws.com',
      'thumbs.dreamstime.com'
    ]
  },
  async headers() {
    return [
      {
        source: '/.well-known/apple-developer-merchantid-domain-association',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json'
          }
        ]
      }
    ];
  }
};
