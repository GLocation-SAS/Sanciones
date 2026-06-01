PROMPT PARA FIGMA MAKE - AJUSTES AL MÓDULO 3 EXISTENTE
Tengo un diseño existente del módulo "Verificación de Actos de Prueba". Aplica solo los ajustes especificados, manteniendo el estilo visual actual.

# AJUSTES A LA TABLA PRINCIPAL

## COLUMNAS NUEVAS AL INICIO

### 1. ESTADO RUES (primera columna)
**Badge con estados:**
- Activa: Verde #10B981, icon ✓
- Liquidada/Cancelada/En liquidación: Rojo #EF4444, icon ⚠
- Padding: 6px 12px, font 12px Semi-bold
- Ancho: ~130px

**CRÍTICO - Fila completa:**
Cuando Estado ≠ "Activa":
- Background de toda la fila: #FEF3C7 (amarillo claro)
- Tooltip: "Archivo automático por estado RUES"

### 2. PLIEGO (después de Estado RUES)
- Formato: SPL-2025-03-18 (año-mes-día)
- Mono/Semi-bold, ancho ~140px

## COLUMNAS A MODIFICAR

### ACTO (ya existe)
- Cambiar formato a: ACT-2025-03-20 (agregar mes-día)

### REEMPLAZAR "Resumen de cargos" → "CARGOS FORMULADOS"
**Diseño:**
- Si 1-3 cargos: Badges individuales [Cargo 1] [Cargo 2]
  - Background: #DBEAFE, texto #1E40AF
  - Padding 4px 10px, font 12px Medium
- Si >3: Mostrar 3 + badge "+N más"
- Ancho: ~200px
- **Click → Abre modal de validación** (cursor pointer, hover sutil)

## BLOQUE NUEVO: COMUNICACIÓN (después de Cargos)

Agregar 5 columnas (igual que Módulo 1):

### 3. TIPO DE COMUNICACIÓN
- Badge 5 opciones (Citaciones: Azul, Notificaciones: Verde, Avisos: Naranja)
- Ancho ~180px

### 4. MEDIO DE ENTREGA
- Icon + texto: 📄 Físico / ✉️ Electrónico
- Ancho ~120px

### 5. FECHA DE ENTREGA
- Formato DD/MMM/YYYY, center, ancho ~120px

### 6. FECHA DE COMUNICACIÓN
- Formato DD/MMM/YYYY
- Si difiere de entrega: badge pequeño "Diferida" (#FEF3C7 bg, #92400E texto)
- Ancho ~130px

### 7. ESTADO DE COMUNICACIÓN
- Badge: Notificado (verde ✓) / Devuelto (rojo ↩) / Pendiente (gris ⏱)
- Padding 6px 12px, font 12px Semi-bold
- Ancho ~120px

## COLUMNAS A ELIMINAR
- "Estado de la notificación"
- "Estado" (si existe y no está clara)

## MODIFICAR COMPORTAMIENTO

### HALLAZGOS DEL SER (ya existe)
- Cambio: **Click → Abre mismo modal que "Cargos formulados"**
- Cursor pointer, hover sutil
- Mantener diseño visual actual

### DOCUMENTO (ya existe)
- Cambiar texto a: "📄 Descargar acto"

## ORDEN FINAL (17 columnas)
1. Estado RUES *(nueva)*
2. Pliego *(nueva)*
3. Acto *(modificar)*
4. Año
5. Cargos formulados *(reemplazar)*
6-10. Bloque comunicación *(nuevo)*
11-15. Descargos, Solicitud pruebas, Apoderado, Fecha presentación, Pruebas incorporadas
16. Hallazgos SER *(modificar comportamiento)*
17. Documento

---

# MODAL: VALIDACIÓN COMPLETA

**Trigger:** Click en "Cargos formulados" O "Hallazgos del SER"

**Dimensiones:** 900px ancho, altura dinámica (max 85vh)

**Estructura:**
HEADER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Validación de Acto ACT-2025-03-20      [X]
Estado RUES: 🟢 Activa
Pliego: SPL-2025-03-18
POR CADA CARGO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 CARGO 1: [Nombre del cargo]
TABLA DE PERIODOS:
┌─────────┬────────────┬─────────┬──────────┐
│ Periodo │ Hallazgo   │ Imágenes│ Resultado│
├─────────┼────────────┼─────────┼──────────┤
│ Trim 1  │ No pagó    │ [Ver]   │ 🔴 Sanción│
│ Trim 2  │ Pagó       │ [Ver]   │ 🟢 Archivo│
└─────────┴────────────┴─────────┴──────────┘
RECOMENDACIÓN CARGO:
┌─────────────────────────────────────┐
│ 🔴 Continuar a sanción              │
│ Razón: 2 de 4 periodos con sanción │
└─────────────────────────────────────┘
[Repetir para cada cargo]
RECOMENDACIÓN FINAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┌─────────────────────────────────────┐
│  🔴 CONTINUAR A DECISIÓN DE SANCIÓN │
│                                      │
│  (Al menos un cargo con sanción)    │
└─────────────────────────────────────┘
[Cerrar]

**Especificaciones clave:**

**Tabla de periodos:**
- Headers: Background #F9FAFB
- Columna Hallazgo: Badges con colores:
  - No pagó: Rojo #EF4444
  - Pagó: Verde #10B981
  - Pagó sanción: Amarillo #F59E0B
  - Pagó fuera tiempo: Naranja #F97316
  - Subsanó: Azul #3B82F6
  - Cesó: Gris #6B7280
- Columna Imágenes: Botón "[Ver]" → abre sub-modal galería
- Columna Resultado: Badge 🔴 Sanción (rojo) / 🟢 Archivo (verde)

**Recomendación cargo:**
- Container: Background #F9FAFB
- Border-left: 4px (rojo si sanción, verde si archivo)
- Padding: 16px
- Font título: 16px Semi-bold

**Recomendación final:**
- Background: #DBEAFE (sanción) / #D1FAE5 (archivo)
- Border: 2px sólido
- Padding: 32px, centrado
- Font: 20px Bold, uppercase
- Icon grande 🔴/🟢

**Separación entre cargos:** Línea 2px o espacio 48px

---

# SUB-MODAL: GALERÍA DE IMÁGENES SER

**Trigger:** Click en "[Ver]" en tabla de periodos

**Dimensiones:** 800px ancho, altura dinámica

**Estructura:**
← Volver       Imágenes SER - Trim 1 2024
Cargo: [Nombre]
Periodo: Trim 1 2024
Hallazgo: [Badge No pagó]
┌──────────────────────────┐
│                           │
│   [IMAGEN CAPTURA SER]   │
│                           │
└──────────────────────────┘
◀ Anterior    1 de 3    Siguiente ▶
[⬇ Descargar actual] [⬇ Descargar todas]

**Especificaciones:**
- Imagen centrada, max-width 100%, max-height 60vh
- Navegación: Botones + indicador central
- Botones descarga: Secundarios, centrados

---

# FILTROS NUEVOS

Agregar al panel existente:

1. **Estado RUES:** Multi-select (Activa, Liquidada, Cancelada, En liquidación)
2. **Estado comunicación:** Multi-select (Notificado, Devuelto, Pendiente)
3. **Tipo comunicación:** Multi-select (5 opciones)

---

# NOTAS CLAVE

**Tabla ancha (17 columnas):**
- Solución: Scroll horizontal con sticky en: Estado RUES, Pliego, Cargos formulados

**Archivo automático RUES:**
- Fila completa background #FEF3C7
- En modal: Mensaje destacado al inicio "⚠ Archivo automático por estado RUES"

**Reutiliza:**
- Bloque comunicación = Módulo 1
- Componentes de badges existentes

**No rediseñes:** Solo aplica cambios especificados

---