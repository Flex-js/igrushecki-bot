import express from 'express';
import {PORT, BOT_TOKEN} from './config/app.config';
import initMiddlewares from './middlewares/app.middlewares.js';
import Telegraf from 'telegraf';
import SocksAgent from 'socks5-https-client/lib/Agent';

const socksAgent = new SocksAgent({
	socksHost: '173.44.34.106',
	socksPort: '34276'
});

const app = express();
initMiddlewares(app);

const bot = new Telegraf(BOT_TOKEN, {
	telegram: {
		agent: socksAgent
	}
});

bot.start(ctx => ctx.reply('Welcome'));
bot.catch(err => console.log('Ooops', err));
bot.help(ctx => ctx.reply('Send me a sticker'));
bot.on('sticker', ctx => ctx.reply('👍'));
bot.hears('hi', ctx => ctx.reply('Hey there'));
bot.launch();

app.listen(PORT, '0.0.0.0', error => {
	if (error) console.error(`Something going wrong, ${error}`);
	else console.log(`Server is working on port: ${PORT}`);
});