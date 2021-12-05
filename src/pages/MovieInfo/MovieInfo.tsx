import React, { FC, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { getMovieDetail } from "../../api";
import { BASE_IMG } from "../../api/url";
import { Link } from "react-router-dom";
import { Movie } from "../../interface/Imovies";
import Slider from "../../components/Silder/Slider";
import ModalTrailer from "../../components/ModalTrailer/ModalTrailer";

import classes from "./MovieInfo.module.scss";

const MovieInfo:FC = () => {
  const { type, id } = useParams() as {
    type: 'movie' | 'tv';
    id: string;
  };
  const { data, error } = useQuery("MovieDetail", () => {
    return getMovieDetail(id, type);
  });

  const [movieData, setMovieData] = useState<Movie>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const styles = {
    container: {
      backgroundImage: `url(${BASE_IMG}${movieData?.backdrop_path})`,
    } as const,
  };

  const handleModal= (): void => {
    setIsModalOpen((prev) => {
      return (!prev);
    })
  }

  useEffect(() => {
    if (data) {
      setMovieData(data["data"]);
    }
  }, [data]);

  if (error) {
    return (
      <>
        <div className={classes.nav}></div>
        <h1>Some thing went wrong</h1>
      </>
    );
  }

  return (
    <>
      <div className={classes.nav}></div>
      <div className={classes.single_movie_wrap}>
        <div className={classes.img_background} style={styles.container}></div>
        <div className={classes.img_background_footer}></div>
        <section className={classes.single_movie}>
          <img src={`${BASE_IMG}${movieData?.poster_path}`} alt="img" />
          <div className={classes.single_movie_info}>
            <div className={classes.btn_movie_group}>
              <Link
                to={`/watch/${type}/${id}`}
                className={`${classes.btn_watch} ${classes.btn}`}
              >
                <span>Watch Now</span>
              </Link>
              <div className={`${classes.btn}`} onClick={handleModal}>
                <span>Trailer</span>
              </div>
            </div>
            <h2>{movieData?.title || movieData?.name}</h2>
            <p>{movieData?.overview}</p>
            <h4>
              Genres:{" "}
              {movieData?.genres
                ?.map((item) => {
                  return item.name;
                })
                .join(",")}
            </h4>
          </div>
        </section>
      </div>
      {movieData && isModalOpen && <ModalTrailer id={id} type={type} close={handleModal} /> }
      {data && (
        <div className={classes.footer}>
          <Slider data={data["recommen"]} title="Recommended" />
        </div>
      )}
    </>
  );
};

export default MovieInfo;
