
# 📘 Historias de Usuario

---

## HU-001 - Establecer un límite mensual de gasto
**Descripción:**  
Como usuario, quiero definir un límite de gasto mensual para controlar mis finanzas.  
**Estimación:** 5  
**Prioridad:** 8  
**Criterios de Evaluación:**  
- El usuario puede guardar un monto límite.  
- El límite se muestra en la interfaz.  
- Se advierte si se supera.  
**Criterios de Aceptación:**  
1. Ingresar límite mensual con valor 0 o negativos y comprobar que se indica error.  
2. Ingresar límite mensual con letras y comprobar que se indica error.

---

## HU-002 - Notificación de recomendación por llegada anticipada al límite mensual
**Descripción:**  
Como usuario, quiero tener una notificación de recomendación que suceda cuando los gastos realizados llegan al límite mensual antes de la fecha estimada.  
**Estimación:** 8  
**Prioridad:** 3  
**Criterios de Evaluación:**  
- La página web notificará una recomendación al usuario que llegue al límite mensual antes de la fecha presupuestada.  
**Criterios de Aceptación:**  
1. El sistema debe generar la notificación cuando el usuario haya alcanzado el límite mensual.  
2. La notificación debe mostrarse al usuario de forma clara al momento de que se alcance el límite.

---

## HU-003 - Notificación de recomendación por no llegar al límite mensual establecido
**Descripción:**  
Como usuario, quiero tener una notificación de recomendación que suceda cuando los gastos realizados no alcanzan el límite mensual.  
**Estimación:** 8  
**Prioridad:** 3  
**Criterios de Evaluación:**  
- La página web notificará una recomendación al usuario que no llegue al límite mensual establecido.  
**Criterios de Aceptación:**  
1. La notificación se genera solo si el gasto total es menor, por ejemplo, al 90% del presupuesto mensual.  
2. El sistema debe verificar automáticamente si el gasto total del mes fue menor al presupuesto asignado, al finalizar el período mensual.

---

## HU-004 - Registrar categorías
**Descripción:**  
Como usuario, quiero crear categorías de gasto y asignarles presupuestos.  
**Estimación:** 4  
**Prioridad:** 3  
**Criterios de Evaluación:**  
- Agregar/editar/eliminar categorías.  
- Asignar presupuestos.  
- Resumen gasto vs presupuesto.  
**Criterios de Aceptación:**  
1. El sistema debe validar que el nombre de la categoría no esté vacío.  
2. El sistema debe validar que el nombre de la categoría no se repita.

---

## HU-005 - Registro e inicio de sesión
**Descripción:**  
Como usuario, quiero poder registrarme e iniciar sesión con opción de mantenerme logueado.  
**Estimación:** 8  
**Prioridad:** 8  
**Criterios de Evaluación:**  
- Crear cuenta con correo/contraseña.  
- Opción “mantener sesión”.  
- Expira solo si se cierra sesión.  
**Criterios de Aceptación:**  
1. El correo debe tener un formato válido y verificar que no esté registrado.  
2. La contraseña debe cumplir con los requisitos mínimos (longitud mínima, combinación de letras y números).

---

## HU-006 - Consultar historial de presupuestos
**Descripción:**  
Como usuario, quiero revisar presupuestos y recomendaciones anteriores.  
**Estimación:** 5  
**Prioridad:** 7  
**Criterios de Evaluación:**  
- Ver historial ordenado.  
- Filtrar por mes o categoría.  
- Mostrar detalles.  
**Criterios de Aceptación:**  
1. Si no hay historial se muestra un mensaje “No hay registros disponibles”.

---

---

## HU-007 - Recordatorios para registrar gastos
**Descripción:**  
Como usuario, quiero recibir recordatorios para registrar mis gastos regularmente.  
**Estimación:** 6  
**Prioridad:** 4  
**Criterios de Evaluación:**  
- Activar/desactivar recordatorios.  
- Elegir frecuencia y hora.  
- Notificaciones visibles.  
**Criterios de Aceptación:**  
1. El mensaje debe ser claro y amigable.  
2. Si el usuario ya ha registrado gastos en el día, el sistema puede omitir el recordatorio.

---

## HU-008 - Registrar gastos diarios
**Descripción:**  
Como usuario, quiero registrar fácilmente mis gastos diarios con detalles.  
**Estimación:** 7  
**Prioridad:** 7  
**Criterios de Evaluación:**  
- Ingresar monto, categoría, fecha, descripción.  
- Reflejado en resumen mensual.  
- Interfaz rápida.  
**Criterios de Aceptación:**  
1. El sistema debe mostrar un formulario accesible para ingresar nuevos gastos.  
2. El formulario debe pedir el monto, fecha, descripción y categoría del gasto realizado.

---

## HU-009 - Ver gráficos y estadísticas
**Descripción:**  
Como usuario, quiero ver estadísticas visuales de mis gastos y presupuesto.  
**Estimación:** 6  
**Prioridad:** 6  
**Criterios de Evaluación:**  
- Gráficos de barras, pastel y líneas.  
- Por categoría, tiempo y límite.  
- Se actualizan en tiempo real.  
**Criterios de Aceptación:**  
1. Si no hay datos disponibles, el sistema debe mostrar un mensaje “Sin datos para graficar”.

---

## HU-010 - Notificaciones por límite mensual superado
**Descripción:**  
Como usuario, quiero recibir alertas si supero el límite mensual.  
**Estimación:** 5  
**Prioridad:** 4  
**Criterios de Evaluación:**  
- Notificación clara y accesible.  
**Criterios de Aceptación:**  
1. Desde la notificación, el usuario debe poder acceder rápidamente al detalle de sus gastos.

---

## HU-011 - Definir metas de ahorro
**Descripción:**  
Como usuario, quiero establecer metas de ahorro y hacer seguimiento.  
**Estimación:** 6  
**Prioridad:** 7  
**Criterios de Evaluación:**  
- Crear metas con monto y período.  
- Ver progreso.  
- Notificaciones al acercarse o cumplir meta.  
**Criterios de Aceptación:**  
1. Se recibe una notificación cuando se alcanza el 80% y el 100% de la meta.  
2. El usuario debe poder modificar o eliminar metas.

---

## HU-012 - Guardar un gasto como favorito para usarlo de nuevo
**Descripción:**  
Como usuario, quiero poder marcar un gasto como favorito para reutilizarlo fácilmente en el futuro.  
**Estimación:** 4  
**Prioridad:** 3  
**Criterios de Evaluación:**  
- Guardar gasto favorito.  
- Ver favoritos desde sección separada.  
**Criterios de Aceptación:**  
1. El usuario puede guardar un gasto como favorito.  
2. Los favoritos se pueden consultar desde una sección separada.

---

## HU-013 - Filtrar gastos
**Descripción:**  
Como usuario, quiero filtrar gastos por categoría, fecha o monto.  
**Estimación:** 5  
**Prioridad:** 3  
**Criterios de Evaluación:**  
- Aplicar filtros desde la interfaz.  
- Combinación de múltiples filtros.  
- Lista se actualiza dinámicamente.  
**Criterios de Aceptación:**  
1. Se pueden limpiar todos los filtros con un solo botón “Quitar filtros”.  
2. Si no hay resultados que coincidan con los filtros mandar mensaje.

---

## HU-014 - Registrar gastos fijos mensuales
**Descripción:**  
Como usuario, quiero registrar gastos fijos que se repitan automáticamente cada mes.  
**Estimación:** 7  
**Prioridad:** 7  
**Criterios de Evaluación:**  
- Registrar gasto con frecuencia mensual.  
- Editar, pausar o eliminar.  
- Se añade al resumen mensual.  
**Criterios de Aceptación:**  
1. El usuario debe poder editar o eliminar cualquier gasto fijo registrado.  
2. El usuario debe poder desactivar un gasto fijo sin eliminarlo por completo.

---

## HU-015 - Resumen semanal por correo o notificación
**Descripción:**  
Como usuario, quiero recibir un resumen semanal de gastos sin entrar a la web.  
**Estimación:** 6  
**Prioridad:** 4  
**Criterios de Evaluación:**  
- Resumen automático por correo o notificación.  
- Usuario elige día/hora.  
- Incluye montos, categorías y alertas.  
**Criterios de Aceptación:**  
1. El usuario puede activar o desactivar el resumen semanal desde la configuración.  
2. Si no hay datos se mantiene mostrar mensaje informativo.

---

## HU-016 - Configurar monedas y tipo de cambio
**Descripción:**  
Como usuario, quiero usar distintas monedas y ajustar el tipo de cambio.  
**Estimación:** 5  
**Prioridad:** 4  
**Criterios de Evaluación:**  
- Elegir moneda principal.  
- Gastos se convierten automáticamente.  
- Actualización manual o automática del cambio.  
**Criterios de Aceptación:**  
1. El usuario selecciona la moneda principal con la cual tratará.  
2. El usuario debe poder actualizar manualmente el tipo de cambio en cualquier momento.

---

## HU-017 - Añadir etiquetas o notas a los gastos
**Descripción:**  
Como usuario, quiero etiquetar y agregar notas a mis gastos para buscarlos fácilmente.  
**Estimación:** 5  
**Prioridad:** 6  
**Criterios de Evaluación:**  
- Añadir etiquetas personalizadas.  
- Descripción detallada.  
- Búsqueda por etiquetas o contenido.  
**Criterios de Aceptación:**  
1. Las etiquetas se muestran junto al gasto en el resumen.  
2. El usuario debe poder editar o eliminar las notas y etiquetas de un gasto ya registrado.

---

## HU-018 - Ver resumen diario al abrir la app
**Descripción:**  
Como usuario, quiero ver un resumen diario de mis finanzas al iniciar la web.  
**Estimación:** 4  
**Prioridad:** 3  
**Criterios de Evaluación:**  
- Mostrar gastos del día, saldo y alertas.  
- Se actualiza automáticamente.  
- Accesible desde pantalla principal.  
**Criterios de Aceptación:**  
1. Si no hay gastos registrados ese día, el sistema muestra el mensaje “No hay registrado gastos hoy”.  
2. El resumen debe ser fácil de leer y entender.

---

## HU-019 - Configurar con modo claro y oscuro
**Descripción:**  
Como usuario, quiero cambiar entre modo claro y oscuro según mis preferencias.  
**Estimación:** 3  
**Prioridad:** 2  
**Criterios de Evaluación:**  
- Cambiar tema desde configuración.  
- Interfaz se adapta.  
- Preferencia se guarda y aplica al reiniciar.  
**Criterios de Aceptación:**  
1. El tema seleccionado se aplica inmediatamente sin recargar la página.  
2. Todos los elementos de la interfaz deben adaptarse correctamente a ambos modos.

---

## HU-020 - Configurar presupuesto o sueldo mensual
**Descripción:**  
Como usuario, quiero modificar o cambiar el presupuesto o sueldo, que coloque por cada mes asignado.  
**Estimación:** 6  
**Prioridad:** 8  
**Criterios de Evaluación:**  
- El usuario puede acceder a la vista donde se listan los presupuestos o sueldos mensuales y modificar los valores asignados para uno o más meses.  
**Criterios de Aceptación:**  
1. Si el usuario ingresa un dato no válido, el sistema mandará un mensaje de advertencia.  
2. El usuario puede modificar el presupuesto o sueldo en cualquier momento durante el mes.
