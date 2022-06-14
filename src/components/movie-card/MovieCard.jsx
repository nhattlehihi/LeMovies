import React from 'react'
import {Link} from 'react-router-dom'
import apiConfig from '../../api/apiConfig'
import { category } from '../../api/tmdbApi';
import Button from '../button/Button'
import './movie-card.scss';
import { Icon } from '@iconify/react';

const MovieCard = props => {

    const item = props.item;
    const link = '/' + category[props.category] + '/' + item.id;
    const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);
    return (
        <Link to={link}>
            <div className="movie-card" style={{background:`url(${bg})`}}> 
            <Button>
                <Icon icon="bx:play" />
            </Button>
            </div>
            <h3>{item.title || item.name}</h3>
        </Link>
        
    )
}

export default MovieCard
