# My Webtoon List App

An app for keeping track of one's webtoons. Inspired by <https://myanimelist.net/>.

The app is a work-in-progress, as I further develop my Node and React skills.

Demo: <https://my-webtoon-list.herokuapp.com/>

## Technical Stack

* Platform: Heroku
* Server: Node.js, Express, Axios
* API: ATLAS
* Front End: React
* Database: MongoDB

## To-Do

### Tests

Write tests for:

[] API calls
[] Gallery renders
[] Add, Delete, and Update users/entries

### User Functionality

* Store user info securely, via hashing
* Enable logout
* Build User Dashboard
* Let user add Webtoons to their list, directly from the main gallery

### Other

* Split server routes into separate files for user and webtoons
* Replace placeholder images
* Generate pages for each webtoon, from JSON API data

### Images

### Images don't display yet

From: https://rapidapi.com/apidojo/api/webtoon/tutorials/how-to-load-images

> You have to make GET method request with the following in request headers :
> User-Agent:Mozilla/5.0 (Linux; Android 8.1.0; Mi MIX 2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Mobile Safari/537.36
> Referer:http://m.webtoons.com/
