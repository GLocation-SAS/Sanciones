PROMPT FIGMA MAKE - MÓDULO 5: Cumplimiento de Obligación
Ajusta el diseño existente del módulo "Verificación de Cumplimiento de Obligación". Este es el módulo FINAL que consolida todo. Mantén estilo actual, aplica estos cambios:

## AJUSTES A LA TABLA

### AGREGAR AL INICIO:
**"ESTADO RUES"** (primera columna)

Badge 4 estados:
- Activa: Verde #10B981, icon ✓
- Liquidada/Cancelada/En liquidación: Rojo #EF4444, icon ⚠
- Padding: 6px 12px, font 12px Semi-bold
- Ancho: ~130px

**CRÍTICO - Archivo automático:**
Cuando Estado ≠ "Activa":
- Background de TODA LA FILA: #FEF3C7 (amarillo)
- Tooltip: "Archivo automático por estado RUES"

### AGREGAR COLUMNAS NUEVAS:

**"RECOMENDACIÓN"** (después de "Hallazgos del SER")
- Valores: ARCHIVO / SANCIÓN
- **MÁS DESTACADO de la tabla**
- Badges GRANDES:
  - ARCHIVO: Verde #10B981, "✓ ARCHIVO"
  - SANCIÓN: Rojo #EF4444, "⚠ SANCIÓN"
- Font: 16px Bold, uppercase
- Padding: 8px 16px
- Ancho: ~140px
- **Máxima jerarquía visual**

**"TIPO DE SANCIÓN"** (después de "Recomendación")
- Solo visible si Recomendación = SANCIÓN
- Valores: Multa / Suspensión / Cancelación / Otra
- Badge con color
- Si ARCHIVO: celda vacía o "N/A"
- Ancho: ~130px

**"CONDUCTA"** (después de "Tipo de sanción")
- Texto descriptivo de conducta sancionable
- Ejemplos: "No pago aportes Trim 1 y 3"
- Truncado con tooltip si es largo
- Si ARCHIVO: vacío o "N/A"
- Ancho: ~250px

### MODIFICAR COMPORTAMIENTO:

**"HALLAZGOS DEL SER"** (ya existe)
- Click → abre modal de validación final completa
- Cursor pointer, hover sutil

### ORDEN FINAL (10 columnas):
1. Estado RUES *(nueva)*
2. Pliego
3. Operador
4. Cumplimiento (Cumplió/No cumplió)
5. Hallazgos del SER *(clickeable)*
6. Recomendación *(nueva - MUY DESTACADA)*
7. Tipo de sanción *(nueva)*
8. Conducta *(nueva)*
9. Estado (Activo/Archivado/Cancelado)
10. Documento (Descargar recomendación)

---

## MODAL: VALIDACIÓN FINAL COMPLETA

**Trigger:** Click en "Hallazgos del SER"

**Dimensiones:** 1000px ancho (más grande), max 90vh altura

**Estructura:**
Validación Final - SPL-2025-03-18        [X]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INFORMACIÓN GENERAL
════════════════════
Operador: [Nombre]
Pliego: SPL-2025-03-18
Estado RUES: 🟢 Activa
RESUMEN DE ETAPAS
═════════════════
┌──────────────┬───────────┬────────┬────────┐
│ Etapa        │ Estado    │ Fecha  │ Ver    │
├──────────────┼───────────┼────────┼────────┤
│ Notificación │✓Notificado│18/Mar  │Detalle │
│ Descargos    │✓A tiempo  │25/Mar  │Detalle │
│ Actos prueba │✓Comunicado│01/Abr  │Detalle │
│ Alegatos     │✓Presentado│05/Abr  │Detalle │
└──────────────┴───────────┴────────┴────────┘
VALIDACIÓN POR CARGO Y PERIODO
═══════════════════════════════
📋 CARGO 1: No pagar aportes seguridad social
┌────────┬──────────┬──────────┬────────┬──────────┐
│Periodo │Hallazgo  │Descargos │Pruebas │Resultado │
├────────┼──────────┼──────────┼────────┼──────────┤
│Trim 1  │No pagó   │Presentó  │3       │🔴 Sanción│
│Trim 2  │Pagó      │Presentó  │2       │🟢 Archivo│
│Trim 3  │Pagó sanc │Presentó  │1       │🔴 Sanción│
│Trim 4  │Subsanó   │Presentó  │0       │🟢 Archivo│
└────────┴──────────┴──────────┴────────┴──────────┘
Imágenes SER: [Ver todas]
Recomendación Cargo 1: 🔴 SANCIÓN
Razón: 2 de 4 periodos requieren sanción
Conducta: No pago aportes Trim 1 y 3
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 CARGO 2: [Repetir estructura]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RECOMENDACIÓN FINAL
════════════════════
┌───────────────────────────────────────────┐
│                                            │
│   🔴 CONTINUAR A DECISIÓN DE SANCIÓN      │
│                                            │
│   Tipo sanción: Multa                     │
│   Conducta: No pago aportes Trim 1 y 3    │
│                                            │
│   Fundamento: Al menos un cargo con       │
│   sanción (Cargo 1: 2 periodos)           │
│                                            │
│   Siguiente etapa: Cálculo valor sanción  │
│                                            │
└───────────────────────────────────────────┘
                [Cerrar]

**Especificaciones clave:**

**Sección "Resumen de etapas":**
- Tabla compacta con estados previos
- Botón "[Detalle]" puede expandir info

**Tabla de periodos (ampliada vs Módulo 3):**
- Columna "Descargos": Presentó/No presentó
- Columna "Pruebas": Contador numérico
- Resto igual que Módulo 3

**Recomendación final:**
- **Elemento MÁS DESTACADO del modal**
- Background: #FEE2E2 (rojo claro) si sanción, #D1FAE5 (verde claro) si archivo
- Border: 3px sólido correspondiente
- Padding: 32px
- Font título: 20px Bold, centrado
- Icon grande 🔴/🟢 (32px)
- Info detallada:
  - Tipo de sanción
  - Conducta específica
  - Fundamento
  - Siguiente paso

**Separación entre cargos:** 48px o línea 2px

**Archivo automático RUES:**
En modal, mensaje al inicio:
- "⚠ Este caso se archiva automáticamente por estado RUES"
- Background: #FEF3C7
- Padding: 16px
- Border-left: 4px #F59E0B

---

## SUB-MODAL: GALERÍA IMÁGENES SER

Reutilizar del Módulo 3:
- Mismo diseño y comportamiento
- 800px ancho
- Navegación entre imágenes
- Descarga actual/todas

---

## FILTROS NUEVOS

Agregar:
1. **Estado RUES:** Multi-select (Activa, Liquidada, Cancelada, En liquidación)
2. **Recomendación:** Multi-select (Archivo, Sanción, Todos)
3. **Tipo de sanción:** Multi-select (solo si sanción)
4. **Cumplimiento:** Toggle (Cumplió/No cumplió/Todos)

---

## JERARQUÍA VISUAL CRÍTICA

**Prioridad 1 - CRÍTICA:**
- **Recomendación:** Elemento MÁS GRANDE de la tabla
- Badge destacado, colores fuertes, font bold uppercase

**Prioridad 2 - ALTA:**
- **Estado RUES:** Si no activo, background amarillo fila completa
- **Cumplimiento:** Complementa recomendación

**Prioridad 3 - MEDIA:**
- Tipo sanción, Conducta (solo si aplica)

---

## LÓGICA DE RECOMENDACIÓN
SI RUES ≠ "Activa" → ARCHIVO AUTOMÁTICO
SINO SI ≥1 cargo tiene ≥1 periodo con sanción → SANCIÓN
SINO → ARCHIVO

---

## NOTAS CLAVE

- **Módulo más importante visualmente**
- Recomendación debe ser IMPOSIBLE de ignorar
- Modal más complejo: consolidación de todo
- Reutiliza validación por cargo del Módulo 3
- **NO se calcula valor de sanción** (siguiente etapa)
- Solo determina: ¿Sanción SÍ o NO? + Tipo

Mantén consistencia visual con módulos anteriores.