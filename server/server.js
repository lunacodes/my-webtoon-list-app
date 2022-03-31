const path = require('path');
const express = require('express');
const app = express();
const login = express();
const cors = require('cors');
require('dotenv').config({ path: './config.env'});
const PORT = process.env.PORT || 3001;
const LOGIN_PORT = process.env.port || 8080;
const session_token = process.env.TOKEN;

// Login Service
login.use(cors());
login.use('/login', (req, res) => {
	res.send({
		token: session_token
	});
});

login.listen(LOGIN_PORT, () => {
	console.log('Login is running on port 8080');
})

// Main React App
app.use(cors());
app.use(express.json());
app.use(require('./routes/webtoon'));

// Get db driver connection
const dbo = require('./db/conn');

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
	dbo.connectToServer((err) => {
		if (err) console.log(err);
	});
	console.log(`Server is running on port ${PORT}`);
});
