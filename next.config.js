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
    TEMP_MAILPASS: 'safaribooks4854'

  }
}