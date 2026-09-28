import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../layouts/Layout";
import { HomePage } from "../feature/homeMovie/pages/HomePage"
import { MovieDetailPage } from "../feature/movie-detail/pages/MovieDetailPage";
import { ActorDetailPage } from "../feature/movie-detail/pages/ActorDetailPage";

export function AppRouter(){
    return(
        <BrowserRouter>
        <Routes>
            <Route element={<Layout/>} >
            <Route path="/" element={<HomePage/>} />
            <Route path="/movie/:id" element={<MovieDetailPage/>} />
            <Route path="/actor/:id" element={<ActorDetailPage/>} />
            </Route>
        </Routes>
        </BrowserRouter>
    )
}