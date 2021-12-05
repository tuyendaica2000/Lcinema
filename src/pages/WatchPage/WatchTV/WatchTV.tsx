import React, { FC, useState, useEffect } from "react";
import { getSeasons } from "../../../api/index";
import { BASE_IMG } from "../../../api/url";
import { Movie, Seasons } from "../../../interface/Imovies";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import classes from "./WatchTV.module.scss";

const WatchTV: FC = () => {
  const { id, season, episode } = useParams() as {
    id: string;
    season: string;
    episode: string;
  };
  const { data, error } = useQuery("TV Watch", () => getSeasons(id));
  const [dataTV, setDataTV] = useState<Movie>();
  const [seasonTV, setSeasonTV] = useState<Seasons[]>();
  const [infoNumOpen, setInfoNumOpen] = useState<number | undefined>(undefined);

  const handleOpenInfo = (index: number): void => {
    if (infoNumOpen === index) {
      setInfoNumOpen(undefined);
    } else {
      setInfoNumOpen(index);
    }
  };

  useEffect(() => {
    if (data) {
      setDataTV(data["data"]);
      setSeasonTV(data["result"]);
    }
  }, [data]);

  if (error) {
    return <h1>Something Went Wrong</h1>;
  }

  return (
    <>
      <div className={classes.nav}></div>
      <div className={classes.content}>
        <div className={classes.content_main}>
          <div className={classes.content_main_video}>
            <iframe
              className={classes.content_main_video_iframe}
              src={`https://www.2embed.ru/embed/tmdb/tv?id=${id}&s=${season}&e=${episode}`}
              title="movie"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
          <div className={classes.content_main_info}>
            <Link to={`/movie/${id}&tv`}>{dataTV?.name}</Link>
            <p>{dataTV?.overview}</p>
          </div>
        </div>
        <div className={classes.content_sub}>
          <h3 className={classes.content_sub_title}>Episode</h3>
          <div className={classes.content_sub_scroll}>
            {seasonTV &&
              seasonTV.map((item, index) => {
                if (item.air_date !== null) {
                  return (
                    <div key={index}>
                      <div
                        className={classes.content_sub_scroll_item}
                        onClick={() => handleOpenInfo(index)}
                      >
                        <img
                          className={classes.content_sub_scroll_item_img}
                          src={`${BASE_IMG}${item.poster_path}`}
                          alt="img"
                        />
                        <div className={classes.content_sub_scroll_item_info}>
                          <h3>{item.name}</h3>
                          <p>{item.episodes?.length} Episode</p>
                        </div>
                      </div>
                      {infoNumOpen === index && (
                        <div
                          className={classes.content_sub_scroll_item_dropdown}
                        >
                          {item.episodes?.map((child, ep) => {
                            return (
                              <Link
                                to={`/watch/tv/${id}&${item.season_number}&${child.episode_number}`}
                                className={
                                  classes.content_sub_scroll_item_dropdown_item
                                }
                                key={ep}
                              >
                                <img
                                  src={`${BASE_IMG}${child.still_path}`}
                                  alt="img"
                                />
                                <div
                                  className={
                                    classes.content_sub_scroll_item_dropdown_item_info
                                  }
                                >
                                  <p
                                    className={
                                      classes.content_sub_scroll_item_dropdown_item_text
                                    }
                                  >
                                    Episode {ep + 1}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                } else return null;
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default WatchTV;
