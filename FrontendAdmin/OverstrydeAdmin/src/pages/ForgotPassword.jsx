import * as React from "react"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

import { Mail, ArrowLeft, Send, ShieldCheck } from "lucide-react"

const ForgotPassword = () => {

  const navigate = useNavigate()
  const [email, setEmail] = React.useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Enviar recuperación a:", email)

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">

      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800 shadow-xl rounded-2xl">
        <CardContent className="p-6 space-y-6">

          <div className="text-center space-y-2">
            <h1 className="text-xl font-bold text-white tracking-wide">
              OVERSTRYD
            </h1>
            <div className="w-10 h-[2px] bg-orange-500 mx-auto" />
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white">
              Recuperar Contraseña
            </h2>
            <p className="text-sm text-zinc-400">
              Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="space-y-2">
              <Label className="text-zinc-300 flex items-center gap-2">
                <Mail size={16} />
                Correo Electrónico
              </Label>

              <div className="relative">
                <Input
                  type="email"
                  placeholder="admin@fitgym.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white pr-10"
                />
                <Mail className="absolute right-3 top-3 text-zinc-400" size={16} />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold hover:opacity-90"
            >
              Enviar instrucciones
              <Send className="ml-2" size={16} />
            </Button>

          </form>

          <button
            onClick={() => navigate("/auth/login")}
            className="flex items-center justify-center gap-2 text-sm text-zinc-400 hover:text-white w-full"
          >
            <ArrowLeft size={16} />
            Volver al inicio de sesión
          </button>

          <Separator className="bg-zinc-800" />

          <div className="flex items-start gap-3 bg-zinc-800 p-4 rounded-lg text-sm text-zinc-400">
            <ShieldCheck className="text-yellow-400 mt-1" size={18} />
            <p>
              El enlace de recuperación expirará en 30 minutos por tu seguridad.
              Si no recibes el correo, revisa spam.
            </p>
          </div>

        </CardContent>
      </Card>

    </div>
  )
}

export default ForgotPassword