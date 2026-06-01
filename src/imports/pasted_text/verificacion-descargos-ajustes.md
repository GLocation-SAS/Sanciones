Tengo un diseño existente del módulo "Verificación de Descargos y Pruebas". Necesito que apliques ajustes específicos solicitados por usuarios en reunión de validación.

# INSTRUCCIONES GENERALES

- **NO rediseñes desde cero**
- **Mantén el estilo visual actual** (tipografía, colores, componentes)
- **Solo agrega, modifica o elimina** lo especificado a continuación
- **Reutiliza componentes existentes** del diseño actual
- **Integra los cambios coherentemente** con el diseño base

---

# AJUSTES A LA TABLA PRINCIPAL

## COLUMNAS A MODIFICAR

### Columna "PLIEGO"
**Cambio:** Agregar mes y día al formato
- **Formato actual:** SPL-2025-001
- **Formato nuevo:** SPL-2025-03-18 (año-mes-día completo)
- Mantén todo lo demás igual (tipografía, ancho, alineación)

---

## COLUMNAS NUEVAS A AGREGAR

Agregar las siguientes 6 columnas nuevas. Intégralas usando el mismo estilo visual de las columnas existentes.

### 1. "TIENE APODERADO" (después de "Radicado")

**Diseño:**
- Badge con 2 estados:

Estado CON apoderado:
- Badge verde (usar color success del sistema)
- Icon persona (👤) + nombre
- Ejemplo: "👤 María González"
- Padding: 4px 12px
- Border-radius: 6px
- Font: 12px Medium

Estado SIN apoderado:
- Badge gris (usar color neutral del sistema)
- Texto: "Sin apoderado"
- Mismo estilo que estado anterior

**Ancho sugerido:** ~180px

---

### 2. "FECHA DE PRESENTACIÓN" (después de "Tiene apoderado")

**Diseño:**
- Formato de fecha: DD/MMM/YYYY
- Ejemplo: "18/Mar/2025"
- Tipografía: Igual que otras celdas de fecha en el diseño actual
- Alineación: Center
- **Ancho sugerido:** ~120px

---

### 3. "FECHA DE RADICACIÓN" (después de "Fecha de presentación")

**Diseño base:**
- Formato: DD/MMM/YYYY
- Igual que "Fecha de presentación"

**Caso especial:** Cuando fecha radicación < fecha presentación
- Mostrar fecha + badge pequeño adicional
- Ejemplo visual: `18/Mar/2025  [-2 días]`
- Badge pequeño:
  - Background: Amarillo claro (#FEF3C7)
  - Texto: Naranja oscuro (#92400E)
  - Texto: "-N días"
  - Padding: 2px 8px
  - Border-radius: 4px
  - Font: 11px Medium
  - Separación de fecha: 8px

**Ancho sugerido:** ~160px (más ancho por badge)

**Agregar tooltip:** "Fecha oficial de radicación en Integra. Se usa para calcular términos."

---

### 4. "DENTRO DE TÉRMINOS" (después de "Fecha de radicación")

**Diseño:**
- Badge con 2 estados:

Estado A TIEMPO:
- Badge verde (color success)
- Icon checkmark: ✓
- Texto: "A tiempo"
- Padding: 6px 12px
- Border-radius: 6px
- Font: 12px Semi-bold
- Color texto: Blanco

Estado EXTEMPORÁNEO:
- Badge rojo (color error)
- Icon warning: ⚠
- Texto: "Extemporáneo"
- Mismo estilo que A tiempo

**Ancho sugerido:** ~120px
**Jerarquía visual:** MUY ALTA - debe destacar mucho en la tabla

---

### 5. "PRUEBAS ASOCIADAS" (después de "Dentro de términos")

**Diseño:**
- Badge + chevron con 2 estados:

Estado CON PRUEBAS:
- Badge azul (color primario)
- Texto: "N pruebas" (ej: "3 pruebas")
- Chevron: ▶ o ▼ (según esté colapsado/expandido)
- Texto color: Blanco
- Padding: 6px 12px
- Border-radius: 6px
- Font: 12px Medium
- Chevron posición: Derecha del texto, 4px separación
- Chevron color: Blanco
- **Cursor: Pointer** (es clickeable)

Estado SIN PRUEBAS:
- Badge gris
- Texto: "Sin pruebas"
- Sin chevron
- **Cursor: Default** (no clickeable)

**Ancho sugerido:** ~110px

**Función:** Click en esta celda expande/colapsa grilla secundaria (ver especificación más abajo)

---

### 6. "RESUMEN DE DESCARGOS" (después de "Pruebas asociadas")

**Diseño:**
- Texto truncado a máximo 2 líneas
- Al final del texto: "... Ver más" en color primario/link
- Tipografía: 13px Regular
- Line-height: 1.5
- Color: Gris medio (color secundario de texto del sistema)

**Ancho sugerido:** ~250px

**Función:** Click en "Ver más" abre modal (ver especificación más abajo)

---

## COLUMNAS A ELIMINAR

**Eliminar completamente:**
- Columna "PRUEBAS" (si existe)
- Columna "TIPO DOCUMENTO" (se reemplaza por "Documento")

---

## COLUMNAS A RENOMBRAR

**"TIPO DOCUMENTO" → "DOCUMENTO"**
- Cambiar solo el nombre del header
- Mantener el botón/contenido de descarga igual

---

## ORDEN FINAL DE COLUMNAS (izquierda → derecha)

1. Pliego *(modificar formato)*
2. Año *(mantener)*
3. Radicado *(mantener)*
4. Tiene apoderado *(nueva)*
5. Fecha de presentación *(nueva)*
6. Fecha de radicación *(nueva)*
7. Dentro de términos *(nueva)*
8. Pruebas asociadas *(nueva)*
9. Resumen de descargos *(nueva)*
10. Documento *(renombrar)*

---

# NUEVA FUNCIONALIDAD: GRILLA EXPANDIBLE DE PRUEBAS

## Comportamiento

Cuando el usuario hace **click en una fila** que tiene pruebas asociadas:
- Se despliega una **grilla secundaria** inmediatamente debajo de esa fila
- La grilla muestra todas las pruebas de ese descargo
- El **chevron** en "Pruebas asociadas" cambia de ▶ a ▼
- Click nuevamente → colapsa la grilla, chevron vuelve a ▶

**Animación:** Slide down/up suave (300ms ease-out)

**Permitir:** Múltiples filas expandidas simultáneamente

---

## Diseño de la grilla expandible

### Ubicación y estilo general

**Posición:** Insertada inline, inmediatamente debajo de la fila padre (descargo)

**Diseño visual:**
- **Background:** Gris muy claro (diferente al blanco de la tabla)
  - Sugerencia: #F9FAFB o el gris más claro de tu paleta
- **Borde izquierdo:** Línea vertical de 3px en color primario
  - Conecta visualmente la grilla con su fila padre
  - Altura: Toda la grilla expandida
- **Indentación:** Padding izquierdo de 40px (crea jerarquía visual)
- **Padding vertical:** 16px arriba y abajo
- **Separación:** 0px con siguiente fila (pegada)

### Ejemplo visual de estructura:
┌─ FILA PADRE (Descargo RAD-001) ────────────────┐
│ SPL-2025-03-18 | 2025 | RAD-001 | ... | ▼ 3 p │ ← Fila expandida
├────────────────────────────────────────────────┤
│ │ GRILLA DE PRUEBAS (background gris claro)   │
│ │ ├─ Prueba 1: Solicitada, Documental...      │
│ │ ├─ Prueba 2: Anexada, Documental...         │
│ │ └─ Prueba 3: Anexada, Testimonial...        │
└────────────────────────────────────────────────┘
┌─ SIGUIENTE FILA ───────────────────────────────┐
│ SPL-2025-03-20 | 2025 | RAD-002 | ... | ▶ 1 p │ ← Fila colapsada
└────────────────────────────────────────────────┘

---

## Columnas de la grilla de pruebas (4 columnas)

### Columna 1: "TIPO DE PRUEBA"

**Badge con 2 estados:**

SOLICITADA:
- Badge naranja (#F59E0B background)
- Icon: 📋
- Texto: "Solicitada"
- Color texto: Blanco
- Padding: 4px 10px
- Border-radius: 4px
- Font: 12px Medium

ANEXADA:
- Badge verde (#10B981 background)
- Icon: 📎
- Texto: "Anexada"
- Mismo estilo que Solicitada

**Ancho:** ~110px

---

### Columna 2: "CLASIFICACIÓN"

**Badge con 3 estados (generado por IA):**

TESTIMONIAL:
- Badge morado (#9333EA background, texto blanco)

DOCUMENTAL:
- Badge azul (#3B82F6 background, texto blanco)

REQUERIMIENTO:
- Badge verde (#10B981 background, texto blanco)

**Estilo común:**
- Padding: 4px 10px
- Border-radius: 4px
- Font: 12px Medium

**Ancho:** ~130px

**Agregar tooltip:** "Clasificación automática"

---

### Columna 3: "DESCRIPCIÓN"

**Diseño:**
- Texto completo descriptivo
- Ejemplo: "Certificación de la DIAN sobre estado tributario período 2024"
- Tipografía: 14px Regular
- Line-height: 1.4
- Color: Gris oscuro (color primario de texto)
- **Permite wrap** (múltiples líneas si es necesario)

**Ancho:** Flexible, ~400px o el espacio restante

---

### Columna 4: "DOCUMENTO"

**Diseño condicional:**

Si Tipo = "Anexada":
- Botón pequeño activo
- Texto: "⬇ Descargar"
- Estilo: Secundario/ghost small
- Padding: 6px 12px
- Font: 13px Medium

Si Tipo = "Solicitada":
- Texto: "N/A"
- Color: Gris claro (#9CA3AF)
- Font: 13px Regular
- No clickeable

**Ancho:** ~110px

---

## Estados especiales de la grilla

### Cuando NO hay pruebas (0 pruebas)

En lugar de filas, mostrar mensaje centrado:
- Texto: "Este descargo no tiene pruebas asociadas"
- Centrado horizontal y vertical
- Padding vertical: 32px
- Tipografía: 14px Regular Italic
- Color: Gris medio
- Background: Mismo gris claro de la grilla

### Estado loading

- Skeleton de 2-3 filas
- Bloques grises con animación shimmer
- Altura por fila: ~40px

---

# NUEVO MODAL: RESUMEN COMPLETO

## Trigger
Click en "Ver más" en la columna "Resumen de descargos"

## Especificaciones del modal

**Dimensiones:**
- Ancho: 600px
- Altura: Auto (máximo 80vh con scroll interno)

**Posición:** Centrado en viewport

**Overlay:**
- Background: rgba(0, 0, 0, 0.6)
- Click en overlay → cierra modal

**Container:**
- Background: Blanco
- Border-radius: 12px
- Box-shadow: Grande (usar sombra del sistema)
- Padding: 32px

---

## Estructura del contenido
┌────────────────────────────────────────────┐
│  Descargo RAD-001                    [X]   │ ← Header
├────────────────────────────────────────────┤
│                                             │
│  Información general                       │
│  ───────────────                           │
│  Pliego: SPL-2025-03-18                   │
│  Radicado: RAD-001                         │
│  Fecha radicación: 18/Mar/2025            │
│  Apoderado: Juan Pérez                     │
│                                             │
│  ──────────────────────────────────────── │
│                                             │
│  Resumen generado por IA                   │
│  ────────────────────────                  │
│  [Texto completo sin truncar]              │
│  [Puede tener múltiples párrafos]          │
│                                             │
│  ──────────────────────────────────────── │
│                                             │
│  Documento original                        │
│  ──────────────────                        │
│  📄 Descargo_RAD-001.pdf                  │
│  [⬇ Descargar documento completo]         │
│                                             │
└────────────────────────────────────────────┘

---

## Especificaciones de diseño

### Header del modal
- Título: "Descargo [Radicado]"
- Font: 20px Semi-bold
- Botón cerrar [X]: Esquina superior derecha
- Border-bottom: 1px sólido gris claro
- Padding-bottom: 16px
- Margin-bottom: 24px

### Secciones
**Separadores:** Línea 1px gris claro O espacio de 32px entre secciones

**Section headings:**
- Font: 16px Semi-bold
- Margin-bottom: 12px

### Información general
**Formato:** "Label: Valor"
- Label: 14px Semi-bold
- Valor: 14px Regular, gris medio
- Line-height: 1.8
- Separación entre items: 8px

### Resumen generado por IA
- Font: 14px Regular
- Line-height: 1.6
- Color: Gris oscuro
- Párrafos separados por 16px

### Documento original
- Icon PDF (📄) + nombre archivo
- Font nombre: 14px Semi-bold
- Botón "Descargar documento completo"
  - Estilo: Botón primario
  - Padding: 10px 20px
  - Margin-top: 12px

---

# AJUSTES EN FILTROS

## Filtros nuevos a agregar

Agregar los siguientes 5 filtros al panel existente (mantén el estilo actual de filtros):

### 1. Tiene apoderado
- Tipo: Dropdown
- Opciones: Sí / No / Todos
- Default: Todos
- Ancho: ~140px

### 2. Dentro de términos
- Tipo: Dropdown
- Opciones: A tiempo / Extemporáneo / Todos
- Default: Todos
- Ancho: ~160px

### 3. Rango de fechas (presentación)
- Tipo: Date range picker
- Label: "Fecha presentación"
- Ancho: ~240px

### 4. Rango de fechas (radicación)
- Tipo: Date range picker
- Label: "Fecha radicación"
- Ancho: ~240px

### 5. Tiene pruebas
- Tipo: Dropdown
- Opciones: Con pruebas / Sin pruebas / Todos
- Default: Todos
- Ancho: ~160px

**Mantén:** 
- El estilo visual actual de los filtros existentes
- La ubicación del panel de filtros

---

# INDICADORES DE INTERACCIÓN

## En la fila principal (descargo)

**Cuando tiene pruebas asociadas:**
- **Hover:** Background sutil que indique clickeabilidad
- **Cursor:** Pointer
- **Chevron visible** en columna "Pruebas asociadas"

**Cuando NO tiene pruebas:**
- **Hover:** Sin cambio (o cambio mínimo)
- **Cursor:** Default
- **Sin chevron**

## Animación del chevron
- Rotación suave de ▶ a ▼ (200ms)
- Al expandir/colapsar

---

# CONSIDERACIONES DE DISEÑO

## Jerarquía visual (importancia)

**Prioridad 1 - MUY ALTA:**
- "Dentro de términos" → Debe ser el elemento más visible (colores fuertes, badge grande)

**Prioridad 2 - ALTA:**
- "Pliego" → Identificador principal (bold o contraste alto)
- "Pruebas asociadas" → Punto de interacción (indicar claramente que es clickeable)

**Prioridad 3 - MEDIA:**
- Fechas, apoderado, resumen

## Manejo de ancho

La tabla ahora tiene 10 columnas. Si se vuelve muy ancha:

**Solución recomendada:**
- Scroll horizontal en la tabla
- **Sticky columns:** "Pliego" y "Dentro de términos" permanecen fijos al hacer scroll horizontal

**Alternativas:**
- Vista compacta/expandida con toggle
- Columnas colapsables

## Consistencia

- Usa los **mismos componentes** de badges, botones, inputs que ya existen
- Mantén la **misma paleta de colores**
- Mantén los **mismos espaciados y tipografía**
- Las columnas nuevas deben **sentirse parte del diseño existente**

---

# ENTREGABLE ESPERADO

1. **Tabla principal actualizada** mostrando:
   - Las 10 columnas en el orden especificado
   - Al menos 3-5 filas de ejemplo con datos variados
   - 1 fila en estado expandido mostrando grilla de pruebas
   - 1 fila en estado colapsado

2. **Grilla expandible** mostrando:
   - Mínimo 3 pruebas de ejemplo
   - Mix de pruebas solicitadas y anexadas
   - Borde de conexión jerárquica visible
   - Indentación clara

3. **Modal de resumen** completamente diseñado con:
   - Header
   - Las 3 secciones especificadas
   - Contenido de ejemplo
   - Botón cerrar

4. **Panel de filtros actualizado** con los 5 nuevos filtros integrados

5. **Indicadores visuales:**
   - Chevron en estado colapsado/expandido
   - Hover states
   - Diferenciación clara entre filas expandibles y no expandibles

---

# NOTAS IMPORTANTES

- **NO rediseñes** elementos que funcionan bien
- **Solo aplica los cambios** especificados arriba
- **Mantén coherencia** con el diseño actual
- Si algo no está especificado → **usa tu criterio** basándote en el estilo existente
- Los badges deben usar los **colores del sistema** existente (success, error, warning, primary)