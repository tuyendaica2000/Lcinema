import React, { FC, useState, useEffect } from "react";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import { getMovieDetail } from "../../../api/index";
import { Movie } from "../../../interface/Imovies";
import { BASE_IMG } from "../../../api/url";
import { Link } from 'react-router-dom'

import classes from "./WatchMovie.module.scss";

const WatchMovie: FC = () => {
  const { id } = useParams() as {
    id: string;
  };
  const { data, error } = useQuery("MovieDetail", () => {
    return getMovieDetail(id, 'movie');
  });
  const [movieData, setMovieData] = useState<Movie>();
  const [recomList, setRecomList] = useState<Movie[]>();

  useEffect(() => {
    if (data) {
      setMovieData(data["data"]);
      setRecomList(data["recommen"]);
    }
  }, [data]);

  if (error) {
    return <h1>Something went wrong</h1>;
  }

  return (
    <>
      <div className={classes.nav}></div>
      <div className={classes.content}>
        <div className={classes.content_main}>
          <div className={classes.content_main_video}>
            <iframe
              className={classes.content_main_video_iframe}
              src={`https://www.2embed.ru/embed/tmdb/movie?id=${id}`}
              title="movie"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
          <div className={classes.content_main_info}>
            <h2>{movieData?.title || movieData?.name}</h2>
            <p>{movieData?.overview}</p>
            <p>Release_date: {movieData?.release_date}</p>
          </div>
        </div>
        <div className={classes.content_sub}>
          <h3 className={classes.content_sub_title}>Recommend</h3>
          <div className={classes.content_sub_scroll}>
            {data &&
              recomList?.map((item, index) => {
                return (
                  <Link to={`/movie/${item.id}&${item.media_type}`} className={classes.content_sub_scroll_item} key={index}>
                    <img
                      className={classes.content_sub_item_img}
                      src={`${BASE_IMG}${item.poster_path}`}
                      alt="img"
                    />
                    <h3>{item.title}</h3>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default WatchMovie;
