import React, { FC, useRef } from 'react'
import { Movie } from '../../interface/Imovies'
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from 'swiper';
import { MdChevronRight, MdChevronLeft } from 'react-icons/md'
import MovieCard from '../MovieCard/MovieCard';


import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import "swiper/components/navigation/navigation.min.css";
import classes from './Slider.module.scss'


interface SliderPros {
    data: Movie[],
    title?: string,
}

SwiperCore.use([Navigation]);

const Slider: FC<SliderPros> = ({ data, title }) => {
    const navigationPrevRef = useRef<HTMLDivElement>(null)
    const navigationNextRef = useRef<HTMLDivElement>(null)
    

    const styles = {
        container: {
            width: 'calc(100vw - 16px) !important',
            margin: '14px 2px',
        } as const,
        item: {
            display: 'flex',
            width: '200px !important',
            justifyContent: 'center',         
        } as const,
        btn: {
            color: 'red',
        }
    }

    return ( 
        <div className={classes.slider}>
            <h3 className={classes.slider_title}>{title}</h3>
            <div className={classes.wrap}>
                <Swiper 
                    slidesPerView='auto' 
                    spaceBetween={10} 
                    loop={true} 
                    navigation={{
                        prevEl: navigationPrevRef.current!, // Assert non-null
                        nextEl: navigationNextRef.current!, // Assert non-null
                      }}
                    style={styles.container} 
                >
                    <div ref={navigationPrevRef} className={`${classes.btn} ${classes.left}`}>
                        <MdChevronLeft 
                            className={`${classes.btn_icon} ${classes.left}`}
                            style={styles.btn}
                            size='5em'
                        />
                    </div>
                    <div ref={navigationNextRef} className={`${classes.btn} ${classes.right}`}>
                        <MdChevronRight 
                            className={`${classes.btn_icon} ${classes.right}`}
                            style={styles.btn}
                            size='5em' 
                        />
                    </div>
                    {data.map((item, index) => {
                        return <SwiperSlide key={index} className={classes.width}>
                            <MovieCard {...item} />
                        </SwiperSlide>
                    })}
                </Swiper>
            </div>
        </div>
    )
} 

export default Slider 
