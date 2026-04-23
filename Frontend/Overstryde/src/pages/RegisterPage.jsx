
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Eye, EyeOff } from "lucide-react";

export const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className='flex justify-center items-center'>
      <div className='max-w-4xl w-[25%] '>
        <div className='flex justify-center items-center flex-col gap-3 h-screen'>
          <h2 className="text-2xl font-extrabold">OVERSTRYDE</h2>
          <h2 className="text-2xl font-extrabold">Crea tu cuenta</h2>
          <p>Unute a la comunidad de OVERSTRYDE</p>
          <form action="" className='w-full gap-2 flex flex-col'>
            <FieldGroup>
              <div className='flex justify-between gap-2'>
                <Field>
                  <FieldLabel htmlFor="name">
                    Nombre
                  </FieldLabel>
                  <Input
                    id="name"
                    placeholder="Nombre"
                    type={"text"}
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="Apellido">
                    Apellido
                  </FieldLabel>
                  <Input
                    id="Apellido"
                    placeholder="Apellido"
                    type={"text"}
                    required
                  />
                </Field>
              </div>

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
                <FieldLabel htmlFor="password">
                  Contraseña
                </FieldLabel>

                <div className="relative">
                  <Input
                    id="password"
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
              <Field>
                <div className='flex justify-between'>
                  <Field orientation="horizontal">
                    <Checkbox id="terms-checkbox" name="terms-checkbox" />
                    <Label htmlFor="terms-checkbox">aceptar terminos y condiciones</Label>
                  </Field>
                  <span className='text-yellow-500'>
                    Terminos y condiciones
                  </span>
                </div>

              </Field>
            </FieldGroup>
            <Button className={"w-full"} type="submit">Crear cuenta</Button>
          </form>

          <div>
            <p>No tienes una cuenta?
              <span className='text-yellow-500'><NavLink to={"/LogIn"}> Inicia sesión</NavLink> </span> </p>
          </div>
        </div>
      </div>
    </div>

  )
}
