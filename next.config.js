const prod = process.env.NODE_ENV === 'production';
module.exports = {
  env: {
    BASE_URL: prod ? 'https://smart-tipz.herokuapp.com/' : 'http://localhost:3000/',
    HOST: 'smart-tipz-db.cglz1r4s1t1g.ap-southeast-1.rds.amazonaws.com',
    DB_DATABASE: 'postgres',
    DB_USERNAME: 'postgres',
    DB_PASSWORD: 'Cipher$1357',
    DB_PORT: 3306,
    PORT: 3000,
    EMAIL_SECRET: 'atemperaryemailsecretkey',
    SECRET_KEY: 'atemperarysecretkey',
    TEMP_EMAIL: 'safaribooks0020@gmail.com',
    TEMP_MAILPASS: 'safaribooks4854',
    S3_UPLOAD_KEY: "AKIARG4Q332L5DQGZTV4",
    S3_UPLOAD_SECRET: "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",
    S3_UPLOAD_BUCKET: "smart-tipz-data-bucket",
    S3_UPLOAD_REGION: "Asia Pacific (Singapore) ap-southeast-1",
    SENDER_EMAIL: "mousuleman@gmail.com",
    SENDGRID_API_KEY: "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"
  },
  images: {
    domains: [
      `${process.env.S3_UPLOAD_BUCKET}.amazonaws.com`,
      'smart-tipz-data-bucket.s3.ap-southeast-1.amazonaws.com',
      'thumbs.dreamstime.com'
    ],
  }
}