const {STICKER_CLOWN, STICKER_ZHEST} = require('./stickerConstants');

const initCommandHandlers = (bot) => {
	bot.command('takoy_or', ctx => ctx.reply('😁'));
	bot.command('zhest', ctx => ctx.replyWithSticker(STICKER_ZHEST));
	bot.command('takoy_clown', ctx => ctx.replyWithSticker(STICKER_CLOWN));
	bot.command('wash', async ctx => {
		const reply = ctx.update.message.reply_to_message;
		
		if (reply) {
			await ctx.reply('💦💦💦', {reply_to_message_id: reply.message_id});
			ctx.reply('ПШШШШ ПШШШШ');
		} else {
			ctx.reply(
				'_Используйте эту команду в ответ на сообщение, чтобы умыть собеседника_',
				{parse_mode: 'Markdown', reply_to_message_id: ctx.message.message_id}
			);
		}
	});
};

module.exports = initCommandHandlers;