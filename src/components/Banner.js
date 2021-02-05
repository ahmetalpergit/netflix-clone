import React, { useState, useEffect } from 'react';
import axios from '../axios';
import './styles/banner.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import {handleError} from './Row';

function Banner(props) {

    const [movie, setMovie] = useState([]);
    const [description, setDescription] = useState([]);
    const [moreInfo, setMoreInfo] = useState(false);
    const [trailerPath, setTrailerPath] = useState('');

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

    const handleClick = (movie) => {
        if (trailerPath === '') {
            movieTrailer(movie?.name || movie?.title || movie?.original_name || movie?.original_title).then((response) => {
                const path = response.split('?v=')[1];
                setTrailerPath(path);
                document.querySelector('body').style.overflow = 'hidden';
            }).catch((error) => {
                handleError();
                console.log(error);
            })
        } else {
            setTrailerPath('');
            document.querySelector('body').style.overflow = 'auto';
        }
    }

    const opts = {
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
          modestbranding: 1,
          controls: 0,
        },
    };

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
                    <button className="banner__button banner__button--more" onClick={() => handleClick(movie)}><i className="banner__button--icon far fa-question-circle"></i><span>More Info</span></button>
                </div>
            </div>
            <div className="banner__gradient"></div>
            {trailerPath && <div className="info__overlay" onClick={() => handleClick(null)}>
                                <div className="info__overlay--contentBox" onClick={(e) => e.stopPropagation()}>
                                    <span onClick={() => handleClick(null)} className="info__overlay--btnClose fa-stack fa-2x">
                                        <i className="fas fa-circle fa-stack-2x icon-black"></i>
                                        <i className="fas fa-times fa-stack-1x icon-white"></i>
                                    </span>
                                    <div className="info__overlay--videoBox">
                                        <YouTube className="info__overlay--youtube" videoId={trailerPath} opts={opts} />
                                        <div className="info__overlay--iconBox">
                                            <button className="info__button info__button--play"><i className="fas fa-play"></i><span>Play</span></button>
                                            <span className="fa-stack fa-2x info__icon">
                                                <i className="fas fa-circle fa-stack-2x icon-black-opacity"></i>
                                                <i className="fas fa-plus fa-stack-1x icon-white"></i>
                                            </span>
                                            <span className="fa-stack fa-2x info__icon">
                                                <i className="fas fa-circle fa-stack-2x icon-black-opacity"></i>
                                                <i className="far fa-thumbs-up fa-stack-1x icon-white"></i>
                                            </span>
                                            <span className="fa-stack fa-2x info__icon">
                                                <i className="fas fa-circle fa-stack-2x icon-black-opacity"></i>
                                                <i className="far fa-thumbs-down fa-stack-1x icon-white"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="info__overlay--text">
                                        <h1>{movie.title || movie.name}</h1>
                                        <h2>{movie.original_title ? `(${movie.original_title})` : ''}</h2>
                                        <p>{description}</p>
                                    </div>
                                </div>
                            </div>
            }
        </header>
    )
}

export default Banner;