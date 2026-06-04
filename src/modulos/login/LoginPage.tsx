"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "@/app/router-compat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { bodyXs, headingBold } from "@/app/shared";

/* LoginPage Component */
export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => { e.preventDefault(); navigate("/sanciones/notificacion-pliego"); };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-3 sm:p-4" style={{ fontFamily: "var(--font-body)" }}>
      <div className="w-full max-w-[900px] bg-card rounded-lg overflow-hidden flex flex-col md:flex-row shadow-elevation-sm">
        <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-8 sm:py-10 md:px-12 bg-background">
          <div className="flex flex-col items-center mb-6"><div className="w-[65px] h-[118px] mb-2"><Image src="/logoMinTic.png" alt="MinTic" width={65} height={118} /></div></div>
          <h2 className="mb-1 text-center text-secondary" style={{ ...headingBold, fontSize: "var(--text-2xl)" }}>Bienvenido</h2>
          <p className="text-center mb-8 text-muted-foreground" style={bodyXs}>a nuestro sistema de analisis de procesos sancionatorios</p>
          <div className="w-full max-w-[320px] mb-6">
            <p className="text-center mb-3 text-foreground" style={{ ...headingBold, fontSize: "var(--text-xs)" }}>Si es usuario MinTIC Activo</p>
            <button onClick={() => navigate("/sanciones/notificacion-pliego")} className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-border rounded-lg bg-background text-foreground transition-colors hover:bg-card" style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}>
              <svg width="20" height="20" viewBox="0 0 21 21"><rect x="1" y="1" width="9" height="9" fill="#F25022" /><rect x="11" y="1" width="9" height="9" fill="#7FBA00" /><rect x="1" y="11" width="9" height="9" fill="#00A4EF" /><rect x="11" y="11" width="9" height="9" fill="#FFB900" /></svg>
              INICIAR SESION CON MICROSOFT
            </button>
          </div>
          <div className="w-full max-w-[320px]">
            <p className="text-center mb-4 text-foreground" style={{ ...headingBold, fontSize: "var(--text-xs)" }}>Si es usuario externo</p>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block mb-1 text-foreground" style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}>Correo Electronico</label>
                <Input type="email" placeholder="correo@ejemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} inputSize="sm" />
              </div>
              <div>
                <label className="block mb-1 text-foreground" style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}>Contrasena</label>
                <div className="relative">
                  <Input type={showPassword ? "text" : "password"} placeholder="Contrasena" value={password} onChange={(e) => setPassword(e.target.value)} inputSize="sm" className="pr-10" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" size="sm" className="w-full h-[44px] tracking-wider" style={{ ...bodyXs, fontWeight: "var(--font-weight-bold)", letterSpacing: "0.1em" }}>INICIAR SESION</Button>
            </form>
            <p className="text-center mt-5 text-foreground" style={bodyXs}>
              Haga click aqui para <a href="#" className="underline text-primary" onClick={(e) => e.preventDefault()}>reestablecer la contrasena</a>
            </p>
          </div>
        </div>
        <div className="hidden md:block w-[45%] relative overflow-hidden">
          <Image src="/fotologin.png" alt="Login" width={500} height={700} />
        </div>
      </div>
    </div>
  );
}
