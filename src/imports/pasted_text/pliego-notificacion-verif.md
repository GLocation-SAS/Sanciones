Claro, este sería un **prompt listo para pegar en la IA / diseñador / frontend** para que aplique los cambios solicitados al prototipo del módulo **“Verificación de Notificación del Pliego”**.

---

### Prompt para aplicar cambios al prototipo

Necesito ajustar el prototipo actual del módulo **“Verificación de Notificación del Pliego”** tomando como base la interfaz existente, pero reorganizando la información según las observaciones funcionales y jurídicas solicitadas.

Actualmente la tabla mezcla información del pliego, del tipo de notificación, del medio de entrega y de los eventos operativos de notificación. Se requiere que el diseño permita una lectura más clara, trazable y ordenada del proceso sancionatorio, diferenciando correctamente la actuación administrativa principal, el mecanismo jurídico de notificación, el canal de entrega y el resultado procesal.

Mantén el estilo visual actual del sistema: colores institucionales, tabla limpia, encabezados azules, filtros superiores, botones de acción y diseño tipo dashboard administrativo. No cambiar la identidad visual, solo mejorar la estructura funcional y la organización del módulo.

### Cambios principales que debe aplicar

1. **Actualizar el título y descripción del módulo**

Mantener el título:

**Verificación de Notificación del Pliego**

Mejorar la descripción para que diga algo similar a:

> Consulta, validación y trazabilidad de la notificación de pliegos de cargos dentro del proceso sancionatorio, permitiendo identificar el operador, expediente, actuación administrativa, mecanismo de notificación, medio de entrega, fechas relevantes, estado y documentos asociados.

2. **Reorganizar la tabla principal**

La tabla debe dejar de mostrar las columnas actuales en el orden que tiene y reemplazarlas por una estructura más clara, con las siguientes columnas:

* Operador
* NIT
* Expediente
* Código del servicio
* Servicio
* Régimen habilitante
* BDI
* Número del acto administrativo / pliego
* Fecha del acto administrativo
* Tipo de notificación
* Medio de entrega de notificación
* Dirección física / correo electrónico de notificación
* Fecha de entrega
* Fecha efectiva de notificación
* Estado de la notificación
* Motivo de devolución / observación
* Documentos asociados
* Acciones

Estas columnas deben responder a la trazabilidad completa solicitada: identificación del operador y expediente, datos del servicio, acto administrativo, mecanismo de notificación, canal de entrega, fechas, resultado y soportes documentales.

3. **Agregar explicación o ayuda en cada columna**

Cada columna debe tener un ícono pequeño de información o tooltip que explique qué significa ese dato. Esto es importante porque se solicitó que todas las columnas incluyan explicación de su contenido.

Ejemplos:

* **Tipo de notificación:** mecanismo jurídico utilizado para surtir la notificación.
* **Medio de entrega:** canal usado para materializar la entrega, como físico o electrónico.
* **Fecha de entrega:** fecha en la que se envió o puso a disposición la actuación.
* **Fecha efectiva de notificación:** fecha en la que jurídicamente se entiende surtida la notificación.
* **Motivo de devolución / observación:** novedad, inconsistencia o motivo de devolución cuando aplique.

4. **Diferenciar visualmente la fila principal y los eventos asociados**

El diseño debe permitir que una fila principal corresponda al **pliego de cargos** y que puedan existir varios eventos asociados a esa misma actuación, por ejemplo:

* Citación
* Envío electrónico
* Entrega física
* Devolución
* Relanzamiento
* Aviso
* Notificación efectiva

Para esto, incluir una acción tipo **“Ver trazabilidad”**, **“Ver eventos”** o un ícono desplegable en cada fila. Al desplegar, debe mostrarse una subtabla o timeline con los eventos históricos asociados al pliego.

5. **Agregar vista de trazabilidad o timeline**

Cuando el usuario consulte los eventos de un pliego, mostrar una sección expandida con una línea de tiempo o subtabla que incluya:

* Fecha del evento
* Tipo de evento
* Medio utilizado
* Dirección o correo usado
* Resultado
* Observación
* Documento soporte
* Usuario o fuente de registro, si aplica

Esto permitirá reconstruir cronológicamente la gestión de notificación.

6. **Actualizar filtros superiores**

Los filtros actuales deben ajustarse para facilitar la búsqueda por datos jurídicos y operativos. Incluir filtros como:

* Buscar por operador, NIT, expediente, BDI o pliego
* Fecha del acto administrativo
* Fecha de entrega
* Fecha efectiva de notificación
* Tipo de notificación
* Medio de entrega
* Estado de la notificación
* Servicio
* Régimen habilitante
* BDI número
* BDI vigencia

El filtro de BDI debe permitir buscar por número completo, por número independiente y por vigencia, por ejemplo: **9054-2025**.

7. **Mejorar los estados visuales**

El campo **Estado de la notificación** debe mostrarse con etiquetas visuales tipo badge. Ejemplos:

* Notificado
* Pendiente
* Devuelto
* En gestión
* Requiere revisión
* Notificación efectiva
* Fallido

Usar colores diferenciados, pero sobrios y alineados con el sistema.

8. **Actualizar botones de acción**

Mantener los botones generales:

* Nuevo análisis
* Exportar Excel

Agregar o ajustar acciones por fila:

* Ver detalle
* Ver trazabilidad
* Ver documentos
* Descargar soporte
* Registrar novedad, si aplica
* Reintentar / relanzar notificación, si aplica

9. **Mantener coherencia visual**

El rediseño debe conservar la estética del prototipo actual:

* Fondo claro
* Títulos en azul institucional
* Tabla con encabezado azul oscuro
* Filtros en cajas limpias
* Botones con estilo institucional
* Iconografía sencilla
* Espaciado ordenado
* Diseño profesional y administrativo

10. **Objetivo funcional del rediseño**

El nuevo prototipo debe permitir responder claramente estas preguntas:

* ¿Quién es el operador?
* ¿Cuál es el NIT?
* ¿Qué expediente se consulta?
* ¿Qué servicio está asociado?
* ¿Cuál es el régimen habilitante?
* ¿Cuál es el BDI?
* ¿Cuál es el pliego o acto administrativo?
* ¿Cuándo fue expedido?
* ¿Qué tipo de notificación se usó?
* ¿Por qué medio se entregó?
* ¿A qué dirección física o correo se envió?
* ¿Cuándo se entregó?
* ¿Cuándo quedó legalmente notificado?
* ¿Cuál fue el estado o resultado?
* ¿Hubo devolución u observación?
* ¿Qué documentos soportan la actuación?
* ¿Qué eventos históricos existen asociados al pliego?

El resultado esperado es una interfaz más clara, jurídica y procesalmente ordenada, que permita trazabilidad completa del trámite de notificación del pliego y evite confundir el **tipo de notificación** con el **medio de entrega**, así como la **fecha de entrega** con la **fecha efectiva de notificación**. Estos ajustes responden a la observación de que la estructura actual mezcla conceptos jurídicos, procesales y operativos que deben visualizarse de forma diferenciada. 
