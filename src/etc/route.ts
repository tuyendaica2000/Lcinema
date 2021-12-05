import { lazy } from "react";
import Route from "../interface/IRouter";

const Home = lazy(() => import("../pages/Home"));
const MoviePage = lazy(() => import("../pages/MoviePage"));
const TVPage = lazy(() => import("../pages/TVPage"));
const NewPage = lazy(() => import("../pages/NewPage"));
const MovieInfo = lazy(() => import("../pages/MovieInfo/MovieInfo"));
const SearchPage = lazy(() => import("../pages/SearchPage/SearchPage"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));
const SearchResult = lazy(() => import("../pages/SearchResult/SearchResult"));
const WatchMovie = lazy(() => import("../pages/WatchPage/WatchMovie/WatchMovie"));
const InfoTV = lazy(() => import("../pages/WatchPage/InfoTV/InfoTV"));
const WatchTV = lazy(() => import("../pages/WatchPage/WatchTV/WatchTV"));

const routes: Route[] = [
    {
        path: '/',
        components: Home,
    },
    {
        path: '/movie',
        components: MoviePage,
    },
    {
        path: '/tv',
        components: TVPage,
    },
    {
        path: '/new',
        components: NewPage,
    },
    {
        path: '/movie/:id&:type',
        components: MovieInfo,
    },
    {
        path: '/watch/movie/:id',
        components: WatchMovie,
    },
    {
        path: '/watch/tv/:id',
        components: InfoTV,
    },
    {
        path: '/watch/tv/:id&:season&:episode',
        components: WatchTV,
    },
    {
        path: '/search',
        components: SearchPage,
    },
    {
        path: '/search/:query',
        components: SearchResult,
    },
    {
        path: '*',
        components: ErrorPage,
    },
]

export default routes;
 