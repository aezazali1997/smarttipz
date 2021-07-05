module.exports = {
  reactStrictMode: true,
}


const prod = process.env.NODE_ENV === 'production';
module.exports = {
  env: {
    BASE_URL: prod ? 'https://mercione.vercel.app' : 'http://localhost:3000'
  }
}