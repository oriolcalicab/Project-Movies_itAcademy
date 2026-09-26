import { Link } from "react-router-dom";


export function Header(){
    return(
        <header>
            <div>
                <Link to="/">
                    Movies itAcademy
                </Link>

                <nav>
                    <Link to={"/register"}>Registrarse</Link>
                    <Link to={"/login"}>Iniciar sesión</Link>
                </nav>
            </div>
        </header>
    )
}