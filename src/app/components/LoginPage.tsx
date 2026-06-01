import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import TicLogo from "../../imports/Svg";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/sanciones/notificacion-pliego");
  };

  const handleMicrosoftLogin = () => {
    navigate("/sanciones/notificacion-pliego");
  };

  return (
    <div
      className="min-h-screen bg-background text-foreground flex items-center justify-center p-4"
      style={{ fontFamily: "var(--font-body)" }}
    >
      <div className="w-full max-w-[900px] bg-card rounded-lg overflow-hidden flex flex-col md:flex-row shadow-elevation-sm">
        {/* Left Column - Form */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 py-10 md:px-12 bg-background">
          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-[65px] h-[118px] mb-2">
              <TicLogo />
            </div>
          </div>

          {/* Welcome text */}
          <h2
            className="mb-1 text-center text-secondary"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "var(--text-2xl)",
              fontWeight: "var(--font-weight-bold)",
            }}
          >
            Bienvenido
          </h2>
          <p
            className="text-center mb-8 text-muted-foreground"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-xs)",
              fontWeight: "var(--font-weight-normal)",
            }}
          >
            a nuestro sistema de análisis de procesos sancionatorios
          </p>

          {/* Microsoft Login */}
          <div className="w-full max-w-[320px] mb-6">
            <p
              className="text-center mb-3 text-foreground"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--text-xs)",
                fontWeight: "var(--font-weight-bold)",
              }}
            >
              Si es usuario MinTIC Activo
            </p>
            <button
              onClick={handleMicrosoftLogin}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-border rounded-lg bg-background text-foreground transition-colors hover:bg-card"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-xs)",
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 21 21">
                <rect x="1" y="1" width="9" height="9" fill="#F25022" />
                <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
                <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
                <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
              </svg>
              INICIAR SESIÓN CON MICROSOFT
            </button>
          </div>

          {/* External User */}
          <div className="w-full max-w-[320px]">
            <p
              className="text-center mb-4 text-foreground"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--text-xs)",
                fontWeight: "var(--font-weight-bold)",
              }}
            >
              Si es usuario externo
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  className="block mb-1 text-foreground"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-xs)",
                    fontWeight: "var(--font-weight-medium)",
                  }}
                >
                  Correo Electrónico
                </label>
                <Input
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  inputSize="sm"
                />
              </div>

              <div>
                <label
                  className="block mb-1 text-foreground"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-xs)",
                    fontWeight: "var(--font-weight-medium)",
                  }}
                >
                  Contraseña
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    inputSize="sm"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                size="sm"
                className="w-full h-[44px] tracking-wider"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-xs)",
                  fontWeight: "var(--font-weight-bold)",
                  letterSpacing: "0.1em",
                }}
              >
                INICIAR SESIÓN
              </Button>
            </form>

            <p
              className="text-center mt-5 text-foreground"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-xs)",
                fontWeight: "var(--font-weight-normal)",
              }}
            >
              Haga click aquí para{" "}
              <a
                href="#"
                className="underline text-primary"
                onClick={(e) => e.preventDefault()}
              >
                reestablecer la contraseña
              </a>
            </p>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="hidden md:block w-[45%] relative overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1744868562210-fffb7fa882d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMHRlY2hub2xvZ3klMjBkaWdpdGFsJTIwbmV0d29ya3xlbnwxfHx8fDE3NzMzMjU0MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Cloud technology"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
