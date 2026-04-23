import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export const LogInPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-xl">

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">

          <div className="text-center mb-8 space-y-2">
            <h1 className="text-3xl font-black tracking-tight">
              OVERSTRYD
            </h1>

            <h2 className="text-2xl font-bold text-zinc-900">
              Inicia sesión
            </h2>

            <p className="text-sm text-zinc-500 leading-relaxed">
              Compra tus estilos, guarda tus favoritos, sigue tus pedidos y entrena con nosotros.
            </p>
          </div>

          <form className="space-y-5">
            <FieldGroup>

              <Field>
                <FieldLabel htmlFor="email">
                  Correo electrónico
                </FieldLabel>

                <Input
                  id="email"
                  placeholder="ejemplo@overstryd.com"
                  type="email"
                  required
                  className="mt-2 h-11 rounded-xl"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">
                  Contraseña
                </FieldLabel>

                <div className="relative mt-2">
                  <Input
                    id="password"
                    placeholder="********"
                    type={showPassword ? "text" : "password"}
                    required
                    className="h-11 rounded-xl pr-10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </Field>

            </FieldGroup>

            <div className="text-right">
              <button
                type="button"
                className="text-sm text-yellow-500 font-medium hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full h-11 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-semibold"
            >
              Iniciar sesión
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-zinc-500">
            ¿No tienes una cuenta?
            <NavLink
              to="/register"
              className="text-yellow-500 font-semibold ml-1 hover:underline"
            >
              Regístrate
            </NavLink>
          </div>

        </div>
      </div>
    </div>
  );
};