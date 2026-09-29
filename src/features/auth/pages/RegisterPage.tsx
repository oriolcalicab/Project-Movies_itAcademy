import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../shared/service/firebase";

export function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("")
    try{
        await createUserWithEmailAndPassword(auth, email, password);
        navigate("/")
    }catch{
        setError("No se ha podido crear la cuenta. Comprueve sus datos")
    }
    
  }

  return(
      <div className="mx-auto max-w-sm p-6 text-text-main">
      <h1 className="mb-10 text-2xl font-bold text-center text-text-muted">Registrarse</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label htmlFor="email">Correo electrònico</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="rounded px-3 py-2 text-text-muted bg-card-bg"
        />

        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="rounded px-3 py-2 text-text-muted bg-card-bg"
        />

        {error && <p role="alert" className="text-red-500">{error}</p>}

        <button type="submit" className="mt-2 rounded bg-btn-primary hover:bg-btn-primary-hover cursor-pointer py-2 font-semibold">
          Crear Cuenta
        </button>
      </form>
    </div>
  )
}
