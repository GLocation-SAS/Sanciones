import React from "react";
import { SancionesModule } from "./SancionesModule";
import { modulo1Config } from "../../modulos/modulo1";
import { modulo2Config } from "../../modulos/modulo2";
import { modulo3Config } from "../../modulos/modulo3";
import { modulo4Config } from "../../modulos/modulo4";
import { modulo5Config } from "../../modulos/modulo5";

export function NotificacionPliegoPage() {
  return <SancionesModule config={modulo1Config} />;
}

export function DescargosPruebasPage() {
  return <SancionesModule config={modulo2Config} />;
}

export function ActosPruebaPage() {
  return <SancionesModule config={modulo3Config} />;
}

export function AlegatosConclusionPage() {
  return <SancionesModule config={modulo4Config} />;
}

export function CumplimientoObligacionPage() {
  return <SancionesModule config={modulo5Config} />;
}
