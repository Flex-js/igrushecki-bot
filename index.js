const {BOT_TOKEN, SECURE_TOKEN} = require('./src/config/app.config');
const Telegraf = require('telegraf');
const axios = require('axios');
const initCommandHandlers = require('./src/initCommandHandlers');
const initTextHandlers = require('./src/initTextHandlers');

let isStarted = false;
let state = [];

const bot = new Telegraf(BOT_TOKEN);

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
		})
		.catch(e => console.error(e));
};

bot.start(async ctx => {
	try {
		if (!isStarted) {
			console.log('bot is started');
			const posts = await getCurrentData();
			await axios.put('https://igrushechki-257a5.firebaseio.com/posts.json', posts.data.response.items);
			state = posts.data.response.items;
	
			setInterval(() => compareData(ctx), 60000);
	
			isStarted = true;
		}
	} catch (error) {
		console.error(error);
	}
});

initCommandHandlers(bot);
initTextHandlers(bot);

bot.launch();