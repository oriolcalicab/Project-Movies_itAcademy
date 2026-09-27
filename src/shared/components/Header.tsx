import { useState } from "react";
import { Link } from "react-router-dom";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="px-4 py-3">
      <div className="mx-auto flex items-center px-4 py-3">
        <Link
          to="/"
          className="text-5xl font-bold text-text-muted hover:text-btn-primary-hover "
        >
          Movies 
        </Link>

        {/* MENÚ ESCRITORIO */}
        <nav
          className="hidden items-center gap-10 ml-auto sm:flex "
          aria-label="Menu de usuario"
        >
          <Link
            to="/register"
            className="text-sm text-text-main px-4 py-2 rounded-2xl bg-btn-primary hover:bg-btn-primary-hover transition-colors"
          >
            Registrarse
          </Link>
          <Link
            to="/login"
            className="text-sm text-text-main px-4 py-2 rounded bg-btn-primary hover:bg-btn-primary-hover transition-colors"
          >
            Iniciar sesión
          </Link>
        </nav>

        {/* MENU MOBIL */}
        <div className="ml-auto flex sm:hidden relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="open menu"
            className="text-text-main ml-auto cursor-pointer justify-between text-2xl hover:text-btn-primary-hover"
          >
            ☰
          </button>

          {isMenuOpen && (
            <nav
              className="absolute top-full right-0 z-50 mt-1 flex flex-col gap-2  p-2  w-30 "
              aria-label="Menu de usuario móvil"
            >
              <Link
                to="/register"
                className="text-sm text-text-main hover:bg-card-bg p-2 rounded-lg transition-colors text-right hover:text-btn-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Registrarse
              </Link>

              <Link
                to="/login"
                className="text-sm text-text-main hover:bg-card-bg p-2 rounded-lg transition-colors text-right hover:text-btn-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Iniciar sesión
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
