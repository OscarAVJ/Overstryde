import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Eye, EyeOff, Send } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const RecoverAccountPage = () => {

  const CODE_LENGTH = 6;

  const [code, setCode] = useState(Array(CODE_LENGTH).fill(""));

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < CODE_LENGTH - 1) {
      const next = document.getElementById(`code-${index + 1}`);
      if (next) next.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prev = document.getElementById(`code-${index - 1}`);
      if (prev) prev.focus();
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-xl">

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">

          <div className="text-center mb-8 space-y-2">
            <h1 className="text-3xl font-black tracking-tight">
              OVERSTRYD
            </h1>

            <h2 className="text-2xl font-bold text-zinc-900">
              Recuperar contraseña
            </h2>

            <p className="text-sm text-zinc-500 leading-relaxed">
              Ingresa tu correo electrónico de tu cuenta aquí abajo para que podamos resolver tu problema.
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
            </FieldGroup>

            <Button
              type="submit"
              className="w-full h-11 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-semibold gap-2"
            >
              <Send />
              Enviar instrucciones
            </Button>
          </form>

          <Separator className="my-4" />

          <div className="flex flex-col items-center justify-center space-y-4">
            <p className="text-center text-sm">
              Luego, ingresa el código que llegó a tu correo:
            </p>

            <div className="flex gap-2">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  maxLength={1}
                  className=" w-10 h-10 sm:w-12 sm:h-12 text-center text-lg rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              ))}
            </div>

            <Button
              type="button"
              className="mt-2 bg-black text-white hover:bg-zinc-800"
              onClick={() => console.log(code.join(""))}
            >
              Verificar código
            </Button>
          </div>

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
}
