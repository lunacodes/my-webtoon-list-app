# My Webtoon List App

An app for keeping track of one's webtoons. Inspired by <https://myanimelist.net/>.

The app is a work-in-progress, as I further develop my Node.js and React skills.

Demo: <https://my-webtoon-list.herokuapp.com/>

## Running the App

### Connecting to MongoDB

Note: `config.env` must be present in the `/server` directory, and should be formatted as:

```
ATLAS_URI=mongodb+srv://<username>:<pass>@<your-cluster-url>/<db_name>?retryWrites=true&w=majority
PORT=5000
```

See MongoDB's [Quick Start: Connect to a MongoDB Database Using Node.js](https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb-how-to-get-connected-to-your-database) tutorial for more info

## To-Do

* Write tests
* Add User Accounts & Authentication
* Implement Search Bar via the [unofficial Webtoon API](https://rapidapi.com/apidojo/api/webtoon/) or web scraping
* Replace MongoDB logo with text
* Improve styles

### Known Issues

* Bootstrap mobile nav doesn't work

## Technical Stack

* Platform: Heroku
* Server: Node.js, Express, Axios
* API: ATLAS, [unofficial Webtoon API](https://rapidapi.com/apidojo/api/webtoon/)
* Front End: React
* Database: MongoDB
The app is pulling information from the Unofficial

## Tutorials Referenced

* https://www.freecodecamp.org/news/react-movie-app-tutorial/
* https://github.com/chrisblakely01/react-movie-app
* https://www.mongodb.com/languages/mern-stack-tutorial
* https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/

## Issues

### Images don't display yet

From: https://rapidapi.com/apidojo/api/webtoon/tutorials/how-to-load-images

> You have to make GET method request with the following in request headers :
> User-Agent:Mozilla/5.0 (Linux; Android 8.1.0; Mi MIX 2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Mobile Safari/537.36
> Referer:http://m.webtoons.com/

