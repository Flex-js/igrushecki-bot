const {STICKER_CLOWN, STICKER_WASHING, STICKER_STAS} = require('./stickerConstants');
const {getRandomInt} = require('./helpers');

let shouldAnswerToCaps = true;

const initTextHandlers = (bot) => {
	bot.on('text', async ctx => {
		const {text} = ctx.message;
		const lowerCaseText = text.toLowerCase();
		const replyToMessage = {reply_to_message_id: ctx.message.message_id};
		const ctxMessageReply = ctx.message.reply_to_message;
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
			ctx.reply('Привет, лошок', replyToMessage);
		} else if (lowerCaseText.includes('клоун')) {
			ctx.replyWithSticker(STICKER_CLOWN);
		} else if (lowerCaseText.includes('зачем')) {
			ctx.reply('https://www.youtube.com/watch?v=muEEtWI2CKc', replyToMessage);
		} else if (text.includes('?')) {
			ctx.replyWithSticker(STICKER_WASHING, replyToMessage);
		} else if (lowerCaseText.includes('стас')) {
			ctx.replyWithSticker(STICKER_STAS, replyToMessage);
		}  else if (
			text.toUpperCase() === text
			&& /[А-ЯA-ZЁ]/.test(text)
			&& text.length > 1
			&& Number.isNaN(+text)
			&& shouldAnswerToCaps
		) {
			ctx.reply('ТЫ ЧЕ ОРЕШЬ, МЕШОЧЕК?', replyToMessage);

			shouldAnswerToCaps = false;
			setTimeout(() => shouldAnswerToCaps = true, 10000);
		} else if (ctxMessageReply && ctxMessageReply.from.is_bot) {
			await ctx.reply('Ты говоришь это боту, пирожок. Мне все равно', replyToMessage);
			ctx.reply('а тебе бы наливки выпить не помешало');
		} else if (Math.random() <= 0.1) { // this condition should always be in the end
			ctx.reply(phrases[getRandomInt(phrases.length)]);
		}
	});
};

module.exports = initTextHandlers;
