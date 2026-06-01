Aspectos Generales (Aplica a todos los módulos)
[ ] Interfaz por pestañas: Agrupar las variables por temáticas (ej. Info del Operador, Notificación) para reducir la carga visual de las tablas
.
[ ] Botón de consulta individual: Añadir una caja de búsqueda o botón para consultar un solo expediente sin necesidad de cargar un Excel
.
[ ] Filtros de texto parcial: Permitir búsquedas que no requieran el texto exacto en columnas como "Operador" y "BDI"
.
[ ] Plantilla de carga: Incluir una plantilla de Excel descargable para asegurar el formato correcto
.
[ ] Ajuste de instrucciones: Cambiar el texto de "campos requeridos" para aclarar que únicamente se aceptan las columnas A (Número de pliego, 5 dígitos) y B (Año, 4 dígitos)
.

--------------------------------------------------------------------------------
Módulo 1: Verificación de Notificación del Pliego (Subetapa 1)
Lo que se pone/agrega:
[ ] ID de Certimail: Incluir el identificador de entrega electrónica en la traza
.
[ ] Radicado de constancia física: Incluir el número de guía o soporte de entrega física
.
[ ] Alerta de validación manual: Etiqueta o nota para casos donde la imagen de la notificación sea ilegible (escrita a mano)
.
[ ] Ajuste de etiquetas: Renombrar columnas y tipos de notificación según el manual técnico
.
Columnas que se quedan (Front-end):
[ ] Razón Social y BDI
.
[ ] Número de acto y Fecha
.
[ ] Tipo de notificación y Medio de entrega
.
[ ] Dirección física y Correo electrónico
.
[ ] Fecha de entrega efectiva
.
Columnas que se quitan (Pasan al Backend):
[ ] NIT
.
[ ] Código del expediente
.
[ ] Código de servicio y Servicio
.
[ ] Régimen habilitante
.

--------------------------------------------------------------------------------
Módulo 2: Verificación de Descargos y Pruebas (Subetapa 2)
Lo que se pone/agrega:
[ ] Cálculo de Estado del término: Implementar un modelo que calcule automáticamente si los descargos están en tiempo o vencidos
.
[ ] Acciones de descarga: Botones directos para visualizar/descargar los documentos asociados
.
Columnas que se quedan (Front-end):
[ ] ¿Presentó descargos?
.
[ ] Estado del término
.
[ ] Radicado de descargos
.
[ ] Fecha de presentación y Fecha de radicación
.
[ ] Documentos asociados
.
Columnas que se quitan (Pasan al Backend):
[ ] Calidad de quien presenta
.
[ ] Nombre del Apoderado y Representante Legal
.
[ ] Análisis de la IA: Resumen argumentativo y Categorías de defensa (para evitar sesgos en el abogado)
.
[ ] Detalle de pruebas: Pruebas solicitadas, anexadas, tipos de prueba, origen y estado de la prueba
.
Cambio en Información de Texto
[ ] Definición de Expediente: Ajustar el texto descriptivo basándose en los manuales de Aura Quantic para estandarizar el concepto de "número interno del Ministerio"
.
¿Cómo se manejarán las notificaciones con validación manual?
¿Qué información del operador se moverá al back-end?
¿Qué cambios incluye el módulo de descargos y pruebas?
eso es todo?  recuerdo mas cosas se mas especifico

Para ser más específico y detallar aquellos puntos que van más allá de las columnas visibles, aquí tienes los detalles técnicos, las reglas de negocio y las limitaciones que se discutieron en la reunión para que el sistema funcione correctamente:
1. Reglas de Negocio para el Cálculo de Términos
El sistema no solo muestra fechas, sino que debe aplicar lógica jurídica para que los datos sean útiles para el abogado:
Notificación por Aviso: Si la notificación fue por aviso, el sistema debe sumar un día adicional al conteo de términos, ya que Integratic solo entrega la fecha de entrega efectiva sin este ajuste legal
.
Hora de Notificación: Existe una regla (pendiente de confirmación final en el código) sobre la hora de recepción: si la notificación llega después de cierta hora, debe tomarse como recibida al día siguiente
.
Cambio de Modalidad: El sistema debe detectar si una notificación que inició como "personal/física" se convirtió en "electrónica". Esto ocurre si en la carpeta de documentos la IA detecta que el operador cargó voluntariamente su cédula y el certificado de existencia para seguir el proceso en línea
.
Estado del Término: El módulo de descargos debe indicar automáticamente si el documento fue radicado "En tiempo" o "Vencido", comparando la fecha de notificación efectiva con la de radicación de descargos
.
2. Especificaciones Técnicas del Archivo de Carga (Excel)
Se enfatizó que el sistema será muy estricto con el formato para evitar errores de procesamiento:
Estructura Única: Solo se reconocerán dos columnas. La Columna A para el número del pliego y la Columna B para el año
.
Formato de Dígitos: El número del pliego (Columna A) debe tener exactamente 5 dígitos (ej. 00527) y el año (Columna B) 4 dígitos
.
Restricción de Columnas: No se deben subir archivos con columnas adicionales (como las de los repartos habituales); el sistema arrojará error si no encuentra únicamente la estructura de dos columnas
.
3. Deudas Técnicas y Limitaciones de Integratic
Hay información que actualmente el sistema no puede extraer porque el proveedor (Integratic) no ha habilitado los servicios web, lo cual quedará como una "deuda técnica":
Servicios Faltantes: No se puede consultar actualmente el "tipo de radicado" ni información detallada del "servicio" directamente desde los servicios web de Integratic
.
Solicitud Formal: Se acordó que para solucionar esto se debe radicar un documento 027 ante la OTI para que el proveedor desarrolle los conectores necesarios
.
Notificación Única: Actualmente, el sistema solo permite enviar la comunicación a un solo correo electrónico, limitación que también requiere desarrollo adicional por parte de Integratic
.
4. Lógica de la Visualización (Por qué se ocultan cosas)
Se especificó una razón estratégica para mover datos al "back-end":
Evitar Sesgos: Se decidió ocultar el resumen argumentativo y las categorías de defensa generadas por la IA en el front-end para obligar al abogado a leer el documento original y evitar que confíe ciegamente en un resumen que podría "alucinar" o equivocarse
.
Validación Manual: Para las notificaciones físicas, si la IA detecta que la constancia está escrita a mano e ilegible (como "receta de médico"), el sistema debe mostrar una alerta de "Requiere validación manual" en lugar de intentar extraer un dato posiblemente erróneo
.
5. Definiciones Estándar
Expediente: Se debe usar la definición de los manuales de Aura Quantic. El código de expediente es el número interno del Ministerio (que puede empezar por 96 u 80) y no debe confundirse con otros ID de servicios, ya que un solo operador puede tener múltiples códigos de expediente
.
Razón Social: El nombre debe tomarse exactamente como aparece en el RUES para mantener la integridad de los datos en futuras etapas de automatización
.