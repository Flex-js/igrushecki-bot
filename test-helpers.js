const testId = 'test_id';

const getDefaultContext = ({text, isBot = false} = {}) => {

	const message = {
		message_id: testId,
		text,
		reply_to_message: {
			message_id: testId,
			from: {
				is_bot: isBot
			}
		}
	};

	return {
		update: {
			message
		},
		message,
		reply: jest.fn(),
		replyWithSticker: jest.fn()
	};
};

module.exports = {
	getDefaultContext, testId
};
