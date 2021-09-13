const prod = process.env.NODE_ENV === 'production';
module.exports = {
  env: {
    BASE_URL: prod ? 'https://smart-tipz.herokuapp.com/' : 'http://localhost:3000/',
    HOST: 'chunee.db.elephantsql.com',
    DB_DATABASE: 'cnjqyhlh',
    DB_USERNAME: 'cnjqyhlh',
    DB_PASSWORD: 'UjxgpDUN-LisiJugvQFmDKqzZ7xp3Y3v',
    DB_PORT: 5432,
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