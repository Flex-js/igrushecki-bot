import express from 'express';

import {PORT} from './config/app.config';

import initMiddlewares from './middlewares/app.middlewares.js';

const app = express();

initMiddlewares(app);

app.listen(PORT, '0.0.0.0', error => {
	if (error) console.error(`Something going wrong, ${error}`);
	else console.log(`Server is working on port: ${PORT}`);
});