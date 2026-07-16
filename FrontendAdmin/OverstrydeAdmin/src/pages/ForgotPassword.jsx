import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useRecoveryPassword from "@/hooks/useRecoveryPassword";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { loading, requestRecovery } = useRecoveryPassword();
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { message } = await requestRecovery(email.trim());
      toast.success(message);
      navigate("/auth/newPass");
    } catch (error) {
      toast.error("No se pudo enviar la solicitud.", { description: error.message });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800 shadow-xl rounded-2xl">
        <CardContent className="p-6 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-xl font-bold text-white tracking-wide">OVERSTRYD</h1>
            <div className="w-10 h-[2px] bg-orange-500 mx-auto" />
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white">Recuperar contraseña</h2>
            <p className="text-sm text-zinc-400">
              Ingresa tu correo electrónico y te enviaremos un código para restablecer tu contraseña.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recovery-email" className="text-zinc-300 flex items-center gap-2">
                <Mail size={16} /> Correo electrónico
              </Label>
              <Input
                id="recovery-email"
                type="email"
                placeholder="admin@fitgym.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                disabled={loading}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold hover:opacity-90"
            >
              {loading ? "Enviando..." : "Enviar instrucciones"}
              <Send className="ml-2" size={16} />
            </Button>
          </form>

          <button
            type="button"
            onClick={() => navigate("/auth/login")}
            className="flex items-center justify-center gap-2 text-sm text-zinc-400 hover:text-white w-full"
          >
            <ArrowLeft size={16} /> Volver al inicio de sesión
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
