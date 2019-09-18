import express from 'express';
import {PORT, BOT_TOKEN, SECURE_TOKEN} from './config/app.config';
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

let state = [];

const bot = new Telegraf(BOT_TOKEN, {
	telegram: {
		agent: socksAgent
	}
});

const getCurrentData = () => axios.get(`https://api.vk.com/method/wall.get?owner_id=-186049874&v=5.101&access_token=${SECURE_TOKEN}`);

const compareData = (ctx) => {
	axios.get(`https://api.vk.com/method/wall.get?owner_id=-186049874&count=2&v=5.101&access_token=${SECURE_TOKEN}`)
		.then((res) => {
			const lastPost = res.data.response.items.find(item => !item.is_pinned);

			if (!state.find(({id}) => lastPost.id === id)) {
				ctx.reply(`https://vk.com/avtomat_toys?w=wall${lastPost.owner_id}_${lastPost.id}`);

				state.push(lastPost);
				axios.put('https://igrushechki-257a5.firebaseio.com/posts.json', state);
			}
		});
};

bot.start(async ctx => {
	const posts = await getCurrentData();
	await axios.put('https://igrushechki-257a5.firebaseio.com/posts.json', posts.data.response.items);
	state = posts.data.response.items;

	setInterval(() => compareData(ctx), 2000);
});
bot.launch();

app.listen(PORT, '0.0.0.0', error => {
	if (error) console.error(`Something going wrong, ${error}`);
	else console.log(`Server is working on port: ${PORT}`);
});