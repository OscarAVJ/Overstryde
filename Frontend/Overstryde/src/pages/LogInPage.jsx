import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Eye, EyeOff } from "lucide-react";

export const LogInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className='flex justify-center items-center'>
      <div className='md:max-w-4xl md:w-[25%] w-full p-3'>
        <div className='flex justify-center items-center flex-col gap-3 h-screen'>
          <h2 className="text-2xl font-extrabold">OVERSTRYDE</h2>
          <h2 className="text-2xl font-extrabold">Inicia sesión</h2>
          <p>Compra tus estilos, guarda tus favoritos, sigue tus pedidos y entrena con nosotros.</p>
          <form action="" className='w-full gap-2 flex flex-col'>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">
                  Correo electrónico
                </FieldLabel>
                <Input
                  id="email"
                  placeholder="ejemplo@overstryd.com"
                  type={"email"}
                  required
                />
              </Field>
              
              <Field>
                <FieldLabel htmlFor="email">
                  Contraseña
                </FieldLabel>

                <div className="relative">
                  <Input
                    id="email"
                    placeholder="********"
                    type={showPassword ? "text" : "password"}
                    required
                    className="pr-10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </Field>
            </FieldGroup>
            <Button className={"w-full"} type="submit">Iniciar sesión</Button>
          </form>
          <div>
            <p>No tienes una cuenta?
              <span className='text-yellow-500'><NavLink to={"/register"}> Registrate</NavLink> </span> </p>
          </div>
        </div>
      </div>
    </div>

  )
}
