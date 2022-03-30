# My Webtoon List App

An app for keeping track of one's webtoons. Inspired by <https://myanimelist.net/>.

The app is a work-in-progress, as I further develop my Node.js and React skills.

Demo: <https://my-webtoon-list.herokuapp.com/>

## Running the App

### Connecting to MongoDB

https://dashboard.heroku.com/apps/my-webtoon-list/settings

Note: `config.env` must be present in the `/server` directory, and should be formatted as:

```
ATLAS_URI=mongodb+srv://<username>:<pass>@<your-cluster-url>/<db_name>?retryWrites=true&w=majority
PORT=5000
```

See MongoDB's [Quick Start: Connect to a MongoDB Database Using Node.js](https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb-how-to-get-connected-to-your-database) tutorial for more info

## To-Do

* Major Issue: Async promise issue w/ gallery & overloading API requests... problem is it's submitting rerquests right away, before there's any search query... even when it doesn't it polls too much
* Write tests
* Make tags functional
* Make it clear that the Add/Remove Gallery components are for adding it to the site's overall info... that sounds like info management hell
* Put Webtoons into broader database somehow?
* Add User Accounts & Authentication
* Implement Search Bar via the [unofficial Webtoon API](https://rapidapi.com/apidojo/api/webtoon/) or web scraping
* Replace MongoDB logo with text
* Improve styles
* App.js - get/set state defined but not used warning
* Webtoon Gallery - Each child in list should have unique key

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
* https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications

Storing User Passwords
https://coderrocketfuel.com/article/store-passwords-in-mongodb-with-node-js-mongoose-and-bcrypt

## Maybe Check Out

* https://github.com/typicode/json-server
* https://mongoosejs.com/

### Testing

* https://www.geeksforgeeks.org/debugging-and-testing-of-a-node-js-application/
* https://jestjs.io/docs/getting-started
* https://jestjs.io/docs/configuration
* https://jestjs.io/docs/mongodb

### React

* https://www.digitalocean.com/community/tutorials/how-to-call-web-apis-with-the-useeffect-hook-in-react

### Node

* https://github.com/kubowania/battleships/tree/multiplayer
* https://github.com/kubowania/battleships/blob/single-player/app.js

## Issues

### Images don't display yet

From: https://rapidapi.com/apidojo/api/webtoon/tutorials/how-to-load-images

> You have to make GET method request with the following in request headers :
> User-Agent:Mozilla/5.0 (Linux; Android 8.1.0; Mi MIX 2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Mobile Safari/537.36
> Referer:http://m.webtoons.com/

