const prod = process.env.NODE_ENV === 'production';
module.exports = {
  env: {
    BASE_URL: prod ? 'https://smart-tipz.vercel.app/' : 'http://localhost:3000/',
    HOST: 'localhost',
    DB_DATABASE: 'smart-tipz',
    DB_USERNAME: 'postgres',
    DB_PASSWORD: 'admin',
    DB_PORT: 5432,
    PORT: 3000,
    EMAIL_SECRET: 'atemperaryemailsecretkey',
    SECRET_KEY: 'atemperarysecretkey',
    TEMP_EMAIL: 'safaribooks0020@gmail.com',
    TEMP_MAILPASS: 'safaribooks4854'

  }
}