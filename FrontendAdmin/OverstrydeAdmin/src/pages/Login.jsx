import React from 'react'
import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldLabel, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link } from 'react-router-dom'
import { Separator } from '@/components/ui/separator'

const Login = () => {
    return (
        <div className='bg-[url("/login-background.jpg")] bg-cover bg-center h-screen'>
            <div className='grid grid-cols-1 sm:grid-cols-2'>
                <div className='flex justify-center items-center'>
                    <div className='hidden sm:block'>
                        {/*<img src="/overstryde-isotipo-blanco.jpeg" alt="" className='h-10 w-40' />*/}
                    </div>
                </div>
                <div className=' backdrop-blur-sm w-full sm:min-h-screen text-white'>
                    <div className="outline-2 relative z-10 flex flex-col sm:flex-row items-center justify-center min-h-screen px-8">

                        <div className='mb-10'>
                            <div className='sm:hidden flex flex-col justify-center items-center'>
                                <p className='text-3xl text-center font-bold font-inter'>OVERSTRYD</p>
                                {/*<img src="/overstryde-isotipo-blanco.jpeg" alt="" className='h-10 w-40' />*/}
                            </div>
                            <Separator className="sm:hidden"/>
                        </div>

                        

                        <div className="w-full max-w-md text-white">

                            <h1 className="text-2xl sm:text-3xl font-semibold font-inter text-center mb-10">
                                Bienvenido
                            </h1>

                            {/* Email */}
                            <div className="mb-6">
                                <label className="block text-sm mb-2">Correo electrónico</label>
                                <input
                                    type="email"
                                    placeholder="Ingresa tu correo"
                                    className="w-full bg-transparent border-b border-white/40 focus:outline-none focus:border-white py-2 placeholder:text-white/50"
                                />
                            </div>

                            {/* Password */}
                            <div className="mb-4">
                                <label className="block text-sm mb-2">Contraseña</label>
                                <input
                                    type="password"
                                    placeholder="********"
                                    className="w-full bg-transparent border-b border-white/40 focus:outline-none focus:border-white py-2 placeholder:text-white/50"
                                />
                            </div>

                            {/* opciones */}
                            <div className="flex items-center justify-between text-sm mb-8">
                                <label className="flex items-center gap-2 text-white/70">
                                    <input type="checkbox" className="accent-white" />
                                    Recordarme
                                </label>

                                <Link to="/auth/forgotPassword" className="text-white/70 hover:text-white cursor-pointer">
                                    Olvidaste tu contraseña?
                                </Link>
                            </div>

                            {/* botón */}
                            <Button asChild className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-2 rounded-md font-medium mb-4 h-12">
                                <Link to="/">Iniciar sesión</Link>
                            </Button>



                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login