import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../layouts/Layout";
import { HomePage } from "../features/homeMovie/pages/HomePage"
import { MovieDetailPage } from "../features/movie-detail/pages/MovieDetailPage";
import { ActorDetailPage } from "../features/movie-detail/pages/ActorDetailPage";
import { DirectorDetailPage } from "../features/movie-detail/pages/DirectorDetailPage";
import { RegisterPage } from "../features/auth/pages/RegisterPage";
import { LoginPage } from "../features/auth/pages/LoginPage";

export function AppRouter(){
    return(
        <BrowserRouter>
        <Routes>
            <Route element={<Layout/>} >
            <Route path="/"             element={<HomePage/>}           />
            <Route path="/movie/:id"    element={<MovieDetailPage/>}    />
            <Route path="/actor/:id"    element={<ActorDetailPage/>}    />
            <Route path="/director/:id" element={<DirectorDetailPage/>} />
            <Route path="/register"     element={<RegisterPage/>}       />
            <Route path="/login"        element={<LoginPage/>}          />   
            </Route>
        </Routes>
        </BrowserRouter>
    )
}