require('dotenv').config();

module.exports = {

    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGODB_URI,
    DOMAIN: process.env.DOMAIN
}