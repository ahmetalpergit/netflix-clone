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
        {/* <Row id="1" title="Popular on Netflix" fetchUrl={requests.fetchNetflixOriginals}/> */}
        <Row id="1" title="Trending Now" fetchUrl={requests.fetchTrending}/>
        <Row id="2" title="Top Rated" fetchUrl={requests.fetchTopRated}/>
        <Row id="3" title="Action Movies" fetchUrl={requests.fetchActionMovies}/>
        <Row id="4" title="Comedy Movies" fetchUrl={requests.fetchComedyMovies}/>
        <Row id="5" title="Horror Movies" fetchUrl={requests.fetchHorrorMovies}/>
        <Row id="6" title="Romance Movies" fetchUrl={requests.fetchRomanceMovies}/>
        <Row id="7" title="Documentaries" fetchUrl={requests.fetchDocumentaries}/>
      </div>
    </div>
  );
}

export default App;
