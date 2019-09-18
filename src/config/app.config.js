const dotenv = require('dotenv');

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const SECURE_TOKEN = process.env.SECURE_TOKEN || '';

module.exports = {
	BOT_TOKEN, SECURE_TOKEN
};
