import React, { useState, useEffect } from 'react';
import axios from '../axios';
import './styles/row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row(props) {

    const [movies, setMovies] = useState([]);
    const [trailerPath, setTrailerPath] = useState('');
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [original_title, setOriginal_title] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(props.fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [props.fetchUrl]) 

    const opts = {
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
          modestbranding: 1,
          controls: 0,
        },
    };

    const handleClick = (movie) => {
        if (trailerPath === '') {
            movieTrailer(movie?.name || movie?.title || movie?.original_name || movie?.original_title).then((response) => {
                const path = response.split('?v=')[1];
                setTrailerPath(path);
                document.querySelector('body').style.overflow = 'hidden';
                setDescription(movie?.overview);
                setTitle(movie?.name || movie?.title);
                setOriginal_title(movie?.original_name);
            }).catch((error) => {
                handleError();
                console.log(error);
            })
        } else {
            setTrailerPath('');
            setDescription('');
            setTitle('');
            setOriginal_title('');
            document.querySelector('body').style.overflow = 'auto';
        }
    }

    const handlePagination = (e) => {

        const el = e.target.parentElement.className.split(' ');
        const scrollContainer = document.querySelector(`.${el[1]}`);

        if (e.target.className === 'pagination pagination--right') {
            scrollContainer.scrollLeft += scrollContainer.offsetWidth;
        } else {
            scrollContainer.scrollLeft -= scrollContainer.offsetWidth;
        }
    }

    return (
        <div className="row__container">
            <h2 className="row__title">{props.title}</h2>
            <div className="row">
                <div className={`row__posters row__posters--${props.id}`}>
                    <span className="pagination pagination--left" onClick={(e) => handlePagination(e)}><i className="fas fa-chevron-left fa-2x"></i></span>
                    <span className="pagination pagination--right" onClick={(e) => handlePagination(e)}><i className="fas fa-chevron-right fa-2x"></i></span>
                    {movies.map((movie) => {
                        return <img key={movie.id} className="row__poster" src={base_url + movie.backdrop_path} alt={movie.name} onClick={() => handleClick(movie)}/>
                    })}
                </div>
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
                                            <h1>{title}</h1>
                                            <h2>{original_title ? `(${original_title})` : ''}</h2>
                                            <p>{description}</p>
                                        </div>
                                    </div>
                                </div>
                }
            </div>
        </div>
    )
}

export const handleError = function() {
    const html = `
    <div class="error">
        <div class="error__text">
            <p class="error__heading">Error:</p>
            <p class="error__description">Can't find trailer, please try another title!</p>
        </div>
    </div>
    `
    const body = document.querySelector('body');
    body.insertAdjacentHTML('afterbegin', html);
    const error = body.querySelector('.error');
    error.classList.add('fade-in');

    setTimeout(function() {
        // error.classList.remove('fade-in');
        error.classList.add('fade-out');
        setTimeout(function() {
            error.remove();
        }, 500)
    }, 2500)
}

export default Row;