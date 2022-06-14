import React from 'react'
import { OutlineButton } from '../components/button/Button'
import MainSlide from '../components/main-slide/MainSlide'
import {Link} from 'react-router-dom'
import MovieList from '../components/movie-list/MovieList'
import { category, movieType, tvType } from '../api/tmdbApi';
const Home = () => {
    return (
        <div>
            <MainSlide/>
            <div className="container">
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Trending Movies</h2>
                        <Link to="/movie">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                </div>
                <MovieList category={category.movie} type={movieType.popular}/>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Top Rated Movies</h2>
                        <Link to="/movie">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                </div>
                <MovieList category={category.movie} type={movieType.top_rated}/>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Trending TV series</h2>
                        <Link to="/movie">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                </div>
                <MovieList category={category.tv} type={movieType.popular}/>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Top Rated TV series</h2>
                        <Link to="/movie">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                </div>
                <MovieList category={category.tv} type={movieType.top_rated}/>
            </div>
        </div>
    )
}

export default Home
