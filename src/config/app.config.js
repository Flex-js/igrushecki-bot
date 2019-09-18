const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;
const BOT_TOKEN = process.env.BOT_TOKEN || '';
const SECURE_TOKEN = process.env.SECURE_TOKEN || '';

module.exports = {
	PORT, BOT_TOKEN, SECURE_TOKEN
};
