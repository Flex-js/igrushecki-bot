const {commands} = require('./initCommandHandlers');
const {STICKER_CLOWN, STICKER_ZHEST} = require('./stickerConstants');
const {getDefaultContext} = require('../test-helpers');

test('takoy_or()', () => {
	const context = getDefaultContext();
	commands.takoy_or(context);

	expect(context.reply).toHaveBeenCalledWith('😁');
});

test('zhest()', () => {
	const context = getDefaultContext();
	commands.zhest(context);

	expect(context.replyWithSticker).toHaveBeenCalledWith(STICKER_ZHEST);
});

test('takoy_clown()', () => {
	const context = getDefaultContext();
	commands.takoy_clown(context);

	expect(context.replyWithSticker).toHaveBeenCalledWith(STICKER_CLOWN);
});

test('wash() returns message if it was not bot', async () => {
	const context = getDefaultContext();
	context.update.message.reply_to_message = {
		from: {}
	};

	await commands.wash(context);

	expect(context.reply).toHaveBeenNthCalledWith(1, '💦💦💦', {reply_to_message_id: undefined});
	expect(context.reply).toHaveBeenNthCalledWith(2, 'ПШШШШ ПШШШШ');
});

test('wash() returns mwssage if it was bot', async () => {
	const context = getDefaultContext({isBot: true});

	await commands.wash(context);

	expect(context.reply).toHaveBeenNthCalledWith(1, '💦💦💦', {reply_to_message_id: context.message.message_id});
	expect(context.reply).toHaveBeenNthCalledWith(2, 'Хотел умыть бота, а умылся сам, АХАХАХХА');
});
