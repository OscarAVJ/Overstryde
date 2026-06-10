import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Send } from "lucide-react";
import { requestPasswordRecovery, resetPassword } from "../services/Authservice";

export const RecoverAccountPage = () => {
  const navigate = useNavigate();
  const CODE_LENGTH = 6;

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  const [code, setCode] = useState(Array(CODE_LENGTH).fill(""));
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRequestRecovery = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await requestPasswordRecovery(email);
      setSuccess("¡Listo! Te enviamos el código a tu correo.");
      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (value, index) => {
    if (!/^[0-9a-fA-F]?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < CODE_LENGTH - 1) {
      document.getElementById(`rc-${index + 1}`)?.focus();
    }
  };

  const handleCodeKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      document.getElementById(`rc-${index - 1}`)?.focus();
    }
  };

  const handleReset = async () => {
    setError("");
    const fullCode = code.join("");

    if (fullCode.length < CODE_LENGTH) {
      setError("Ingresa el código completo.");
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setLoading(true);
    try {
      await resetPassword({ code: fullCode, newPassword });
      setSuccess("¡Contraseña actualizada! Redirigiendo al login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-xl">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">

          <div className="text-center mb-8 space-y-2">
            <h1 className="text-3xl font-black tracking-tight">OVERSTRYD</h1>
            <h2 className="text-2xl font-bold text-zinc-900">Recuperar contraseña</h2>
            <p className="text-sm text-zinc-500 leading-relaxed">
              {step === 1
                ? "Ingresa tu correo electrónico y te enviaremos un código para restablecer tu contraseña."
                : `Ingresa el código que llegó a ${email} y tu nueva contraseña.`}
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 text-center">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 rounded-xl bg-green-50 border border-green-200 text-green-600 text-sm px-4 py-3 text-center">
              {success}
            </div>
          )}

          {step === 1 && (
            <form className="space-y-5" onSubmit={handleRequestRecovery}>
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
              </FieldGroup>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-semibold gap-2 disabled:opacity-60"
              >
                <Send size={16} />
                {loading ? "Enviando..." : "Enviar instrucciones"}
              </Button>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <Separator />

              <div className="flex flex-col items-center space-y-3">
                <p className="text-sm text-zinc-600 text-center">
                  Ingresa el código de 6 caracteres que llegó a tu correo:
                </p>
                <div className="flex gap-2">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      id={`rc-${index}`}
                      value={digit}
                      onChange={(e) => handleCodeChange(e.target.value, index)}
                      onKeyDown={(e) => handleCodeKeyDown(e, index)}
                      maxLength={1}
                      className="w-10 h-10 sm:w-12 sm:h-12 text-center text-lg rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  ))}
                </div>
              </div>

              <Field>
                <FieldLabel htmlFor="newPassword">Nueva contraseña</FieldLabel>
                <div className="relative mt-2">
                  <Input
                    id="newPassword"
                    placeholder="********"
                    type={showPassword ? "text" : "password"}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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

              <Button
                type="button"
                disabled={loading}
                className="w-full h-11 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-semibold disabled:opacity-60"
                onClick={handleReset}
              >
                {loading ? "Guardando..." : "Restablecer contraseña"}
              </Button>

              <button
                type="button"
                className="w-full text-sm text-zinc-400 hover:text-zinc-600"
                onClick={() => {
                  setStep(1);
                  setError("");
                  setSuccess("");
                  setCode(Array(CODE_LENGTH).fill(""));
                  setNewPassword("");
                }}
              >
                ← Volver
              </button>
            </div>
          )}

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