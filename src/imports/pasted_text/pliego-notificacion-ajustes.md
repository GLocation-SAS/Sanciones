BRIEF: Ajustes al módulo "Verificación de Notificación del Pliego"

## CONTEXTO DEL PROYECTO

Este módulo es parte de un sistema de gestión y seguimiento de subetapas procesales. Los usuarios son abogados/auditores que verifican notificaciones de pliegos de cargos extraídos desde el sistema Integra. El flujo es:

1. Usuario carga Excel con lista de pliegos
2. Sistema procesa y extrae información de Integra mediante IA
3. Se muestra tabla de resultados con información de cada notificación
4. Usuario puede filtrar, revisar y descargar documentos asociados

**Objetivo del módulo**: Validar que las notificaciones de pliegos se realizaron correctamente según normativa legal.

---

## SITUACIÓN ACTUAL

Tengo una pantalla diseñada que muestra una tabla con los resultados del procesamiento. Necesito ajustarla según feedback de usuarios en reunión de validación.

**Problemas identificados:**
- Falta información crítica para la validación legal (tipo de notificación, estados)
- Formato de pliego incompleto (falta mes y día)
- Confusión entre "fecha de entrega" vs "fecha de notificación" (conceptos legales diferentes)
- No está claro cómo acceder a los múltiples documentos de cada notificación
- Faltan campos para determinar si la notificación está completa/válida

---

## AJUSTES REQUERIDOS EN LA TABLA

### 1. COLUMNA: PLIEGO (modificar)

**Estado actual:** SPL-2025-001 (sin mes/día)

**Debe ser:** SPL-2025-03-18 (estructura completa año-mes-día)

**Especificaciones UX:**
- Formato: SPL-YYYY-MM-DD
- Tipografía: Monospace o Semi-bold para diferenciación
- Es el identificador único, debe destacar visualmente
- Ancho: Auto, nunca truncar
- Sorteable

---

### 2. COLUMNA: TIPO DE NOTIFICACIÓN (NUEVA - agregar)

**Propósito:** Clasificación legal del tipo de notificación según normativa procesal.

**Valores posibles (5 opciones):**
- Citación personal física
- Citación personal correo electrónico
- Notificación física
- Aviso físico
- Aviso electrónico

**Especificaciones UX:**
- Implementar como: Badge/chip con color diferenciado por categoría
  - Citaciones personales: azul
  - Notificaciones: verde
  - Avisos: amarillo/naranja
- Texto legible, no abreviar
- Ancho sugerido: ~200px
- Debe ser filtrable (multi-select)
- Tooltip explicativo: "Tipo legal de notificación según Art. 826 CGP"

**Contexto legal:** Esta clasificación determina cómo se computan los términos procesales. Es crítica para validar legalidad.

---

### 3. COLUMNA: MEDIO DE ENTREGA (renombrar actual "Tipo de notificación")

**Estado actual:** Columna llamada "Tipo de notificación" con valores Físico/Electrónico

**Debe ser:** "Medio de entrega" (cambio de nombre solamente)

**Valores:** Físico / Electrónico

**Especificaciones UX:**
- Implementar como: Icon + label
  - 📄 Físico (icono de papel)
  - ✉️ Electrónico (icono de email)
- Ancho: ~120px
- Filtro tipo toggle: Físico / Electrónico / Todos

**Razón del cambio:** "Tipo de notificación" ahora es una clasificación legal diferente. "Medio de entrega" describe correctamente si se entregó en papel o digital.

---

### 4. COLUMNA: FECHA DE ENTREGA (renombrar actual "Fecha de notificación")

**Estado actual:** Columna llamada "Fecha de notificación"

**Debe ser:** "Fecha de entrega" (cambio de nombre solamente)

**Formato:** DD/MMM/YYYY (ej: 18/Mar/2025)

**Especificaciones UX:**
- Ancho: ~110px
- Sorteable (ascendente/descendente)
- Filtro: date range picker

**Razón del cambio:** Legalmente hay diferencia entre cuándo se entregó físicamente y cuándo se considera legalmente notificado. Esta es la fecha física de entrega.

---

### 5. COLUMNA: FECHA DE NOTIFICACIÓN (NUEVA - agregar)

**Propósito:** Fecha legal en que se considera notificado según normativa (puede diferir de fecha de entrega).

**Formato:** DD/MMM/YYYY

**Especificaciones UX:**
- Ancho: ~130px
- **Caso especial:** Si fecha de notificación ≠ fecha de entrega:
  - Mostrar badge pequeño: "+1 día" o "Diferida"
  - Color: amarillo suave (warning/info)
  - Tooltip: "Fecha legal de notificación según tipo de notificación"
- Si son iguales: mostrar fecha normal sin badge
- Sorteable
- Filtro: date range picker

**Contexto legal crítico:**
- **Medios electrónicos:** Fecha entrega = Fecha notificación (mismo día)
- **Avisos:** Fecha notificación = Fecha entrega + 1 día
- **Citaciones devueltas:** Fecha notificación queda vacía (no se notificó)

Esto afecta el cómputo de términos procesales, por eso debe estar claramente diferenciado.

---

### 6. COLUMNA: CÓDIGO (mantener como está)

**Valores:** Códigos de causales del sistema Integra (ej: "001", "R", etc.)

**Especificaciones UX:**
- Mantener diseño actual
- Ancho: ~80px
- Es información técnica de referencia, jerarquía visual secundaria

---

### 7. COLUMNA: ESTADO (NUEVA - agregar)

**Propósito:** Indicar si la notificación se completó exitosamente o tiene problemas.

**Valores posibles (3):**
- **Notificado:** La notificación se realizó correctamente
- **Devuelto:** La notificación fue devuelta (dirección incorrecta, persona no ubicada, etc.)
- **Pendiente:** Aún no se ha completado el proceso de notificación

**Especificaciones UX:**
- Implementar como: Status badge con colores semánticos
  - **Notificado:** verde (#10B981 o similar) + ícono ✓
  - **Devuelto:** amarillo (#F59E0B o similar) + ícono ↩
  - **Pendiente:** gris (#6B7280 o similar) + ícono ⏱
- Texto bold, badge con padding generoso
- Debe ser el elemento más escaneable de la tabla (jerarquía visual alta)
- Ancho: ~110px
- Filtro: multi-select (poder ver solo notificados, solo devueltos, etc.)

**Implicación:** Si está "Devuelto" o "Pendiente", el proceso no puede continuar a siguientes etapas. Es un bloqueador crítico.

---

### 8. COLUMNA: DOCUMENTO (rediseñar interacción)

**Contexto técnico crítico:**

En el sistema Integra, cada notificación no es un solo archivo, sino una **carpeta** que contiene múltiples documentos:
- Radicado principal del pliego
- Acuse de recibo (si es notificación electrónica)
- Constancia de entrega (si es notificación física)
- Posibles anexos, poderes, documentos complementarios
- En total: entre 2 y 10+ archivos por notificación

**Problema actual:** No está diseñado cómo el usuario accede a estos múltiples archivos.

**Solución requerida - 3 OPCIONES (elegir una e implementar):**

---

#### OPCIÓN A: Descarga de paquete completo (RECOMENDADA PARA MVP)

**Cómo funciona:**
- Botón/link en la celda: "Descargar paquete"
- Badge visual: "N archivos" (ej: "5 archivos")
- Al hacer clic: descarga automática de ZIP con todos los documentos de la carpeta
- Nombre del ZIP: `Notificacion_SPL-2025-03-18.zip`

**UI específica:**
┌─────────────────────────┐
│ 📦 Descargar paquete    │
│    Badge: 5 archivos    │
└─────────────────────────┘

**Tooltip al hover:** "Incluye: radicado, acuse de recibo y anexos"

**Ventajas:**
- Flujo más rápido (1 clic)
- Menor fricción cognitiva
- Contexto de uso: usuarios procesan decenas de pliegos, necesitan velocidad
- La carpeta completa es la unidad de trabajo (auditoría requiere todo)

**Desventajas:**
- No hay previsualización
- Descarga archivos que quizás no necesite

**Ancho columna:** ~140px

---

#### OPCIÓN B: Menú desplegable con lista de archivos

**Cómo funciona:**
- Botón en celda: "Ver documentos" + badge con cantidad
- Al hacer clic: abre **dropdown/popover** con listado de archivos
- Cada archivo es clickeable para descarga individual
- Opción al final: "Descargar todos (ZIP)"

**UI específica:**
Botón celda:
┌──────────────────┐
│ 📁 Ver docs  [5] │
└──────────────────┘
Dropdown al hacer clic:
┌─────────────────────────────────────┐
│ 📄 Radicado_SPL-2025-001.pdf       │ ← hover = descarga
│ 📎 Acuse_recibo.pdf                │ ← hover = descarga
│ 📎 Constancia_entrega.pdf          │ ← hover = descarga
│ 📎 Anexo_1.pdf                     │ ← hover = descarga
│ 📎 Anexo_2.pdf                     │ ← hover = descarga
│ ─────────────────────────────────  │
│ ⬇ Descargar todos (ZIP)            │ ← acción secundaria
└─────────────────────────────────────┘

**Especificaciones UX del dropdown:**
- Max-height: 320px, scroll si hay más archivos
- Cada item: hover state con background sutil
- Iconos diferenciados: PDF vs imágenes vs otros
- Tamaño de archivo visible (ej: "2.3 MB")
- Click en item = descarga directa
- Click en "Descargar todos" = ZIP completo

**Ventajas:**
- Usuario ve qué contiene antes de descargar
- Control granular (descargar solo lo que necesita)
- Transparencia del contenido

**Desventajas:**
- Requiere 2 clics para descargar todo
- Más complejidad de implementación
- Más carga cognitiva

**Ancho columna:** ~140px

---

#### OPCIÓN C: Modal de previsualización (MÁS ROBUSTA)

**Cómo funciona:**
- Botón en celda: "Ver documentos" o ícono de carpeta
- Al hacer clic: abre **modal full-screen** o semi-modal con:
  - **Sidebar izquierdo (30%):** Lista de documentos
  - **Área principal (70%):** Preview del documento seleccionado (PDF viewer, image viewer)
  - **Acciones:** "Descargar actual" / "Descargar todos"
  - **Navegación:** Flechas o tabs para cambiar entre documentos

**UI específica:**
┌────────────────────────────────────────────────────────┐
│  ← Volver          Notificación SPL-2025-03-18         │
├──────────────┬─────────────────────────────────────────┤
│              │                                          │
│ Documentos   │         [PREVIEW DEL PDF]                │
│              │                                          │
│ • Radicado   │      Página 1 de 3                       │
│ • Acuse      │                                          │
│ • Constancia │      [Contenido del documento]           │
│ • Anexo 1    │                                          │
│ • Anexo 2    │                                          │
│              │                                          │
│              │                                          │
├──────────────┴─────────────────────────────────────────┤
│        [⬇ Descargar actual]  [⬇ Descargar todos (ZIP)] │
└────────────────────────────────────────────────────────┘

**Especificaciones UX del modal:**
- Modal: 90vw x 85vh, overlay oscuro (rgba(0,0,0,0.7))
- Sidebar: sticky, scroll si hay muchos archivos
- Preview: PDF.js o visor nativo, zoom controls
- Documentos en sidebar: highlight el activo
- Keyboard navigation: Escape cierra, flechas cambian documento
- Loading state al cambiar de documento

**Ventajas:**
- Experiencia más rica y completa
- Usuario puede validar contenido sin descargar
- Útil para verificaciones rápidas

**Desventajas:**
- Mayor complejidad de desarrollo (PDF viewer, image viewer)
- Más pesado (carga de previews)
- Puede ser overkill si solo necesitan descargar

**Ancho columna:** ~120px

---

### MI RECOMENDACIÓN COMO SENIOR UX/UI:

**Empezar con OPCIÓN A** (descarga de paquete) y validar con usuarios reales.

**Razones fundamentadas:**
1. **Contexto de uso:** Usuarios procesan 20-50 pliegos por sesión. Necesitan velocidad.
2. **Comportamiento real:** En auditorías legales, se descarga todo primero, se revisa después en herramientas especializadas (Adobe, gestores documentales).
3. **Unidad de trabajo:** La carpeta completa es la evidencia. Rara vez necesitan solo un archivo.
4. **Implementación:** Menor riesgo técnico, más rápido time-to-market.
5. **Iteración:** Si usuarios piden más control, evolucionar a Opción B en siguiente sprint.

**Cuándo considerar Opción B o C:**
- Si en pruebas de usuario reportan: "necesito ver qué hay antes de descargar"
- Si hay limitaciones de ancho de banda (descargar 10 archivos innecesarios es problema)
- Si el flujo incluye revisión inmediata dentro del sistema (no solo descarga)

**Elige la opción que implementarás y diseña la interacción completa.**

---

## ORDEN FINAL DE COLUMNAS (izquierda → derecha)

1. Pliego
2. Tipo de notificación
3. Medio de entrega
4. Fecha de entrega
5. Fecha de notificación
6. Código
7. Estado
8. Documento

**Ancho total estimado:** ~1100-1200px (requiere scroll horizontal o vista expandida)

---

## FILTROS A AGREGAR/AJUSTAR

**Ubicación:** Encima de la tabla, alineados horizontalmente o en panel lateral colapsable

**Filtros nuevos requeridos:**
1. **Tipo de notificación:** Multi-select dropdown (5 opciones)
2. **Estado:** Multi-select (Notificado, Devuelto, Pendiente)
3. **Medio de entrega:** Toggle o radio buttons (Físico / Electrónico / Todos)
4. **Rango de fechas (entrega):** Date range picker
5. **Rango de fechas (notificación):** Date range picker

**Filtros existentes:** Mantener todos los actuales

**Funcionalidad:**
- Filtros se aplican en conjunto (AND logic)
- Botón "Limpiar filtros" visible
- Indicador visual de cuántos filtros están activos
- Contador de resultados: "Mostrando 23 de 150 registros"

---

## CONSIDERACIONES CRÍTICAS DE UX/UI

### Jerarquía visual (orden de importancia):
1. **Estado** → Debe ser lo más escaneable (colores, iconos, posición privilegiada)
2. **Pliego** → Identificador único, bold o mayor contraste
3. **Tipo de notificación** → Crítico para validación legal
4. **Fechas** → Agrupación visual (mismo formato, proximidad)
5. **Resto** → Información secundaria

### Densidad de información:
**Problema:** 8 columnas = tabla ancha, posible scroll horizontal

**Soluciones a considerar:**
- **Columnas colapsables:** "Código" y "Medio de entrega" pueden ocultarse por defecto
- **Sticky columns:** "Pliego" y "Estado" siempre visibles al hacer scroll horizontal
- **Vista compacta/expandida:** Toggle para cambiar densidad (row height, font size)
- **Breakpoint crítico:** Definir si en pantallas <1400px algunas columnas se ocultan automáticamente

### Responsive (mobile/tablet):
- **Mobile (<768px):** Convertir tabla a cards
  - Card muestra: Pliego (título) + Estado (badge) + Botón documento
  - Tap en card = expandir para ver resto de info
- **Tablet (768-1024px):** Tabla con scroll horizontal, sticky en Pliego + Estado

### Accesibilidad:
- **Color + iconos:** Badges de estado no solo color, también iconos
- **Tooltips:** En columnas nuevas (Tipo notificación, Fecha notificación)
- **Keyboard navigation:** Tab order lógico, Enter en botón documento
- **ARIA labels:** `aria-label="Descargar documentos de notificación SPL-2025-001"`
- **Focus visible:** Outline claro en elementos interactivos

### Estados de la tabla:
- **Loading:** Skeleton rows mientras procesa
- **Empty state:** "No se encontraron notificaciones. Cargue un archivo Excel para comenzar."
- **Error state:** Mensaje claro si falla carga de datos
- **Hover:** Highlight sutil de fila completa
- **Selección:** Si permite multi-selección (checkbox), especificar comportamiento

### Interacciones adicionales:
- **Sort:** Click en header de columna = ordenar (asc/desc)
- **Resize columns:** Si espacio lo permite, drag handles entre columnas
- **Export:** Botón para exportar tabla filtrada a Excel/CSV
- **Paginación:** Si hay +50 registros, implementar paginación (20-50 por página)