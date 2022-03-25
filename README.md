# My Webtoon List App

An app for keeping track of one's webtoons. Inspired by <https://myanimelist.net/>.

The app currently pulls data from an [unofficial Webtoon API](https://rapidapi.com/apidojo/api/webtoon/), and thus can only fetch content titles from [webtoons.com](https://webtoons.com) for the time being.

Demo: <https://my-webtoon-list.herokuapp.com/>

## Technical Stack

* Platform: Heroku
* Server: Node.js, Express, Axios
* API: ATLAS, [unofficial Webtoon API](https://rapidapi.com/apidojo/api/webtoon/)
* Front End: React
* Database: MongoDB
The app is pulling information from the Unofficial

## Issues

* Images don't display yet

From: https://rapidapi.com/apidojo/api/webtoon/tutorials/how-to-load-images

> You have to make GET method request with the following in request headers :
> User-Agent:Mozilla/5.0 (Linux; Android 8.1.0; Mi MIX 2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Mobile Safari/537.36
> Referer:http://m.webtoons.com/

## To-Do

* Store ATLAS API key in Heroku, since it can't be committed here
* Save information to MongoDB, instead of React state
* Add user accounts
* Localize API and use webscraping, instead of relying on [unofficial Webtoon API](https://rapidapi.com/apidojo/api/webtoon/)
* Add GET Request for images
