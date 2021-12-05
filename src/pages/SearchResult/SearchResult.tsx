import React, { FC, useState, useEffect } from "react";
import { useParams } from "react-router";
import { searchMovie } from "../../api";
import { useQuery } from "react-query";
import MovieCard from "../../components/MovieCard/MovieCard";
import Pagination from "../../components/Pagination/Pagination";

import classes from "./SearchResult.module.scss";

const SearchResult: FC = () => {
  const { query } = useParams() as {
    query: string;
  };
  const [curPage, SetCurPage] = useState(1);
  const { data, error } = useQuery(["Search result", curPage], () =>
    searchMovie(curPage, query),
    {
        enabled: !!curPage,
    }
  );
  
  const [movies, setMovies] = useState([]);

  useEffect(() => {
      if(data) {
          setMovies(data.results);
      }
      
  }, [data, curPage]);

  if(error) {
      return <h1>Something went Wrong</h1>
  }

  return (
    <>
      <div className={classes.nav}></div>
      <div className={classes.content}>
        <h2 className={classes.content_title}>{`Result for "${query}": `}</h2>
        <div className={classes.content_grid}>
          {movies &&
            movies.map((item: any, index: number) => {
              return <MovieCard key={index} {...item} />;
            })}
        </div>
      </div>
      <div className={classes.pagination}>
        {data ? (
          <Pagination
            total_pages={data.total_pages}
            currentPage={curPage}
            setCurrentPage={SetCurPage}
          />
        ) : null}
      </div>
    </>
  );
};

export default SearchResult;
