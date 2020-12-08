# [Netflix Clone](https://netflix-clone-2501d.web.app/)
> by [Ahmet Alper](https://github.com/ahmetalpergit)
# ![showcase](public/images/showcase.gif)

## Introduction

Welcome to the documentation of my final project for Harvard's CS50 Course. In this documentation you'll find pretty much all the information you need on this project but if you still have any questions contact me: <ahmetalperwork@gmail.com>

### Technologies

HTML - CSS - JS - React - NPM - Git - Firebase

### Libraries

* [axios](https://www.npmjs.com/package/axios)
* [react-youtube](https://www.npmjs.com/package/react-youtube)
* [movie-trailer](https://www.npmjs.com/package/movie-trailer)

```sh
   npm i axios react-youtube movie-trailer
```
### API

[TMDB](https://www.themoviedb.org/)
1. Register for the website and verify your e-mail.
2. Settings > API.
3. [Documentation](https://developers.themoviedb.org/3/getting-started/introduction) for making requests.

### Overview

Although my web app looks and feels like Netflix, it functions differently. Since I can't create a database with full movies of every title, I decided to play trailers of the movies instead. For this reason I'm using the react-youtube and movie-trailer libries.

With the data I fetch from TMDB, I populate my react components with relevant information, and let movie-trailer find the youtube path, and react-youtube takes that path and creates a Youtube iframe within the app once a poster is clicked.

Finally I've added responsive styling to keep the design experience smooth on various devices.

### Features

* Looks near identical in terms of styling to the current version of Netflix.
* Dynamically updated content as it works with the movie database API.
* Plays trailers of the titles. 
* Overlay section to see more info about the titles.
* 100% Responsive, all the way down to the smallest phone screens!

### Project Architecture

# ![architecture](public/images/architecture.png)

Kept it simple, from top to bottom there were 3 major components: the Nav-bar, the hero banner and varying category of rows. I've built these sections and used props for things I wanted to change within similar components. The ID were used for Row pagination and fetchUrl was for grabbing category specific content.

### Implementation of the API

```sh
useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(props.fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
}, [props.fetchUrl]) 
```
an example API GET request looks like this:
```sh
{
  "backdrop_path": "/4InrdamBEM31unNiuEHGYTPX1e2.jpg",
  "first_air_date": "2016-11-04",
  "genre_ids": [
    18
  ],
  "id": 65494,
  "name": "The Crown",
  "origin_country": [
    "GB",
    "US"
  ],
  "original_language": "en",
  "original_name": "The Crown",
  "overview": "The gripping, decades-spanning inside story of Her Majesty Queen Elizabeth II and the Prime Ministers
  who shaped Britain's post-war destiny. The Crown tells the inside story of two of the most famous addresses
  in the world – Buckingham Palace and 10 Downing Street – and the intrigues, love lives and machinations behind the
  great events that shaped the second half of the 20th century. Two houses, two courts, one Crown.",
  "popularity": 225.063,
  "poster_path": "/7IbBxgYjpOp0i6BT1GRhrQ5EHBt.jpg",
  "vote_average": 8.1,
  "vote_count": 743
}
```
After getting the data in this format, I simply used State Management in React to insert the data.

## Thank you!

Really appreciate that you've come this far checking out my project. I'd like to give special credit to Harvard CS50 course instructor David J. Malan, Angela Yu (App brewery full stack web dev bootcamp) and Jonas Schmedtmann (advanced CSS and advanced JS courses) who've all taught me things along the way that helped me build this project today. Take care and I'll see you on the next one! :)
