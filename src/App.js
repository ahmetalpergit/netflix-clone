import React from 'react';
import Row from './components/Row';
import Banner from './components/Banner';
import Nav from './components/Nav'
import requests from './requests';
import './components/styles/App.css';

function App() {

  return (
    <div className="App">
      <Nav />
      <Banner fetchUrl={requests.fetchNetflixOriginals}/>
      <div className="rows">
        <Row title="Popular on Netflix" fetchUrl={requests.fetchNetflixOriginals}/>
        <Row title="Trending Now" fetchUrl={requests.fetchTrending}/>
        <Row title="Top Rated" fetchUrl={requests.fetchTopRated}/>
        <Row title="Action Movies" fetchUrl={requests.fetchActionMovies}/>
        <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies}/>
        <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies}/>
        <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies}/>
        <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries}/>
      </div>
    </div>
  );
}

export default App;
