MÓDULO 3: VERIFICACIÓN DE ACTOS DE PRUEBA - ORGANIZACIÓN COMPLETA
PROPÓSITO
Validar el Acto de Pruebas (resolución que decide qué pruebas se aceptan/rechazan). Es la validación intermedia más compleja que determina: ¿Se archiva o se continúa a sanción?

ESTRUCTURA JERÁRQUICA DE DATOS
Acto de Prueba
  │
  ├─ Estado RUES (Activa/Liquidada/Cancelada)
  │   └─ Si NO Activa → ARCHIVO AUTOMÁTICO
  │
  ├─ CARGO 1: "No pagar aportes de seguridad social"
  │   │
  │   ├─ PERIODO 1 (Trim 1 2024)
  │   │   ├─ Hallazgo SER: "No pagó"
  │   │   ├─ Imágenes SER (capturas pantalla)
  │   │   └─ Resultado: 🔴 Sanción
  │   │
  │   ├─ PERIODO 2 (Trim 2 2024)
  │   │   ├─ Hallazgo SER: "Pagó"
  │   │   └─ Resultado: 🟢 Archivo
  │   │
  │   ├─ PERIODO 3 (Trim 3 2024)
  │   │   ├─ Hallazgo SER: "Pagó con sanción"
  │   │   └─ Resultado: 🔴 Sanción
  │   │
  │   └─ RECOMENDACIÓN CARGO 1: 🔴 Sanción
  │       (2 de 4 periodos requieren sanción)
  │
  ├─ CARGO 2: [misma estructura]
  │
  └─ RECOMENDACIÓN FINAL ACTO:
      🔴 Continuar a sanción o 🟢 Archivo

QUÉ SE PIDIÓ AGREGAR/MODIFICAR
1. AGREGAR "ESTADO RUES" (primera columna)

Crítico: Determina archivo automático
Si ≠ "Activa" → toda la fila background amarillo
Badge: Activa (verde) / Liquidada/Cancelada (rojo)

2. AGREGAR "PLIEGO"

SPL-2025-03-18
Referencia al pliego original

3. MODIFICAR "ACTO"

De: ACT-2025-001
A: ACT-2025-03-20 (agregar mes-día)

4. REEMPLAZAR "Resumen de cargos" → "CARGOS FORMULADOS"

Mostrar cargos específicos en badges
CLICKEABLE → abre modal

5. AGREGAR BLOQUE COMPLETO DE COMUNICACIÓN (5 columnas)

Tipo de comunicación
Medio de entrega
Fecha de entrega
Fecha de comunicación
Estado de comunicación

6. ELIMINAR "Estado de la notificación"
7. MODIFICAR "HALLAZGOS DEL SER"

Hacer clickeable → abre MISMO modal


ORGANIZACIÓN VISUAL
NIVEL 1: TABLA PRINCIPAL (17 columnas)
Solo información de resumen:
RUESPliegoActoAñoCargosComunicación (5 cols)DescargosPruebasApoderadoFechaHallazgosDoc✓ ActivaSPL...ACT...2025[C1][C2] ← Click...SíSíJuan18/Mar[Ver] ← Click📄
NO se muestra:

Detalle de periodos
Hallazgos por periodo
Imágenes del SER
Resultados por periodo
Recomendaciones


NIVEL 2: MODAL DE VALIDACIÓN (900px ancho)
Se abre al hacer click en:

Columna "Cargos formulados"
O columna "Hallazgos del SER"

Muestra TODO el detalle:
┌─────────────────────────────────────────────────┐
│ Validación de Acto ACT-2025-03-20          [X] │
├─────────────────────────────────────────────────┤
│                                                  │
│ Estado RUES: 🟢 Activa                          │
│ Pliego asociado: SPL-2025-03-18                 │
│                                                  │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                  │
│ 📋 CARGO 1: No pagar aportes seguridad social  │
│                                                  │
│ TABLA DE PERIODOS:                              │
│ ┌────────┬──────────────┬─────────┬──────────┐ │
│ │Periodo │Hallazgo SER  │Imágenes │Resultado │ │
│ ├────────┼──────────────┼─────────┼──────────┤ │
│ │Trim 1  │No pagó (rojo)│ [Ver]   │🔴 Sanción│ │
│ │Trim 2  │Pagó (verde)  │ [Ver]   │🟢 Archivo│ │
│ │Trim 3  │Pagó sanción  │ [Ver]   │🔴 Sanción│ │
│ │Trim 4  │Subsanó (azul)│ [Ver]   │🟢 Archivo│ │
│ └────────┴──────────────┴─────────┴──────────┘ │
│                                                  │
│ RECOMENDACIÓN CARGO 1:                          │
│ ┌────────────────────────────────────────────┐ │
│ │ 🔴 Continuar a sanción                     │ │
│ │ Razón: 2 de 4 periodos requieren sanción  │ │
│ └────────────────────────────────────────────┘ │
│                                                  │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                  │
│ 📋 CARGO 2: Presentar información extemporánea │
│                                                  │
│ [Repetir estructura tabla + recomendación]     │
│                                                  │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                  │
│ RECOMENDACIÓN FINAL DEL ACTO:                   │
│ ┌────────────────────────────────────────────┐ │
│ │                                             │ │
│ │     🔴 CONTINUAR A DECISIÓN DE SANCIÓN     │ │
│ │                                             │ │
│ │     (Al menos un cargo requiere sanción)   │ │
│ │                                             │ │
│ └────────────────────────────────────────────┘ │
│                                                  │
│                    [Cerrar]                      │
└─────────────────────────────────────────────────┘

NIVEL 3: SUB-MODAL GALERÍA IMÁGENES (800px ancho)
Se abre al hacer click en "[Ver]" en la columna Imágenes
Muestra:
┌──────────────────────────────────────────────┐
│ ← Volver    Imágenes SER - Trim 1 2024      │
├──────────────────────────────────────────────┤
│                                               │
│ Cargo: No pagar aportes seguridad social    │
│ Periodo: Trim 1 2024                         │
│ Hallazgo: No pagó (badge rojo)               │
│                                               │
│ ┌────────────────────────────────────────┐  │
│ │                                         │  │
│ │                                         │  │
│ │    [CAPTURA PANTALLA DEL SER]          │  │
│ │                                         │  │
│ │                                         │  │
│ └────────────────────────────────────────┘  │
│                                               │
│ ◀ Anterior      1 de 3      Siguiente ▶     │
│                                               │
│ [⬇ Descargar actual] [⬇ Descargar todas]    │
│                                               │
└──────────────────────────────────────────────┘

HALLAZGOS DEL SER - 6 Estados con colores
HallazgoColorSignificadoNo pagóRojo #EF4444No realizó el pago → SanciónPagóVerde #10B981Pagó correctamente → ArchivoPagó con sanciónAmarillo #F59E0BPagó pero con sanción → SanciónPagó fuera de tiempoNaranja #F97316Pagó tarde → SanciónSubsanóAzul #3B82F6Corrigió la situación → ArchivoCesóGris #6B7280Dejó de operar → Archivo

LÓGICA DE VALIDACIÓN
Por periodo:
Hallazgo = No pagó/Pagó con sanción/Pagó fuera tiempo → 🔴 Sanción
Hallazgo = Pagó/Subsanó/Cesó → 🟢 Archivo
Por cargo:
Si ≥1 periodo = Sanción → Cargo requiere 🔴 Sanción
Si todos periodos = Archivo → Cargo va a 🟢 Archivo
Por acto (Final):
Si ≥1 cargo = Sanción → Acto va a 🔴 Sanción
Si todos cargos = Archivo → Acto va a 🟢 Archivo
Regla RUES (prioritaria):
Si RUES ≠ Activa → 🟢 ARCHIVO AUTOMÁTICO
(ignora hallazgos, todo se archiva)

FLUJO DE INTERACCIÓN
USUARIO EN TABLA
      ↓
  Click en "Cargos formulados"
   O "Hallazgos del SER"
      ↓
  ABRE MODAL
  (ve todos los cargos con periodos)
      ↓
  Click en "[Ver]" en columna Imágenes
      ↓
  ABRE SUB-MODAL
  (galería de imágenes del SER)
      ↓
  Descarga imágenes
      ↓
  Cierra sub-modal → vuelve al modal
      ↓
  Cierra modal → vuelve a tabla

RESUMEN DE QUÉ VA DÓNDE
UbicaciónQué contieneTABLAResumen general del acto (17 columnas info básica)MODALValidación completa: cargos → periodos → hallazgos → recomendacionesSUB-MODALGalería de imágenes del SER por periodoDescarga tablaPDF de la resolución del actoDescarga sub-modalImágenes del SER (individual o todas)