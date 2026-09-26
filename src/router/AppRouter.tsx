import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../layouts/Layout";
import { HomePage } from "../pages/HomePage"

export function AppRouter(){
    return(
        <BrowserRouter>
        <Routes>
            <Route element={<Layout/>} >
            <Route path="/" element={<HomePage/>} />
            </Route>
        </Routes>
        </BrowserRouter>
    )
}