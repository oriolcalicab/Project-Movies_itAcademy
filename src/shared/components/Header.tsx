import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../shared/service/firebase";
import { useAuth } from "../../features/auth/context/AuthContext";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    signOut(auth);
    navigate("/");
  }

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
          {user ? (
            <button
              onClick={handleLogout}
              className="text-2xl text-text-main hover:text-text-muted cursor-pointer "
            >
              Cerrar sessión
            </button>
          ) : (
            <>
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
            </>
          )}
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
              className="absolute top-full right-0 z-50 mt-1 flex flex-col gap-2  p-2  w-30 bg-app-bg "
              aria-label="Menu de usuario móvil"
            >
              {user ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className=" text-sm text-text-main hover:bg-card-bg rounded-lg transition-colors hover:text-btn-primary cursor-pointer  "
                >
                  Cerrar sessión
                </button>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="text-sm text-text-main  hover:bg-card-bg p-2 rounded-lg transition-colors text-right hover:text-btn-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Registrarse
                  </Link>

                  <Link
                    to="/login"
                    className="text-sm text-text-main  hover:bg-card-bg p-2 rounded-lg transition-colors text-right hover:text-btn-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Iniciar sesión
                  </Link>
                </>
              )}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
