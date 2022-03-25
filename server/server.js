const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const cors = require('cors');
require('dotenv').config({ path: './config.env'});
app.use(cors());
app.use(express.json());
app.use(require('./routes/record'));
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
	dbo.connectToServer( (err) => {
		if (err) {
			console.error(err);
		}
	});
	console.log(`Server listening on ${PORT}`);
});
