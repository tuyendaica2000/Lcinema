import React, { FC, useState, useEffect } from 'react'
import { getSeasons } from '../../../api'
import { useParams } from 'react-router'
import { useQuery } from 'react-query'
import { BASE_IMG } from '../../../api/url'
import { Movie, Seasons } from '../../../interface/Imovies'
import { Link } from 'react-router-dom'

import classes from './InfoTV.module.scss'

const InfoTV: FC = () => {
    const { id } = useParams() as {
        id: string;
    };
    const { data, error } = useQuery('TV Detail', () => getSeasons(id));
    const [dataTV, setDataTV] = useState<Movie>();
    const [episode, setEpisode] = useState<Seasons[]>();
    const [infoNumOpen, setInfoNumOpen] = useState<number | undefined>(undefined);
    const handleOpenInfo = (index: number): void => {
        if(infoNumOpen === index) {
            setInfoNumOpen(undefined);
        } else {
            setInfoNumOpen(index);
        }
    }

    useEffect(() => {
        if(data) {
            setDataTV(data['data']);
            setEpisode(data['result']);
        }
    }, [data])

    if(error) {
        return <h1>Something Went Wrong</h1>
    }

    return (
        <>
            <div className={classes.nav}></div>
            <div className={classes.content}>
                <div className={classes.content_info}>
                    <img className={classes.content_info_img} src={`${BASE_IMG}${dataTV?.poster_path}`} alt="img" />
                    <div className={classes.content_info_text}>
                        <h3>{dataTV?.name}</h3>
                        <div className={classes.text_p}>
                            <p>{dataTV?.overview}</p>
                        </div>
                    </div>
                </div>
                <h2 className={classes.content_text}>Seasons</h2>
                <div className={classes.content_seasons}>
                    {episode && episode.map((item, index) => {
                        if(item.air_date !== null) {
                            return (<div key={index}>
                                <div className={classes.content_seasons_item} onClick={() => handleOpenInfo(index)}>
                                    <div className={classes.content_seasons_item_info}>
                                        <h3>{item.name}</h3>
                                        <p>{item.episodes?.length} Episode</p>
                                    </div>
                                </div>
                               {(infoNumOpen === index) && <div className={classes.content_seasons_dropdown}>
                                    {item.episodes?.map((child, ep) => {
                                        return <Link to={`/watch/tv/${id}&${item.season_number}&${child.episode_number}`} className={classes.content_seasons_dropdown_item} key={ep}>
                                            <p className={classes.content_seasons_dropdown_item_text}>{ep + 1}</p>
                                            <img src={`${BASE_IMG}${child.still_path}`} alt="img" />
                                            <div className={classes.content_seasons_dropdown_item_info}>
                                                <h3>{child.name}</h3>
                                                <p>{child.air_date}</p>
                                            </div>
                                        </Link>
                                    })}
                                </div>}
                            </div>)
                        } else return null; })}
                </div>
            </div>
        </>
    )
}

export default InfoTV
