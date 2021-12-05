import { Trailer, Movie } from "../interface/Imovies";
import instance from "./axios";
import {
  DISCOVER_URL,
  SEARCH_URL,
  DISCOVER_TV_URL,
  MOVIE_TOP_URL,
  TV_TOP_URL,
  RECOMMEN_URL,
  TRAILER_MOVIE_URL,
  ID_URL,
  EP_URL,
  MOVIE_GENRES,
  TV_GENRES,
  NEW_GENRES,
  POPULAR_GENRES,
} from "./url";

const getData = async <T>(pathname: string): Promise<T> => {
  let resp;
  try {
    resp = (await instance.get(pathname)).data.results;
  } catch (error) {
    console.log(error);
  }
  return resp;
};

export const searchMovie = async (
  page: number,
  query: string
): Promise<any> => {
  const pathname = `${SEARCH_URL}&page=${page}&query=${query}`;
  const promise = await (await instance.get(pathname)).data;
  
  const data = promise.results.map((item: any) => {
    return {...item, media_type: 'movie'}
  })

  return {...promise, results: data};
};
 
export const getMovieDetail = async (id: string, type: string): Promise<any> => {
  const nameData = ["data", "recommen"];

  const data = (
    await Promise.all([
      instance.get(ID_URL(id, type)),
      instance.get(RECOMMEN_URL(id, type)),
    ])
  ).reduce((result, cur, index) => {
    if (nameData[index] === "data") {
      result[nameData[index]] = cur.data;
    } else if (nameData[index] === "recommen") {
      result[nameData[index]] = cur.data.results.map((item: any) => {
        return { ...item, media_type: "movie" };
      });
    }
    return result;
  }, {} as any);

  return data;
};

export const getDataHomePage = async (): Promise<any> => {
  const dataInfo: { [key: string]: { url: string; type: string } } = {
    "Trending Movie": {
      url: `${DISCOVER_URL}`,
      type: "movie",
    },
    "Popular TV Series": {
      url: `${DISCOVER_TV_URL}`,
      type: "tv",
    },
    "Top Rate Movie": {
      url: `${MOVIE_TOP_URL}`,
      type: "movie",
    },
    "Top Rate TV Series": {
      url: `${TV_TOP_URL}`,
      type: "tv",
    },
  };

  const promise = await Promise.all(
    Object.keys(dataInfo).map((item) => {
      return instance.get(dataInfo[item].url);
    })
  );

  const data = promise.reduce((result, cur, index) => {
    result[Object.keys(dataInfo)[index]] = cur.data.results.map(
      (item: any) => ({
        ...item,
        media_type: dataInfo[Object.keys(dataInfo)[index]].type,
      })
    );
    return result;
  }, {} as any);

  return data;
};

export const getDataMoviePage = async (): Promise<any> => {
  const dataInfo: { [key: string]: { url: string; type: string } } = {
    "Top Rate Movie": {
      url: `${MOVIE_TOP_URL}`,
      type: "movie",
    },
    'Action': {
      url: `${MOVIE_GENRES('28')}`,
      type: 'movie',
    },
    'Animation': {
      url: `${MOVIE_GENRES('16')}`,
      type: 'movie',
    },
    'Comedy': {
      url: `${MOVIE_GENRES('35')}`,
      type: 'movie',
    },
    'Horror': {
      url: `${MOVIE_GENRES('27')}`,
      type: 'movie',
    },
    'Science Fiction': {
      url: `${MOVIE_GENRES('878')}`,
      type: 'movie',
    },
  };

  const promise = await Promise.all(
    Object.keys(dataInfo).map((item) => {
      return instance.get(dataInfo[item].url);
    })
  );

  const data = promise.reduce((result, cur, index) => {
    result[Object.keys(dataInfo)[index]] = cur.data.results.map(
      (item: any) => ({
        ...item,
        media_type: dataInfo[Object.keys(dataInfo)[index]].type,
      })
    );
    return result;
  }, {} as any);

  return data;
};

export const getDataTVPage = async (): Promise<any> => {
  const dataInfo: { [key: string]: { url: string; type: string } } = {
    "Popular TV Series": {
      url: `${DISCOVER_TV_URL}`,
      type: "movie",
    },
    'Action & Adventure': {
      url: `${TV_GENRES('10759')}`,
      type: 'tv',
    },
    'Animation': {
      url: `${TV_GENRES('16')}`,
      type: 'tv',
    },
    'Comedy': {
      url: `${TV_GENRES('35')}`,
      type: 'tv',
    },
    'Drama': {
      url: `${TV_GENRES('18')}`,
      type: 'tv',
    },
    'Crime': {
      url: `${TV_GENRES('80')}`,
      type: 'tv',
    },
  };
  const promise = await Promise.all(
    Object.keys(dataInfo).map((item) => {
      return instance.get(dataInfo[item].url);
    })
  );

  const data = promise.reduce((result, cur, index) => {
    result[Object.keys(dataInfo)[index]] = cur.data.results.map(
      (item: any) => ({
        ...item,
        media_type: dataInfo[Object.keys(dataInfo)[index]].type,
      })
    );
    return result;
  }, {} as any);

  return data;
};

export const getDataNewPage = async (): Promise<any> => {
  const dataInfo: { [key: string]: { url: string; type: string } } = {
    "Latest Movie": {
      url: `${NEW_GENRES('movie')}`,
      type: "movie",
    },
    "Latest TV Series": {
      url: `${NEW_GENRES('tv')}`,
      type: "tv",
    },
    'Popular Movie': {
      url: `${POPULAR_GENRES('movie')}`,
      type: 'movie',
    },
    'Popular TV Series': {
      url: `${POPULAR_GENRES('tv')}`,
      type: 'tv',
    },
  };  
  
  const promise = await Promise.all(
    Object.keys(dataInfo).map((item) => {
      return instance.get(dataInfo[item].url);
    })
  );

  const data = promise.reduce((result, cur, index) => {
    result[Object.keys(dataInfo)[index]] = cur.data.results.map(
      (item: any) => ({
        ...item,
        media_type: dataInfo[Object.keys(dataInfo)[index]].type,
      })
    );
    return result;
  }, {} as any);

  return data;
}

export const getTrailer = async (type: string, id: string): Promise<Trailer[]> => {
  const pathname = `${TRAILER_MOVIE_URL(type, id)}`;
  const data = await getData<Trailer[]>(pathname);

  return data;
}

export const getSeasons = async (id: string): Promise<any> => {
  const pathname = `${ID_URL(id, 'tv')}`;
  const resp = await instance.get(pathname);
  const data: Movie = resp.data  

  if (data.seasons.length === 0) throw new Error("404");

  const seasons = await Promise.all(data.seasons.map((item) => instance.get(EP_URL(id, item.season_number))));
  
  const tempData = seasons.map((item) => item.data);
  const result = tempData.filter((item) => {
    return item.air_date && item.name && item.episodes.length > 0 && item.episodes.every((child: any) => {
      return child.name && child.still_path;
    });
  })

  return {
    data,
    result
  }

}
