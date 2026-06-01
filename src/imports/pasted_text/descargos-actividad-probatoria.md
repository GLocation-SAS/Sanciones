Necesito ajustar el prototipo actual del módulo “Descargos y Actividad Probatoria” tomando como base la interfaz existente, pero reorganizando su estructura funcional y visual según las observaciones recibidas.

El módulo actualmente incorpora información relacionada con la radicación de descargos, validación de términos, resumen argumentativo y relación de pruebas. Sin embargo, debe reorganizarse porque la estructura actual mezcla conceptos procesales, operativos y documentales, lo que puede afectar la trazabilidad del derecho de defensa dentro del procedimiento administrativo sancionatorio.

Mantén el estilo visual actual del sistema: diseño tipo dashboard administrativo, colores institucionales, encabezados azules, filtros superiores, tabla limpia, badges de estado, botones de acción y componentes coherentes con el módulo de Verificación y Notificación del Pliego.

Objetivo del rediseño

El nuevo diseño debe permitir consultar, validar y hacer seguimiento a la etapa de descargos y actividad probatoria, garantizando trazabilidad sobre:

quién presentó los descargos;
en qué calidad actuó;
si presentó dentro o fuera del término legal;
cuál era la fecha límite calculada automáticamente;
qué argumentos fueron planteados;
qué pruebas fueron aportadas o solicitadas;
qué documentos soportan la actuación.
Cambios principales que debe aplicar
1. Mantener una estructura homogénea con el módulo de notificación

La pestaña debe conservar la misma lógica estructural del módulo Verificación y Notificación del Pliego, iniciando con la identificación del operador, expediente y actuación administrativa, y luego mostrando la información asociada a los descargos y pruebas.

Agregar al inicio de la tabla las siguientes columnas identificadoras:

Operador
NIT
Expediente
Código del servicio
Servicio
Régimen habilitante
BDI
Año / vigencia BDI

La BDI debe visualizarse completa, por ejemplo: 9054-2025, pero también debe permitir filtros independientes por número de BDI y por vigencia/año.

2. Reorganizar la tabla principal

La tabla del módulo debe organizarse con una lógica procesal clara. Reemplazar o reorganizar las columnas actuales con la siguiente estructura sugerida:

Operador
NIT
Expediente
Código del servicio
Servicio
Régimen habilitante
BDI
Año / vigencia BDI
Número del acto administrativo / pliego
Fecha efectiva de notificación
Fecha límite de presentación de descargos
¿Presentó descargos?
Estado del término
Fecha de presentación de descargos
Fecha de radicación
Radicado de descargos
Calidad de quien presenta
Apoderado
Representante legal
Resumen argumentativo
Categorías de defensa
Pruebas anexadas
Pruebas solicitadas
Tipo de prueba
Origen de la prueba
Estado de la prueba
Documentos asociados
Acciones
3. Calcular automáticamente la fecha límite de descargos

La columna “Fecha límite de presentación de descargos” no debe diligenciarse manualmente.

Debe calcularse automáticamente con base en:

la fecha efectiva de notificación;
las reglas de negocio definidas en el módulo de notificaciones;
el término legal aplicable al procedimiento administrativo.

Aunque esta lógica no necesariamente se muestre completa en el front, el sistema debe consultar internamente la información del módulo de notificaciones para garantizar consistencia procesal en el cálculo de términos.

Visualmente, esta columna puede tener un tooltip como:

Fecha calculada automáticamente a partir de la fecha efectiva de notificación y las reglas de negocio aplicables al término de descargos.

4. Validar si presentó descargos y si lo hizo dentro del término

Agregar columnas o badges visuales para responder claramente:

¿Presentó descargos?
¿Los presentó dentro del término legal?
¿Los presentó fuera del término?
¿No presentó descargos?

El campo Estado del término debe mostrarse con etiquetas visuales tipo badge:

Dentro del término
Fuera del término
No presentó
Pendiente de validación
Requiere revisión

Usar colores sobrios y consistentes con el diseño del sistema.

5. Diferenciar la calidad de quien presenta los descargos

El diseño debe diferenciar claramente quién realiza la actuación y en qué calidad actúa.

Agregar las siguientes columnas:

Calidad de quien presenta
Apoderado
Representante legal

La columna Apoderado debe indicar expresamente si existe o no representación judicial. Además, debe existir una columna independiente para el representante legal del operador cuando aplique.

Ejemplo de visualización:

Apoderado: Sí / No
Representante legal: Nombre del representante
Calidad de quien presenta: Operador / Apoderado / Representante legal / Otro autorizado
6. Mostrar radicado y fechas de forma cronológica

El radicado de presentación de descargos debe visualizarse junto con:

Fecha de presentación de descargos
Fecha de radicación
Radicado de descargos

Esto permite mantener una relación cronológica más clara dentro de la actuación procesal.

7. Fortalecer el resumen argumentativo

El campo Resumen argumentativo no debe ser solo un texto plano. Debe permitir identificar, clasificar y estructurar los argumentos presentados por el operador.

El objetivo es que ningún argumento pierda trazabilidad ni quede excluido del análisis posterior.

Agregar una vista de detalle o modal para el resumen, con categorías como:

Argumentos principales de defensa
Excepciones propuestas
Solicitudes formuladas
Aceptación total o parcial de hechos
Fuerza mayor o caso fortuito
Afectaciones económicas
Errores operativos o de reporte
Solicitudes probatorias
Argumentos técnicos relevantes
Argumentos jurídicos relevantes
Otras categorías parametrizables

En la tabla principal puede mostrarse una columna resumida con botón:

Ver resumen
Ver argumentos
Analizar descargos
8. Reorganizar la actividad probatoria

La actividad probatoria debe dejar de verse como una simple relación documental. Debe estructurarse como parte del ejercicio del derecho de defensa.

Agregar columnas o una sección expandible para diferenciar:

Pruebas anexadas
Pruebas solicitadas
Tipo de prueba
Origen de la prueba
Estado de la prueba

Los estados posteriores de las pruebas pueden ser:

Aportada
Solicitada
Decretada
Rechazada
Desistida
Valorada
Pendiente de revisión

Esto permite diferenciar adecuadamente las pruebas aportadas por el operador, las solicitadas y el trámite posterior que se les dé dentro del procedimiento.

9. Agregar vista de detalle o trazabilidad

Cada fila debe tener una acción tipo:

Ver detalle
Ver trazabilidad
Ver descargos
Ver pruebas
Ver documentos

Al abrir el detalle, mostrar una vista organizada por secciones:

1. Identificación del proceso

Operador
NIT
Expediente
Servicio
Régimen habilitante
BDI
Pliego asociado

2. Términos procesales

Fecha efectiva de notificación
Fecha límite de descargos
Fecha de presentación
Estado del término

3. Radicación de descargos

Radicado
Fecha de radicación
Calidad de quien presenta
Apoderado
Representante legal

4. Resumen argumentativo

Argumentos principales
Excepciones
Solicitudes
Argumentos técnicos
Argumentos jurídicos

5. Actividad probatoria

Pruebas anexadas
Pruebas solicitadas
Tipo de prueba
Origen
Estado

6. Documentos asociados

Documento de descargos
Anexos
Pruebas
Constancias
Soportes adicionales
10. Actualizar filtros superiores

Los filtros del módulo deben permitir búsquedas funcionales y procesales.

Incluir filtros como:

Buscar por operador, NIT, expediente, BDI o radicado
Servicio
Régimen habilitante
Número de BDI
Año / vigencia BDI
Fecha efectiva de notificación
Fecha límite de descargos
Fecha de presentación
Estado del término
¿Presentó descargos?
Apoderado
Tipo de prueba
Estado de la prueba
11. Agregar tooltips explicativos en columnas

Todas las columnas deben incluir un ícono de información o tooltip con explicación breve.

Ejemplos:

Fecha límite de presentación de descargos: fecha calculada automáticamente según la fecha efectiva de notificación y las reglas de negocio aplicables.
Estado del término: indica si los descargos fueron presentados dentro o fuera del término legal.
Calidad de quien presenta: identifica si actúa el operador, representante legal, apoderado u otro autorizado.
Resumen argumentativo: clasificación estructurada de los argumentos de defensa.
Pruebas anexadas: documentos o elementos probatorios aportados con los descargos.
Pruebas solicitadas: pruebas que el operador pide que sean decretadas o practicadas.
Estado de la prueba: estado procesal posterior de la prueba dentro del trámite.
Acciones por fila

Cada registro debe permitir acciones como:

Ver detalle
Ver trazabilidad
Ver resumen de descargos
Ver pruebas
Ver documentos asociados
Descargar soportes
Validar término
Marcar para revisión
Registrar observación
Botones generales del módulo

Mantener o agregar botones superiores como:

Nuevo análisis
Exportar Excel
Actualizar validación de términos
Generar reporte
Cargar descargos, si aplica
Resultado esperado

El resultado debe ser una interfaz más clara, ordenada y trazable, alineada con el debido proceso y la defensa jurídica de la Entidad.

El módulo debe diferenciar correctamente:

identificación del operador y expediente;
actuación administrativa asociada;
fecha efectiva de notificación;
cálculo automático del término para descargos;
presentación o no presentación de descargos;
calidad de quien actúa;
argumentos de defensa;
pruebas aportadas o solicitadas;
documentos soporte;
trazabilidad procesal completa.

El rediseño debe permitir que la información sea útil tanto para consulta operativa como para validación jurídica, auditoría, defensa de la Entidad y futura explotación analítica de los datos.