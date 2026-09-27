import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="px-4 py-3">
      <div className="mx-auto flex items-center  px-4 py-3">
        <Link
          to="/"
          className="text-5xl font-bold text-text-muted hover:text-btn-primary-hover "
        >
          Movies itAcademy
        </Link>

        <nav
          className="flex items-center gap-10 ml-auto"
          aria-label="Menu de usuario"
        >
          <Link
            to={"/register"}
            className="text-sm text-text-main px-4 py-2 rounded-2xl bg-btn-primary  hover:bg-btn-primary-hover transition-colors"
          >
            Registrarse
          </Link>
          <Link
            to={"/login"}
            className="text-sm text-text-main px-4 py-2 rounded bg-btn-primary  hover:bg-btn-primary-hover transition-colors"
          >
            Iniciar sesión
          </Link>
        </nav>
      </div>
    </header>
  );
}
