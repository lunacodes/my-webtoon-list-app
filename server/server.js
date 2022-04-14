const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const app = express();
const login = express();

/**
 * Environment Variables
 */
require('dotenv').config();
const PORT = process.env.PORT || 3001;
const LOGIN_PORT = process.env.LOGIN_PORT || 8080;

require('./utils/connectDb');

/**
 * Strategies
 */
require('./strategies/JwtStrategy');
require('./strategies/LocalStrategy');
require('./authenticate');

const userRouter = require('./routes/user');

/**
 * Login Service
 */
login.use(bodyParser.json());
login.use(cookieParser(process.env.COOKIE_SECRET));

// Add the client URL to the CORS policy
const whitelist = process.env.WHITELISTED_DOMAINS
	? process.env.WHITELISTED_DOMAINS.split(',')
	: [];

const corsOptions = {
	origin: (origin, callback) => {
		console.log(`origin: ${origin}`);
		if (!origin || whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	credentials: true,
};

login.use(cors(corsOptions));
login.use(passport.initialize());
login.use('/users', userRouter);

login.get('/', (req, res) => {
	res.send({ status: 'success' });
});

// Does this really need to be in a const variable??
const loginServer = login.listen(LOGIN_PORT || 8080, () => {
	const { port } = loginServer.address();
	console.log('Login server running on port:', port);
});

// Main React App
app.use(cors());
app.use(express.json());
app.use(require('./routes/webtoon'));
app.use(require('./routes/user'));
app.use(require('./routes/gallery'));

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
