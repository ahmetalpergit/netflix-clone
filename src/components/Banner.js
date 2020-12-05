import React, { useState, useEffect } from 'react';
import axios from '../axios';
import './styles/banner.css';

function Banner(props) {

    const [movie, setMovie] = useState([]);
    const [description, setDescription] = useState([]);
    const [moreInfo, setMoreInfo] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(props.fetchUrl)
            const random = Math.floor(Math.random() * request.data.results.length);
            const selection = request.data.results[random];
            setMovie(selection)
            setDescription(selection.overview)
            return request;
        }
        fetchData();
    }, [props.fetchUrl])

    function truncate(str, n) {
        if (str?.length > n) {
            return `${str?.substring(0, n - 1)}...`;
        } else {
            return str
        }
    }

    return (
        <header className="banner" style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            <div className="banner__content">
                <h1 className="banner__title">{movie?.name || movie?.title || movie?.original_name}</h1>
                <h4 className={`banner__overview${moreInfo ? ' banner__overview--expanded' : ''}`}>{moreInfo ? description : truncate(description, 120)}<i className={`banner__moreInfo fas fa-chevron-${moreInfo ? 'left' : 'right'}`} onClick={() => !moreInfo ? setMoreInfo(true) : setMoreInfo(false)}></i></h4>
                <div className="banner__buttons">
                    <button className="banner__button banner__button--play"><i className="banner__button--icon fas fa-play"></i><span>Play</span></button>
                    <button className="banner__button banner__button--more"><i className="banner__button--icon far fa-question-circle"></i><span>More Info</span></button>
                </div>
            </div>
            <div className="banner__gradient"></div>
        </header>
    )
}

export default Banner;