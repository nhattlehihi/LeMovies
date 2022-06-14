import React, {useEffect, useState} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'

import './movie-grid.scss';
import MovieCard from '../movie-card/MovieCard';
import { useParams } from 'react-router-dom';
import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi';
const MovieGrid = props => {
    const [items, setItems] = useState([]);

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const {keyword} = useParams();
    useEffect(() => {
        const getList = async () => {
            let response = null;
            const params = {};
            if(keyword === undefined) {
                switch(props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(movieType.upcoming, {params})
                        break;
                    default: 
                        response = await tmdbApi.getTvList(tvType.popular, {params});
                }
            } else {
                    const params = {
                    query : keyword
                }
                response = await tmdbApi.search(props.category, {params});
            }
            console.log(response)
            setItems(response.results);
            setTotalPage(response.total_pages);
            }
            getList();
        }

    ,[]);

    return (
        <div className="movie-grid">
            {
                items.map((item, i) => <MovieCard item={item} category={props.category} key={i}/>)
            }
            
        </div>
    )
}

export default MovieGrid
