import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import useRecoveryPassword from "@/hooks/useRecoveryPassword";

const NewPassword = () => {
  const navigate = useNavigate();
  const { loading, resetPassword } = useRecoveryPassword();
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (code.length !== 6) {
      toast.error("Ingresa el código completo de 6 caracteres.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }

    try {
      const { message } = await resetPassword({ code, newPassword });
      toast.success(message);
      navigate("/auth/login", { replace: true });
    } catch (error) {
      toast.error("No se pudo actualizar la contraseña.", { description: error.message });
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
            <h2 className="text-2xl font-bold text-white">Nueva contraseña</h2>
            <p className="text-sm text-zinc-400">Ingresa el código recibido y tu nueva contraseña.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2 flex flex-col items-center">
              <Label className="text-zinc-300">Código de recuperación</Label>
              <InputOTP maxLength={6} value={code} onChange={setCode} disabled={loading}>
                <InputOTPGroup>
                  {[0, 1, 2, 3, 4, 5].map((index) => <InputOTPSlot key={index} index={index} className="text-white" />)}
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-zinc-300">Nueva contraseña</Label>
              <Input
                id="new-password"
                type="password"
                autoComplete="new-password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                disabled={loading}
                required
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-zinc-300">Confirmar contraseña</Label>
              <Input
                id="confirm-password"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                disabled={loading}
                required
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold hover:opacity-90"
            >
              {loading ? "Actualizando..." : "Cambiar contraseña"}
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

export default NewPassword;
