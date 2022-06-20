import React, {useEffect, useState, useCallback} from 'react'
import './movie-grid.scss';
import MovieCard from '../movie-card/MovieCard';
import { useNavigate, useParams } from 'react-router-dom';
import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi';
import Button, { OutlineButton } from '../button/Button';
import Input from '../input/Input';
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
                        //  console.log("movie"+ response);
                        break;
                    default: 
                        response = await tmdbApi.getTvList(tvType.popular, {params});
                        // console.log("tv"+ response);
                }
            } else {
                    const params = {
                    query: keyword
                }
                response = await tmdbApi.search(props.category, {params});
            }
            console.log(response)
            setItems(response.results);
            setTotalPage(response.total_pages);
            }
            getList();
        }

    ,[props.category]);

    const loadMore = async () =>{
        let response = null;
        const params = {
            page: page + 1
        };
        if(keyword === undefined) {
            switch(props.category) {
                case category.movie:
                    response = await tmdbApi.getMoviesList(movieType.upcoming, {params})
                     console.log("movie"+ response);
                    break;
                default: 
                    response = await tmdbApi.getTvList(tvType.popular, {params});
                    console.log("tv"+ response);
            }
        } else {
                const params = {
                    page: page +1,
                    query : keyword
            }
            response = await tmdbApi.search(props.category, {params});
        }
        // console.log(response)
        setItems([...items, ...response.results]);
        setPage(page +1);
    }

    return (
       <>
       <div className="section mb-3">
            <MovieSearch category={category} keyword={keyword} />
       </div>
       
         <div className="movie-grid">
            {
                items.map((item, i) => <MovieCard item={item} category={props.category} key={i}/>)
            }
        </div>
        {
            page < totalPage? (
                <div className="movie-grid__loadmore">
                    <OutlineButton className="small" onPress={loadMore}>Load more</OutlineButton>
                </div>
            ) : <div>no</div>
        }
       </>
    )
}

const MovieSearch = props => {
    let history = useNavigate();
    const [keyword, setKeyword] = useState(props.keyword? props.keyword : '');

    const gotoSearch = useCallback(
        () => {
            if(keyword.trim().length > 0)
            {
                // history.push(`${category[props.category]}/search/${keyword}`);
                history('search/'+keyword);
                // console.log(history())
            }
        },
        [keyword, props.category,history],
    )
        useEffect(() => {
            const enterEvent = (e) => {
                e.preventDefault();
                if(e.keyCode === 13) {
                    gotoSearch();
                }
                console.log(keyword + " cate " + category[props.category]);
            }
            document.addEventListener('keyup', enterEvent);
            return () => {
                document.removeEventListener('keyup', enterEvent);
            }
        }, [keyword, gotoSearch])

        const inPuted = (e) =>{
            setKeyword(e.target.value);
        }
    return (
        <div className="movie-search">
            <Input
                type="text"
                placeholder ="Enter keyword"
                value={keyword}
                // onChange={(e) => setKeyword(e.target.value)}
                onChange={inPuted}
            />
            <Button className="small" onPress={gotoSearch}>Search</Button>
        </div>
    )
}

export default MovieGrid
