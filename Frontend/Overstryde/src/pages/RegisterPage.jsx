import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { registerCustomer, verifyEmailCode } from "../services/Authservice";

export const RegisterPage = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [name, setName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const CODE_LENGTH = 6;
  const [code, setCode] = useState(Array(CODE_LENGTH).fill(""));

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!acceptedTerms) {
      setError("Debes aceptar los términos y condiciones.");
      return;
    }

    setLoading(true);
    try {
      await registerCustomer({ name, last_name, email, password });
      setSuccess("¡Cuenta creada! Te enviamos un código a tu correo.");
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
      document.getElementById(`code-${index + 1}`)?.focus();
    }
  };

  const handleCodeKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      document.getElementById(`code-${index - 1}`)?.focus();
    }
  };

  const handleVerify = async () => {
    setError("");
    const fullCode = code.join("");

    if (fullCode.length < CODE_LENGTH) {
      setError("Ingresa el código completo.");
      return;
    }

    setLoading(true);
    try {
      await verifyEmailCode(fullCode);
      setSuccess("¡Correo verificado! Redirigiendo al login...");
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
            <h2 className="text-2xl font-bold text-zinc-900">
              {step === 1 ? "Crea tu cuenta" : "Verifica tu correo"}
            </h2>
            <p className="text-sm text-zinc-500">
              {step === 1
                ? "Únete a la comunidad de OVERSTRYD"
                : `Ingresa el código de 6 dígitos que enviamos a ${email}`}
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
            <form className="space-y-5" onSubmit={handleRegister}>
              <FieldGroup>

                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="name">Nombre</FieldLabel>
                    <Input
                      id="name"
                      placeholder="Mateo"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-2 h-11 rounded-xl"
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="lastname">Apellido</FieldLabel>
                    <Input
                      id="lastname"
                      placeholder="Iraheta"
                      type="text"
                      required
                      value={last_name}
                      onChange={(e) => setLastName(e.target.value)}
                      className="mt-2 h-11 rounded-xl"
                    />
                  </Field>
                </div>

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

                <Field>
                  <div className="flex items-start justify-between gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="terms-checkbox"
                        checked={acceptedTerms}
                        onCheckedChange={(checked) => setAcceptedTerms(checked)}
                      />
                      <Label htmlFor="terms-checkbox" className="text-zinc-600">
                        Acepto los términos
                      </Label>
                    </div>
                    <NavLink
                      to="/termsOfService"
                      className="text-yellow-500 font-medium hover:underline"
                    >
                      Ver términos
                    </NavLink>
                  </div>
                </Field>

              </FieldGroup>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-semibold disabled:opacity-60"
              >
                {loading ? "Creando cuenta..." : "Crear cuenta"}
              </Button>
            </form>
          )}

          {step === 2 && (
            <div className="flex flex-col items-center space-y-6">
              <div className="flex gap-2">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    id={`code-${index}`}
                    value={digit}
                    onChange={(e) => handleCodeChange(e.target.value, index)}
                    onKeyDown={(e) => handleCodeKeyDown(e, index)}
                    maxLength={1}
                    className="w-10 h-10 sm:w-12 sm:h-12 text-center text-lg rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                ))}
              </div>

              <Button
                type="button"
                disabled={loading}
                className="w-full h-11 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-semibold disabled:opacity-60"
                onClick={handleVerify}
              >
                {loading ? "Verificando..." : "Verificar código"}
              </Button>

              <button
                type="button"
                className="text-sm text-zinc-400 hover:text-zinc-600"
                onClick={() => {
                  setStep(1);
                  setError("");
                  setSuccess("");
                  setCode(Array(CODE_LENGTH).fill(""));
                }}
              >
                ← Volver
              </button>
            </div>
          )}

          <div className="mt-6 text-center text-sm text-zinc-500">
            ¿Ya tienes una cuenta?{" "}
            <NavLink to="/login" className="text-yellow-500 font-semibold hover:underline">
              Inicia sesión
            </NavLink>
          </div>

        </div>
      </div>
    </div>
  );
};