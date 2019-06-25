/* eslint no-console: 0 */
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import routes from './routes';

dotenv.config();

const { PORT = 5555 } = process.env;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// initialize routes
routes(app);

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
});

export default app;
