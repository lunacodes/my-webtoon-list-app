# My Webtoon List App

An app for keeping track of one's webtoons. Inspired by <https://myanimelist.net/>.

The app is a work-in-progress, as I further develop my Node and React skills.

Demo: <https://my-webtoon-list.herokuapp.com/>

## Technical Stack

- Platform: Heroku
- Server: Node.js, Express
- API: ATLAS
- Front End: React
- Database: MongoDB

## To-Do

### Tests

Write tests for:

[] Gallery renders
[] User login/logout
[] API calls
[] Add, Read, Delete, and Update users/entries

### User Functionality

- Store user login info securely, via hashing
- Individualize Users
- Build User Dashboard
- Let user add Webtoons to their list, directly from the main gallery

### Other

- Replace placeholder images on Profile pages
- Generate pages for each webtoon, from JSON API data
- Give login token a more specific name
- Improve mongoose search query filtering (see below) via passing `const filter` to `Model.find()`
- Add `reactstrap`
