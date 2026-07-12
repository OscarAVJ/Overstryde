import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { loginCustomer } from "../services/Authservice";
import { useAuth } from "../hooks/useAuth";

export const LogInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginCustomer({ email, password });

      setUser(data.customer);

      navigate("/"); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      <NavLink
        to="/"
        className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm ring-1 ring-zinc-200 transition hover:text-black hover:ring-zinc-300"
      >
        <ArrowLeft size={16} />
        Volver
      </NavLink>
      <div className="w-full max-w-xl">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">

          <div className="text-center mb-8 space-y-2">
            <h1 className="text-3xl font-black tracking-tight">OVERSTRYD</h1>
            <h2 className="text-2xl font-bold text-zinc-900">Inicia sesión</h2>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Compra tus estilos, guarda tus favoritos, sigue tus pedidos y entrena con nosotros.
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 text-center">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <FieldGroup>

              <Field>
                <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
                <Input
                  id="email"
                  placeholder="ejemplo@overstryd.com"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 h-11 rounded-xl"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                <div className="relative mt-2">
                  <Input
                    id="password"
                    placeholder="********"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 rounded-xl pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </Field>

            </FieldGroup>

            <div className="text-right">
              <NavLink
                to="/recoverAccount"
                className="text-sm text-yellow-500 font-medium hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </NavLink>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-semibold disabled:opacity-60"
            >
              {loading ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-zinc-500">
            ¿No tienes una cuenta?{" "}
            <NavLink to="/register" className="text-yellow-500 font-semibold hover:underline">
              Regístrate
            </NavLink>
          </div>

        </div>
      </div>
    </div>
  );
};
