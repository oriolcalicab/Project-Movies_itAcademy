import { Outlet } from "react-router-dom";
import { Header } from "../shared/components/Header";
import { Footer } from "../shared/components/Footer";

export function Layout(){
    return(
        <div>
            <Header/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}