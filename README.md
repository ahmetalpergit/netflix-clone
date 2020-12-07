# Netflix Clone
> Harvard CS50 Web Track Final Project | by Ahmet Alper (https://github.com/ahmetalpergit)

Welcome to the documentation of my final project for Harvard's CS50 Course. You'll find pretty much all the information you need on this project but if you still have any questions contact me @ <ahmetalperwork@gmail.com>

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
1. Register for the website and verify your e-mail
2. Settings > API
3. [Documentation](https://developers.themoviedb.org/3/getting-started/introduction) for making requests.

### Introduction

Hi, my name is Ahmet and I’m a Turkish citizen, living in Poland for the past 5 years. It’s the year 2020, and as you all know we’re in a global state of pandemic. As COVID has turned us all into couch potatoes, watching Netflix all day long, I’ve decided it would be a cool idea to create a clone of Netflix using one of the popular front-end frameworks as my Harvard final project. 

### Overview

Although my web app looks and feels like Netflix, it functions differently. Since I can't create a database with full movies of every title, I decided to play trailers of the movies instead. For this reason I'm using the react-youtube and movie-trailer libries.

With the data I fetch from TMDB, I populate my react components with relevant information, and let movie-trailer find the youtube path, and react-youtube takes that path and creates a Youtube iframe within the app once a poster is clicked.

Finally I've added responsive styling to keep the design experience smooth on various devices.
