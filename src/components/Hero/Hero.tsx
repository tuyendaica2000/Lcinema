import React, { FC } from 'react'
import Skeleton from '../Skeleton/Skeleton'
import { Link } from 'react-router-dom'
import { AiFillPlayCircle } from 'react-icons/ai'
import { AiFillInfoCircle } from 'react-icons/ai'
import { Movie } from '../../interface/Imovies'
import { BASE_IMG } from '../../api/url'


import classes from './Hero.module.scss'
import { skeStyle } from '../Skeleton/SkeStyle'


interface HeroPros {
    banner: Movie,
    isLoading: boolean,
}

const Hero: FC<HeroPros> = ({ banner, isLoading }) => {
    const { title, backdrop_path, overview, id, media_type, name } = banner;
    const styles = {
        container: {
            backgroundImage: `url(${BASE_IMG}${backdrop_path})`
        } as const
    }
    return (
        <>
            <div className={classes.nav}></div>
            <div className={classes.hero}>
                <div className={classes.hero_img} style={styles.container} ></div>
                    <div className={classes.hero_content}>
                        <div className={classes.hero_content_info}>
                            <div className={classes.hero_content_info_title}>
                                {isLoading && <Skeleton style={skeStyle.title} /> }
                                <h3>{title || name}</h3>
                            </div>
                            <div className={classes.hero_content_info_param}>
                                {isLoading && <>
                                    <Skeleton style={skeStyle.text} />
                                    <Skeleton style={skeStyle.text} />
                                    <Skeleton style={skeStyle.text} />
                                    </>
                                }
                                <p>{overview}</p>
                            </div>
                            <div className={classes.hero_content_info_group_btn}>
                                <div className={`${classes.hero_content_info_btn} ${classes.hero_content_info_btn_watch}`}>
                                    {isLoading && <Skeleton style={skeStyle.btn} /> }
                                    <Link to={`/watch/${media_type}/${id}`}><span><AiFillPlayCircle /></span>Watch Now</Link>
                                </div>
                                <div className={`${classes.hero_content_info_btn} ${classes.hero_content_info_btn_info}`}>
                                    {isLoading && <Skeleton style={skeStyle.btn} /> }
                                    <Link to={`/movie/${id}&${media_type}`}><span><AiFillInfoCircle /></span>View Info</Link>
                                </div>
                            </div>
                        </div>
                        <div className={classes.hero_footer}></div>
                    </div>
            </div>
        </>
    )
}
 
export default Hero;
