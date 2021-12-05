import React, { FC } from "react";
import { Movie } from "../../interface/Imovies";
import { Link } from "react-router-dom";
import { BASE_IMG } from '../../api/url'

import classes from "./MovieCard.module.scss";

const MovieCard: FC<Movie> = (item) => {
  return (
    <Link
      to={`/movie/${item.id}&${item.media_type}`}
      className={classes.slider_content_item_card}
    >
      <img
        src={`${BASE_IMG}${item.poster_path}`}
        className={classes.slider_content_item_card_img}
        alt="img"
      />
      <div className={classes.slider_content_item_card_info}>
        <h3>{item.title || item.name}</h3>
      </div>
    </Link>
  );
};

export default MovieCard;
