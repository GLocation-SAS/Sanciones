# AJUSTES AL MÓDULO: Verificación de Descargos y Pruebas

Tengo diseñada la interfaz de este módulo. Necesito aplicar los ajustes solicitados en reunión de validación con usuarios.

## CONTEXTO DEL MÓDULO

Los usuarios validan descargos (defensas escritas) presentados por operadores. Cada descargo puede contener pruebas solicitadas (sin archivo) o pruebas anexadas (con archivo descargable).

---

## AJUSTES REQUERIDOS

### EN LA TABLA PRINCIPAL

**1. COLUMNA "PLIEGO" - Modificar formato**
- **Actual:** SPL-2025-001
- **Debe ser:** SPL-2025-03-18 (agregar mes-día)
- Mantener tipografía y estilo actual

**2. COLUMNA "AÑO" - Mantener**
- Sin cambios

**3. COLUMNA "RADICADO" - Mantener**
- Sin cambios

**4. COLUMNA NUEVA: "TIENE APODERADO"**
- **Agregar después de "Radicado"**
- Valores: Sí / No
- Si Sí: mostrar nombre del apoderado
- Diseño sugerido:
  - Sí: Badge verde "👤 [Nombre]"
  - No: Badge gris "Sin apoderado"
- Ancho: ~180px
- Debe ser filtrable

**5. COLUMNA "DESCARGOS" - Mantener pero cambiar comportamiento**
- **Actual:** Muestra si hay descargos
- **Nuevo comportamiento:** Esta columna se vuelve expandible
- Al hacer **click en la fila** → despliega grilla secundaria con pruebas
- Agregar indicador visual (chevron ▼) que muestre si está expandida o colapsada

**6. COLUMNA NUEVA: "FECHA DE PRESENTACIÓN"**
- **Agregar después de "Tiene apoderado"**
- Fecha en que el operador presentó el descargo
- Formato: DD/MMM/YYYY
- Ancho: ~120px
- Sorteable
- Filtrable con date range picker

**7. COLUMNA NUEVA: "FECHA DE RADICACIÓN"**
- **Agregar después de "Fecha de presentación"**
- Fecha oficial de radicación en Integra
- Formato: DD/MMM/YYYY
- **Importante:** Esta fecha puede ser 1-2 días ANTES de presentación
- Si fecha radicación < fecha presentación: mostrar badge pequeño "Diferencia -N días"
- Ancho: ~140px
- Sorteable
- Filtrable con date range picker
- Tooltip: "Fecha oficial para validar términos"

**8. COLUMNA NUEVA: "DENTRO DE TÉRMINOS"**
- **Agregar después de "Fecha de radicación"**
- Validación: ¿Se presentó dentro del plazo legal?
- Valores: Sí / No
- Diseño:
  - Sí: Badge verde ✓ "A tiempo"
  - No: Badge rojo ⚠ "Extemporáneo"
- Ancho: ~120px
- Filtrable
- **Alta jerarquía visual** - debe destacar

**9. COLUMNA NUEVA: "PRUEBAS ASOCIADAS"**
- **Agregar después de "Dentro de términos"**
- Contador de pruebas: "N pruebas" o "Sin pruebas"
- Badge azul si hay pruebas, gris si no hay
- Click en esta celda → activa el expand de la grilla secundaria
- Ancho: ~110px

**10. COLUMNA NUEVA: "RESUMEN DE DESCARGOS"**
- **Agregar después de "Pruebas asociadas"**
- Texto resumen breve generado por IA
- Formato: Truncar a 2 líneas con "... Ver más"
- Click en "Ver más" → abre modal con resumen completo
- Ancho: ~250px

**11. COLUMNA "TIPO DOCUMENTO" - Renombrar y ajustar**
- **Renombrar a:** "DOCUMENTO"
- Botón para descargar PDF del descargo completo
- Texto: "📄 Descargar descargo"
- Ancho: ~150px

**ELIMINAR:**
- Columna "Pruebas" (se reemplaza por "Pruebas asociadas" + grilla expandible)

---

### NUEVA FUNCIONALIDAD: GRILLA SECUNDARIA EXPANDIBLE

**Ubicación:** Se despliega inline debajo de cada fila de descargo

**Trigger:** Click en cualquier parte de la fila (excepto botones de acción)

**Diseño visual:**
- Background: Gris claro (#F9FAFB o similar del sistema)
- Indentación: 40px desde borde izquierdo
- Borde izquierdo: Línea vertical 3px en color primario (conexión visual)
- Animación: Slide down suave (300ms ease-out)

**Columnas de la grilla de pruebas:**

1. **Tipo de prueba**
   - Valores: "Solicitada" / "Anexada"
   - Solicitada: Badge naranja "📋 Solicitada"
   - Anexada: Badge verde "📎 Anexada"
   - Ancho: ~110px

2. **Clasificación** (NUEVA - generada por IA)
   - Valores: Testimonial / Documental / Requerimiento
   - Badges con colores diferenciados:
     - Testimonial: Morado
     - Documental: Azul
     - Requerimiento: Verde
   - Ancho: ~130px
   - Tooltip: "Clasificación automática"

3. **Descripción**
   - Texto descriptivo de la prueba
   - Ejemplos:
     - "Certificación de la DIAN"
     - "Factura No. 12345"
   - Ancho flexible: ~400px
   - Text wrap permitido

4. **Documento**
   - Solo visible si Tipo = "Anexada"
   - Si es "Solicitada": celda vacía o "N/A"
   - Botón: "⬇ Descargar"
   - Ancho: ~110px

**Estados de la grilla expandible:**
- **Sin pruebas:** Mostrar mensaje "Este descargo no tiene pruebas asociadas"
- **Loading:** Skeleton de 2-3 filas
- **Colapsada:** Chevron apunta a la derecha (▶)
- **Expandida:** Chevron apunta hacia abajo (▼)

**Indicador visual en tabla principal:**
- Icono de chevron en columna "Pruebas asociadas" o al inicio de la fila
- Cambio de cursor a pointer en hover de fila

---

### NUEVO MODAL: RESUMEN COMPLETO DE DESCARGOS

**Trigger:** Click en "Ver más" en columna "Resumen de descargos"

**Contenido:**