const {STICKER_CLOWN, STICKER_WASHING, STICKER_STAS} = require('./stickerConstants');
const {handlers} = require('./initTextHandlers');
const {phrases} = require('./constants');
const {testId, getDefaultContext} = require('../test-helpers');

const anotherArguments = [{reply_to_message_id: testId}];

test('case "привет"', async () => {
	const context = getDefaultContext({text: 'привет'});

	await handlers.text(context);

	expect(context.reply).toHaveBeenCalledWith('Привет, лошок', ...anotherArguments);
});

test('case "клоун"', async () => {
	const context = getDefaultContext({text: 'клоун'});

	await handlers.text(context);

	expect(context.replyWithSticker).toHaveBeenCalledWith(STICKER_CLOWN);
});

test('case "зачем"', async () => {
	const context = getDefaultContext({text: 'зачем'});

	await handlers.text(context);

	expect(context.reply).toHaveBeenCalledWith('https://www.youtube.com/watch?v=muEEtWI2CKc', ...anotherArguments);
});

test('case "?"', async () => {
	const context = getDefaultContext({text: '?'});

	await handlers.text(context);

	expect(context.replyWithSticker).toHaveBeenCalledWith(STICKER_WASHING, ...anotherArguments);
});

test('case "стас"', async () => {
	const context = getDefaultContext({text: 'стас'});

	await handlers.text(context);

	expect(context.replyWithSticker).toHaveBeenCalledWith(STICKER_STAS, ...anotherArguments);
});

test('capsLock', async () => {
	const context = getDefaultContext({text: 'КРИК'});

	await handlers.text(context);

	expect(context.reply).toHaveBeenCalledWith('ТЫ ЧЕ ОРЕШЬ, МЕШОЧЕК?', ...anotherArguments);
});

test('bot message', async () => {
	const context = getDefaultContext({text: 'текст', isBot: true});

	await handlers.text(context);

	expect(context.reply).toHaveBeenNthCalledWith(1, 'Ты говоришь это боту, пирожок. Мне все равно', ...anotherArguments);
	expect(context.reply).toHaveBeenNthCalledWith(2, 'а тебе бы наливки выпить не помешало');
});

test('should returns random text', async () => {
	Math.random = () => 0;
	const context = getDefaultContext({text: 'текст'});

	await handlers.text(context);

	expect(phrases).toContain(context.reply.mock.calls[0][0]);
});

test('it\'s you ---> 🐔', () => {
	expect(true).toBe(true);
});
