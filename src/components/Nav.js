import React, {useState, useEffect } from 'react';
import './styles/nav.css'; 

function Nav(props) {
    
    const [scrolled, setScrolled ] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 100) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }
        window.addEventListener('scroll', handleScroll)

        return function() {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <nav className={`nav${scrolled ? " nav--scrolled" : ''}`}>
            <div className="nav--left">
                <img className="logo" src="images/logo.png" alt="netflix logo"/>
                <ul className="nav__list">
                    <li className="nav__item nav__item--selected"><a href="#" className="nav__link">Home</a></li>
                    <li className="nav__item"><a href="#" className="nav__link">TV Shows</a></li>
                    <li className="nav__item"><a href="#" className="nav__link">Movies</a></li>
                    <li className="nav__item"><a href="#" className="nav__link">New & Popular</a></li>
                    <li className="nav__item"><a href="#" className="nav__link">My List</a></li>
                </ul>
            </div>
            <div className="nav--right">
                <i className="fas fa-search"></i>
                <span>KIDS</span>
                <i className="fas fa-gift"></i>
                <i className="fas fa-bell"></i>
                <div className="user">
                    <img className="user__profile" src="images/user.png" alt="user icon"/>
                    <i className="fas fa-sort-down"></i>
                </div>
            </div>
        </nav>
    );
}

export default Nav;