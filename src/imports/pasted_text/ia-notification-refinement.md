HISTORIAS DE USUARIO - REFINAMIENTO SUBETAPAS MODELOS IA
Épica 01: Automatización de la Verificación de Notificación de Pliego de Cargos
Descripción: Como MinTIC, deseo automatizar la comprobación de la notificación de los pliegos de cargos en INTEGRATIC para agilizar el análisis documental y asegurar la trazabilidad del proceso sancionatorio.
Entrada: Excel con listado de pliego y año.
Salida: Reporte visual con descarga de Excel sobre la notificación del pliego.
HU 01: Carga y Procesamiento de Pliegos
Como usuario de consulta, quiero cargar un archivo XLS con la información de uno o más pliegos, para que el sistema inicie la búsqueda de información a través del API de Integratic y gestione los documentos necesarios.
Criterios de Aceptación:
El sistema debe permitir al usuario cargar un archivo en formato XLS que contenga mínimo el "Pliego" y el "Año", pueden ser uno o muchos.
El sistema debe conectarse de forma exitosa con el API de Integratic para consultar la información recibida del usuario.
El sistema debe almacenar automáticamente los documentos en la carpeta de documentos anexos (la carpeta se denomina con notificaciones/pliego-año) dentro del cloud storage, dentro de la subcarpeta se guarda la fecha de procesamiento (todos los archivos).
HU 02: Análisis de Notificación mediante IA
Como usuario de consulta, quiero que el sistema realice un análisis automático de los documentos almacenados, para determinar si el proceso de notificación fue adecuado.
Criterios de Aceptación:
El sistema debe ejecutar un Análisis de IA sobre los documentos almacenados en el cloud storage.
El análisis de IA debe distinguir entre tipos de notificación: Físico y Certimail (electrónica).
Para notificaciones físicas, el sistema debe identificar las siguientes Causales de Devolución:
Rehusado (RE), No existe (NE), No reside (NS), No reclamado (NR), i	Desconocido (DE) y Dirección errada.
Cerrado (C1/C2), No contactado (N1/N2), Fallecido (FA), Apartado Clausurado (AC) y Fuerza Mayor (FM).
Para notificaciones vía Certimail, el sistema debe registrar estados como: 
Acuse de recibo 
Apertura de notificación
Lectura de mensaje
Buzón lleno
Dominio/Correo no existe
Rechazado o Expirado
HU 03: Generación de Reporte de Hallazgos
Como usuario de consulta, quiero obtener un reporte visual del análisis documental realizado, para validar el cumplimiento de la subetapa de verificación de la notificación el cual podrá descargarse en (XLS) .
Criterios de Aceptación:
El sistema debe contar con un módulo para visualizar en una grilla el resultado del análisis de los pliegos.
El sistema deberá mostrar el listado de documentos PDF extraídos de Integratic y al hacer clic debe poder visualizar y/o descargar el documento.
El sistema debe permitir la descarga de la grilla resultante a través de un XLS.


Épica 02: Verificación Automatizada de Descargos y Pruebas
Descripción: Como analista del sistema, quiero investigar en el sistema INTEGRATIC si el operador presentó descargos o pruebas en respuesta al pliego de cargos, utilizando modelos de IA para interpretar la documentación técnica.
Entrada: Excel con listado de pliego y año.
Salida: Reporte visual con descarga de Excel sobre descargos y pruebas.
HU 04: Búsqueda de Radicados y Documentación
Como usuario de consulta, quiero buscar radicados por email, número de acto y año (otros criterios por documentar) a través del API de Integratic, para recuperar los archivos PDF y guardarlos en el cloud storage.
Criterios de Aceptación:
El sistema debe permitir al usuario cargar un archivo en formato XLS que contenga mínimo el "Pliego" y el  "Año", pueden ser uno o muchos.
El sistema debe conectarse al API de Integratic para consultar la información.
El sistema debe ser capaz de buscar y recuperar el PDF correspondiente y guardarlo en el cloud storage del proyecto (la carpeta se denomina con descargos/pliego-año), dentro de la subcarpeta se guarda la fecha de procesamiento (todos los archivos).
HU 05: Interpretación de Descargos mediante IA
Como usuario de consulta, quiero utilizar un modelo de inteligencia artificial para interpretar el contenido de los archivos de radicados, para clasificar la respuesta del operador y determinar si hay descargos o pruebas.
Criterios de Aceptación:
El sistema debe enviar los PDF descargados al modelo IA para su procesamiento.
El modelo de IA debe realizar la interpretación de PDF de los radicados y sus anexos para determinar si hay descargos o pruebas.
El sistema debe identificar si el documento corresponde efectivamente a Descargos presentados por el operador.
HU 06: Validación del Resultado de Verificación
Como usuario de consulta, quiero obtener un reporte visual del análisis documental realizado, para validar los descargos encontrados estos podrán descargarse en (XLS) .
Criterios de Aceptación:
El sistema debe contar con un módulo para visualizar en una grilla el resultado del análisis de los descargos encontrados.
El sistema deberá mostrar el listado de documentos PDF extraídos de Integratic y al hacer clic debe poder visualizar y/o descargar el documento.
El sistema debe permitir la descarga de la grilla resultante a través de un XLS.


Épica 03: Verificación Automatizada de Acto de pruebas
Descripción: Como analista del sistema, quiero investigar en el sistema INTEGRATIC la documentación asociada a los actos de pruebas registrados para continuar con el proceso administrativo.
Entrada: Excel con listado de actos de prueba y año.
Salida: Reporte visual con descarga de Excel sobre listado de pruebas.
HU 07: Búsqueda de Actos de pruebas y Documentación
Como usuario de consulta, quiero buscar la documentación de los actos de prueba registrados y las información asociada al mismo acto, a través del API de Integratic, para recuperar la información del acto y de los documentos anexos.
Criterios de Aceptación:
El sistema debe permitir al usuario cargar un archivo en formato XLS que contenga los números del acto de pruebas y el año, pueden ser uno o muchos. En caso de no encontrar un acto de pruebas se puede realizar la búsqueda adicional por:
Correo Electrónico (Email) depende la épica 01 notificacion
Búsqueda por Rangos de Fecha
Búsqueda de Categorías y Actos Administrativos (Indexación)
El sistema debe conectarse al API de Integratic para consultar la información.
El sistema debe conectarse al Sistema SER para consultar la información.
El sistema debe ser capaz de buscar y recuperar los PDFs el del acto de prueba y sus anexos correspondientes y guardarlos en el cloud storage del proyecto (la carpeta se denomina con actos_pruebas/pliego-año), dentro de la subcarpeta se guarda la fecha de procesamiento (todos los archivos).
HU 08: Interpretación de Descargos mediante IA
Como usuario de consulta, quiero utilizar un modelo de inteligencia artificial para extraer la información asociada a los actos de prueba y sus anexos, para continuar con el proceso administrativo.
Criterios de Aceptación:
El sistema debe enviar los PDF descargados al modelo IA para su procesamiento.
El modelo de IA debe realizar la extracción de los PDF de los actos de prueba y sus anexos la siguiente información:
Resumen de los cargos
Validación de los hallazgos en SER (incluir imágenes del SER y FUR si aplica)	
Estado de notificación
Validación temporalidad de plazos (con respecto a las fechas)
Si tiene apoderado o no
Si radico las fechas de presentación y las pruebas
Si solicitó o no pruebas
Si hay o no descargos
El sistema debe listar todas las pruebas incorporadas a la investigación.
El sistema debe identificar si el documento corresponde efectivamente a actos de prueba.
Si el cumplimiento de la obligación se subsanó, el sistema debe retornar al estado Archivo.
Si el RUES está cancelado, el sistema debe retornar estado Archivo.
HU 09: Validación del Resultado de Verificación
Como usuario de consulta, quiero obtener un reporte visual del análisis documental realizado, para validar la información de los actos de prueba encontrados, estos podrán descargarse en (XLS).
Criterios de Aceptación:
El sistema debe contar con un módulo para visualizar en una grilla el resultado del análisis de los actos de prueba encontrados.
El sistema deberá mostrar el listado de documentos PDF extraídos de Integratic y al hacer clic debe poder visualizar y/o descargar el documento.
El sistema debe permitir la descarga de la grilla resultante a través de un XLS.

Épica 04: Verificación de Alegatos de Conclusión
Descripción: Como usuario de consulta, quiero automatizar la búsqueda e interpretación de los alegatos de conclusión presentados por los operadores en el sistema INTEGRATIC para asegurar que su derecho a la defensa sea registrado y analizado en la toma de decisiones.

Entrada: Excel con listado de actos de prueba y año.
Salida: Reporte visual con descarga de Excel sobre listado de alegatos.
HU 10: Consulta de Radicados de Alegatos
Como usuario de consulta,  quiero buscar radicados por email, número de acto de pruebas y año, para localizar los soportes documentales de los alegatos asociados al radicado.
Criterios de Aceptación:

El sistema debe permitir al usuario cargar un archivo en formato XLS que contenga mínimo el "acto de pruebas" y el “año”,  pueden ser uno o muchos.
En caso de no encontrar un acto de pruebas se puede realizar la búsqueda adicional por:
Correo Electrónico (Email) depende la épica 01 notificacion
Búsqueda por Rangos de Fecha
Búsqueda de Categorías y Actos Administrativos (Indexación)
El sistema debe conectarse al API de Integratic para consultar la información.
El sistema debe ser capaz de buscar y recuperar el PDF correspondiente y guardarlo en el cloud storage del proyecto (la carpeta se denomina con alegatos/pliego-año), dentro de la subcarpeta se guarda la fecha de procesamiento (todos los archivos).
HU 11: Recuperación e Interpretación de Alegatos por IA
Como usuario de consulta, quiero procesar los archivos PDF guardados en el cloud storage y procesarlos con un modelo de IA, para obtener los alegatos de conclusión presentados
Criterios de Aceptación:
Los documentos recuperados deben ser procesados por el modelo IA.
El modelo de IA debe realizar la interpretación de PDF de los radicados y sus anexos para determinar si hay alegatos.
El sistema debe identificar si el documento corresponde efectivamente a un Alegato presentado por el operador.
HU 12: Validación del Resultado del Análisis
Como usuario de consulta, quiero obtener un reporte visual del análisis documental realizado, para validar los alegatos encontrados, estos podrán descargarse en (XLS) .
Criterios de Aceptación:
El sistema debe contar con un módulo para visualizar en una grilla el resultado del análisis de los alegatos encontrados.
El sistema deberá mostrar el listado de documentos extraídos de Integratic y al hacer clic debe poder visualizar y/o descargar el documento.
El sistema debe permitir la descarga de la grilla resultante a través de un XLS.

Épica 05: Verificación de Cumplimiento de la Obligación para la toma de decisiones
Descripción: Como usuario de consulta, quiero determinar si el operador ha cumplido con sus obligaciones de pago de contraprestaciones consultando los sistemas SER e INTEGRATIC para generar el informe final que soporte la toma de decisiones.
Entrada: Excel con listado de actos de prueba y año.
Salida: Reporte visual con descarga de Excel sobre el estado de cumplimiento de las obligaciones.
HU 13: Verificación de Hallazgos
Como usuario de consulta, quiero consultar los datos del operador en el sistema SER e Integratic, para verificar el estado de cumplimiento de la obligación de pago de contraprestaciones.
Criterios de Aceptación:
El sistema debe permitir al usuario cargar un archivo en formato XLS que contenga los números del acto de pruebas y el año, pueden ser uno o muchos.
En caso de no encontrar un acto de pruebas se puede realizar la búsqueda adicional por:
Correo Electrónico (Email) depende la épica 01 notificacion
Búsqueda por Rangos de Fecha
Búsqueda de Categorías y Actos Administrativos (Indexación)
El sistema debe conectarse al API de Integratic para consultar la información.
El sistema debe conectarse al Sistema SER para consultar la información.
El sistema debe ser capaz de buscar y recuperar los PDFs del número del acto de pruebas y guardarlos en el cloud storage del proyecto (la carpeta se denomina con verificacion_cumplimiento/pliego-año), dentro de la subcarpeta se guarda la fecha de procesamiento (todos los archivos).
HU 14: Validación del SER a través de IA
Como usuario de consulta, quiero procesar FUR, Excel y las imágenes tomadas del SER, para obtener el estado de cumplimiento de la obligación.
Criterios de Aceptación:
Los documentos recuperados deben ser procesados por el modelo IA.
El modelo de IA debe revisar los hallazgos de acuerdo al documento de pruebas para determinar el estado de cumplimiento de la obligación.
Si el cumplimiento de la obligación se subsano, el sistema debe retornar estado Archivo.
HU 15: Validación del Resultado
Como usuario de consulta, quiero generar una grilla basada en los hallazgos encontrados, para consolidar la información necesaria para la toma de decisiones administrativas y el estado del archivo si aplica.
Criterios de Aceptación:
El sistema debe contar con un módulo para visualizar en una grilla el resultado del análisis de cumplimiento de la obligación.
El sistema deberá mostrar el listado de documentos PDF e Imagen extraídos del SER y al hacer clic debe poder visualizar y/o descargar el documento.
El sistema debe permitir la descarga de la grilla resultante a través de un XLS.
Nota: Queda fuera del alcance el cálculo de la sanción de acuerdo con el Decreto, mejora para una siguiente fase del proyecto.

Resumen de las 5 subetapas:





Versión
Fecha
Descripción del cambio
Elaboró
Revisado y/o Aprobada
1.0
27/02/2026
Elaboración Documento
Juan Uribe
Equipo SIA
MinTIC
Enviada por Correo Electrónico




