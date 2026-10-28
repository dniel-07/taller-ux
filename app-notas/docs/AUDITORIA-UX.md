# Auditoría UX — App de notas

## 1. Auditoría de usabilidad

| Heurística | Problema encontrado | Solución aplicada | Gravedad |
|---|---|---|---|
| Visibilidad del estado | No se informa claramente si una nota se agregó o eliminó. | Mostrar mensajes de confirmación después de cada acción. | Alta |
| Coincidencia con el mundo real | Los botones pueden tener nombres poco descriptivos. | Utilizar textos claros como «Agregar nota» y «Eliminar». | Media |
| Control y libertad | Una nota podría eliminarse accidentalmente. | Pedir confirmación y permitir deshacer la eliminación. | Alta |
| Prevención de errores | Se podrían guardar notas sin título o contenido. | Validar los campos antes de guardar. | Alta |
| Reconocer, no recordar | Los campos pueden carecer de etiquetas visibles. | Añadir etiquetas permanentes y botones descriptivos. | Media |

*Los problemas deben comprobarse en la versión original antes de entregar la auditoría.*

## 2. Leyes de diseño aplicadas

| Ley | Cambio aplicado | Justificación |
|---|---|---|
| Fitts | Botones de al menos 44 px de alto y con separación suficiente. | Facilita seleccionar los controles y reduce errores. |
| Hick | Destacar «Agregar nota» como acción principal. | Facilita identificar la acción más importante. |
| Miller | Organizar la interfaz en secciones: «Crear nota» y «Mis notas». | Facilita comprender y localizar la información. |

## 3. Accesibilidad

| Criterio | Mejora aplicada |
|---|---|
| Etiquetas | Usar `<label>` en cada campo. |
| Texto alternativo | Añadir `alt` descriptivo a las imágenes informativas. |
| Foco visible | Utilizar `:focus-visible` para navegar con teclado. |
| Contraste | Alcanzar al menos 4.5:1 en texto normal. |
| Tamaño de botones | Mantener una altura mínima de 44 px. |
| Estructura | Utilizar un solo `<h1>` y espaciado consistente. |
| Mensajes | Comunicar el resultado de las acciones mediante `role="status"`. |
| Colores | Definir variables CSS en `:root`. |

## 4. Pruebas funcionales

| Prueba | Resultado esperado |
|---|---|
| Agregar una nota válida | Se guarda y aparece un mensaje de confirmación. |
| Agregar una nota vacía | Se impide guardar y se muestra un error. |
| Editar una nota | Se guardan los cambios y se confirma la operación. |
| Eliminar una nota | Se puede cancelar o deshacer la eliminación. |
| Navegar con teclado | Los controles son accesibles y el foco es visible. |
| Ejecutar Lighthouse | Se obtiene una puntuación de accesibilidad de 90 o más. |

**URL publicada:** https://github.com/dniel-07/taller-ux

