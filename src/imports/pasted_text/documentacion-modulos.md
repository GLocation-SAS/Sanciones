FLUJO GENERAL (igual para todos los módulos)

Este es el flujo que explicó Juan.

Seleccionar módulo
      ↓
Cargar Excel
      ↓
Consulta a Integratic
      ↓
Descarga de documentos
      ↓
Análisis con IA
      ↓
Resultados en grilla
      ↓
Ver / descargar documentos
COMPONENTES (siempre del sistema de diseño)

Todas las interfaces deben usar:

botones

inputs

tablas

modales

loaders

alertas

badges

iconos

drag & drop

validaciones

estados hover / disabled / loading

No crear componentes nuevos.

MÓDULO 1
Menú

Verificación de Notificación del Pliego

Título de la interfaz

Verificación de Notificación del Pliego

Descripción

Este módulo permite verificar si el pliego de cargos fue notificado correctamente mediante el análisis automatizado de documentos asociados al proceso.

Entrada

Excel con:

número de pliego

año

Flujo del módulo
Cargar Excel
↓
Consultar Integratic
↓
Descargar documentos
↓
Analizar notificación con IA
↓
Mostrar resultados
Interfaces
1 Carga de Excel

Componentes:

drag & drop

botón cargar archivo

validación XLS

2 Procesamiento

Mostrar:

consultando Integratic

descargando documentos

analizando notificación

Componentes:

loader

barra progreso

3 Resultados

Tabla con:

pliego

año

tipo de notificación

causal

documento

Acciones:

ver documento

descargar documento

exportar Excel

MÓDULO 2
Menú

Verificación de Descargos y Pruebas

Título de la interfaz

Verificación de Descargos y Pruebas

Descripción

Permite identificar si el operador presentó descargos o pruebas en respuesta al pliego mediante el análisis automático de los documentos recuperados.

Entrada

Excel con:

pliego

año

Flujo
Cargar Excel
↓
Buscar radicados
↓
Descargar documentos
↓
Análisis IA de descargos
↓
Resultados
Interfaces

Carga Excel
Procesamiento
Resultados
Visor PDF

Resultados

Tabla:

pliego

año

descargos encontrados

tipo documento

documento

Acciones:

ver PDF

descargar

MÓDULO 3
Menú

Verificación de Actos de Prueba

Título

Verificación de Actos de Prueba

Descripción

Permite analizar los actos administrativos para identificar las pruebas incorporadas en la investigación y extraer información relevante del proceso.

Entrada

Excel con:

número de acto

año

Flujo
Cargar Excel
↓
Consultar Integratic
↓
Descargar actos de prueba
↓
Analizar documentos
↓
Resultados
Resultados

Tabla:

acto

año

resumen de cargos

existencia de descargos

fecha presentación

pruebas

Acciones:

ver documento

descargar

MÓDULO 4
Menú

Verificación de Alegatos de Conclusión

Título

Verificación de Alegatos de Conclusión

Descripción

Permite identificar si el operador presentó alegatos de conclusión dentro del proceso sancionatorio mediante el análisis automatizado de los documentos recuperados.

Entrada

Excel con:

acto de prueba

año

Flujo
Cargar Excel
↓
Buscar radicados
↓
Descargar documentos
↓
Análisis IA alegatos
↓
Resultados
Resultados

Tabla:

acto

año

alegatos encontrados

documento

Acciones:

ver documento

descargar

MÓDULO 5
Menú

Verificación de Cumplimiento de la Obligación

Título

Verificación de Cumplimiento de la Obligación

Descripción

Permite verificar si el operador ha cumplido con la obligación de pago mediante consultas a Integratic y al sistema SER.

Entrada

Excel con:

acto

año

Flujo
Cargar Excel
↓
Consultar Integratic
↓
Consultar SER
↓
Analizar cumplimiento
↓
Resultados
Resultados

Tabla:

acto

estado cumplimiento

documentos

imágenes SER

Acciones:

ver documento

descargar

Interfaces reutilizadas en todos los módulos

Solo necesitas diseñar:

1️⃣ Carga Excel
2️⃣ Procesamiento / análisis
3️⃣ Resultados (tabla)
4️⃣ Visor de documentos

Estas pantallas se reutilizan en los 5 módulos.