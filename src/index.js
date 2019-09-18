import express from 'express';
import {PORT, BOT_TOKEN, ACCESS_TOKEN} from './config/app.config';
import initMiddlewares from './middlewares/app.middlewares.js';
import Telegraf from 'telegraf';
import HttpsProxyAgent from 'https-proxy-agent';
import axios from 'axios';

const socksAgent = new HttpsProxyAgent({
	host: '51.38.71.101',
	port: '8080'
});

const app = express();
initMiddlewares(app);

/* axios.get(`https://api.vk.com/method/friends.getOnline?v=5.52&access_token=${ACCESS_TOKEN}`).then((res) => {
	console.log(res);
}); for activation add a ACCESS_TOKEN to .env file */

const bot = new Telegraf(BOT_TOKEN, {
	telegram: {
		agent: socksAgent
	}
});

bot.start(ctx => ctx.reply('Welcome'));
bot.catch(err => {
	console.log('Ooops', err);
});
bot.help(ctx => ctx.reply('Send me a sticker'));
bot.on('sticker', ctx => ctx.reply('👍'));
bot.hears('hi', ctx => ctx.reply('Hey there'));
bot.launch();

app.listen(PORT, '0.0.0.0', error => {
	if (error) console.error(`Something going wrong, ${error}`);
	else console.log(`Server is working on port: ${PORT}`);
});