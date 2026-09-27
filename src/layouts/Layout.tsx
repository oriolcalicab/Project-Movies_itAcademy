import { Outlet } from "react-router-dom";
import { Header } from "../shared/components/Header";
import { Footer } from "../shared/components/Footer";

export function Layout(){
    return(
        <div className="flex min-h-screen flex-col">
            <Header/>
            <main className="flex-1">
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}