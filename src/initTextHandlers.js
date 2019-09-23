const {STICKER_CLOWN, STICKER_WASHING} = require('./stickerConstants');

const initTextHandlers = (bot) => {
	bot.on('text', ctx => {
		const {text} = ctx.message;
		
		if (text.toLowerCase().includes('клоун')) {
			ctx.replyWithSticker(STICKER_CLOWN);
		} else if (text.includes('?')) {
			ctx.replyWithSticker(STICKER_WASHING, {reply_to_message_id: ctx.message.message_id});
		}
	});
};

module.exports = initTextHandlers;