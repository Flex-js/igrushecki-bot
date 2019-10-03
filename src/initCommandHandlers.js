const {STICKER_CLOWN, STICKER_ZHEST} = require('./stickerConstants');

const commands = {
	takoy_or: ctx => ctx.reply('😁'),
	zhest: ctx => ctx.replyWithSticker(STICKER_ZHEST),
	takoy_clown: ctx => ctx.replyWithSticker(STICKER_CLOWN),
	wash: async ctx => {
		const reply = ctx.update.message.reply_to_message;
		
		if (reply && !reply.from.is_bot) {
			await ctx.reply('💦💦💦', {reply_to_message_id: reply.message_id});
			ctx.reply('ПШШШШ ПШШШШ');
		} else if (reply && reply.from.is_bot) {
			await ctx.reply('💦💦💦', {reply_to_message_id: ctx.message.message_id});
			ctx.reply('Хотел умыть бота, а умылся сам, АХАХАХХА');
		} else {
			ctx.reply(
				'_Используйте эту команду в ответ на сообщение, чтобы умыть собеседника_',
				{parse_mode: 'Markdown', reply_to_message_id: ctx.message.message_id}
			);
		}
	}
};

const initCommandHandlers = (bot) => {
	for (let command in commands) {
		bot.command(command, commands[command]);
	}
};

module.exports = {
	commands,
	initCommandHandlers
};