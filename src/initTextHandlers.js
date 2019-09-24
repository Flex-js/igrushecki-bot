const {STICKER_CLOWN, STICKER_WASHING} = require('./stickerConstants');
const {getRandomInt} = require('./helpers');

const initTextHandlers = (bot) => {
	bot.on('text', ctx => {
		const {text} = ctx.message;
		const lowerCaseText = text.toLowerCase();
		const phrases = [
			'я согласен',
			'я не согласен',
			'ну это, конечно, полный отстой',
			'тебе бы во Flex.js контрибьютить',
			'такой клоун',
			'с кем ты говоришь?',
			'троллинг будет происходить 3 недели',
			'иди тащи игрушечку',
			'иди пиши бэк',
			'иди пиши фронт',
			'это кстати правда'
		];
		
		if (lowerCaseText.includes('привет')) {
			ctx.reply('Привет, лошок', {reply_to_message_id: ctx.message.message_id});
		} else if (lowerCaseText.includes('клоун')) {
			ctx.replyWithSticker(STICKER_CLOWN);
		} else if (text.includes('?')) {
			ctx.replyWithSticker(STICKER_WASHING, {reply_to_message_id: ctx.message.message_id});
		} else if (Math.random() <= 0.1) { // this condition should always be in the end
			ctx.reply(phrases[getRandomInt(phrases.length)]);
		}
	});
};

module.exports = initTextHandlers;