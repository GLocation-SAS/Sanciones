"use client";

/**
 * Capa de compatibilidad react-router → Next.js App Router.
 *
 * Emula `useNavigate` y `useLocation` usando las APIs de next/navigation,
 * para minimizar los cambios requeridos en App.tsx durante la migración.
 *
 * ⚠️ location.state se maneja con sessionStorage como respaldo temporal,
 *    ya que Next.js App Router no soporta router state nativo.
 */

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useRef, useEffect } from "react";

/* ─── Almacén temporal de state en sessionStorage ─── */
const NAV_STATE_KEY = "__nav_state__";

function saveNavState(state: unknown) {
  if (typeof window === "undefined" || state == null) return;
  try {
    sessionStorage.setItem(NAV_STATE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

function readNavState(): Record<string, unknown> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(NAV_STATE_KEY);
    if (!raw) return null;
    // Limpiar inmediatamente después de leer (one-shot)
    sessionStorage.removeItem(NAV_STATE_KEY);
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/* ─── Resolver rutas relativas ─── */
function resolveRelativePath(basePath: string, to: string): string {
  // Ya es absoluta
  if (to.startsWith("/")) return to;

  const baseParts = basePath.split("/").filter(Boolean);

  // '../algo' — sube un nivel y luego navega
  if (to.startsWith("../")) {
    baseParts.pop(); // sube un nivel
    const rest = to.slice(3);
    return "/" + [...baseParts, rest].filter(Boolean).join("/");
  }

  // 'algo' — relativo al directorio actual
  return "/" + [...baseParts, to].filter(Boolean).join("/");
}

/* ─── useNavigate emulation ─── */
type NavigateOptions = { state?: Record<string, unknown>; replace?: boolean };

export function useNavigate() {
  const router = useRouter();
  const pathname = usePathname();

  const navigate = useCallback(
    (to: string | number, options?: NavigateOptions) => {
      if (typeof to === "number") {
        if (to === -1) router.back();
        else if (to === 1) router.forward();
        return;
      }

      // Resolver rutas relativas
      const resolvedPath = resolveRelativePath(pathname, to);

      // Guardar state en sessionStorage
      if (options?.state) {
        saveNavState(options.state);
      }

      if (options?.replace) {
        router.replace(resolvedPath);
      } else {
        router.push(resolvedPath);
      }
    },
    [router, pathname],
  );

  return navigate;
}

/* ─── useLocation emulation ─── */
interface LocationLike {
  pathname: string;
  search: string;
  state: Record<string, unknown> | null;
}

export function useLocation(): LocationLike {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const stateRef = useRef<Record<string, unknown> | null>(null);
  const initializedRef = useRef(false);

  // Leer el state solo una vez al montar el componente
  useEffect(() => {
    if (!initializedRef.current) {
      stateRef.current = readNavState();
      initializedRef.current = true;
    }
  }, []);

  // En el primer render (SSR o hidratación), intentar leer sincrónicamente
  if (!initializedRef.current) {
    stateRef.current = readNavState();
    initializedRef.current = true;
  }

  const location = useMemo(() => {
    const search = searchParams.toString();
    return {
      pathname,
      search: search ? `?${search}` : "",
      state: stateRef.current,
    };
  }, [pathname, searchParams]);

  return location;
}
