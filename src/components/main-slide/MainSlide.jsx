import React, { useState, useEffect,useRef} from 'react'
import tmdbApi, {category, movieType} from '../../api/tmdbApi'
import apiConfig from '../../api/apiConfig'
import Button,{OutlineButton} from '../button/Button'
import Modal, { ModalContent } from '../modal/Modal'
import './mainslide.scss'
import SwiperCore, {Autoplay} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import { useNavigate } from 'react-router-dom';
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'


const MainSlide = () => {
    SwiperCore.use([Autoplay]);

    const [movieItems, setMovieItems] = useState([]);

    useEffect(() => {
        const getMovies =  async () => {
            const params = {page: 1}
            try {
                const response =  await tmdbApi.getMoviesList(movieType.popular, {params});
                setMovieItems(response.results.slice(1,8));
                

            } catch {
                console.log('error')
            }
        }
        getMovies();
    }, [])
    // console.log(movieItems);
    return (
        <div className="main-slide">
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                // autoplay={{delay: 3000,disableOnInteraction: false,}}
            >
                {
                movieItems.map((item,i) => (
                    <SwiperSlide key={i}>
                        {({isActive}) => (
                            <MainSlideItem
                                item={item}
                                className={`${isActive? 'active' : ''}`}     
                            />
                        )}
                    </SwiperSlide>
                ))
                } 
             </Swiper>
                {movieItems.map((item,i) => <TrailerModal key={i} item={item}/>)}

         </div>
    )
}

const MainSlideItem = props => {
    let history = useNavigate();

    const item =  props.item;

    const background = apiConfig.originImage(item.backdrop_path ? item.backdrop_path : item.poster_path);
    // console.log(background)

    const watchNowActive = () => {
        history('/movie' + item.id);
        console.log("dadad")
    }

    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${item.id}`);

        const videos = await tmdbApi.getVideos(category.movie, item.id);

        if(videos.results.length > 0) {
           console.log(videos.results)
            const videoSrc = "https://www.youtube.com/embed/" + videos.results[0].key;
            modal.querySelector('.modal__content > iframe').setAttribute('src', videoSrc)
            
        } else {
            modal.querySelector('.modal__content').innerHTML = "No Trailer";
        }
        modal.classList.toggle('active');
    }

    return (
        <div 
            className={`main-slide__item ${props.className}`}
            style={{backgroundImage: `url(${background})`}}
        >
            <div className="main-slide__item__content container">
                <div className="main-slide__item__content__info">
                    <h2 className="title">{item.title}</h2>
                    <div className="overview">{item.overview}</div>
                    <div className="btns">
                        <Button 
                            className="button-a"
                            onPress={watchNowActive}>
                            Watch now
                        </Button>
                        <OutlineButton
                            className="outlinebtnbtn"
                            onPress={setModalActive}>
                            Trailer
                        </OutlineButton>
                    </div>
                </div>
                <div  className="main-slide__item__content__poster">
                    <img src={apiConfig.w500Image(item.poster_path)} alt={item.title} />
                </div>
            </div>

        </div>
    )
}

const TrailerModal = props => {
    const item = props.item;

    const iframeRef = useRef(null);

    const onClose = () => {
        iframeRef.current.setAttribute('src', '')

    }

    return (
        <Modal active={false} id={`modal_${item.id}`}>
            <ModalContent onClose={onClose}>
                <iframe ref={iframeRef} width="100%" height="500px" title="trailer">

                </iframe>
            </ModalContent>
        </Modal>
    )
}




export default MainSlide
