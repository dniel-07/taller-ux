
const formulario = document.getElementById("formulario");
const titulo = document.getElementById("titulo");
const contenido = document.getElementById("contenido");
const mensaje = document.getElementById("mensaje");
const listaNotas = document.getElementById("lista-notas");

let notas = [];
let siguienteId = 1;
let notaEliminada = null;

function mostrarMensaje(texto, tipo = "info") {
  mensaje.textContent = texto;
  mensaje.className = tipo;
}

function renderizarNotas() {
  listaNotas.replaceChildren();

  if (notas.length === 0) {
    const vacio = document.createElement("p");
    vacio.textContent = "Todavía no tienes notas. ¡Agrega la primera!";
    listaNotas.appendChild(vacio);
    return;
  }

  notas.forEach((nota) => {
    const tarjeta = document.createElement("article");
    tarjeta.className = "nota";

    const encabezado = document.createElement("h3");
    encabezado.textContent = nota.titulo;

    const texto = document.createElement("p");
    texto.textContent = nota.contenido;

    const acciones = document.createElement("div");
    acciones.className = "acciones";

    const editar = document.createElement("button");
    editar.type = "button";
    editar.className = "secundario";
    editar.textContent = "Editar";

    editar.addEventListener("click", () => {
      titulo.value = nota.titulo;
      contenido.value = nota.contenido;

      notas = notas.filter((n) => n.id !== nota.id);
      renderizarNotas();

      mostrarMensaje("Edita la nota y pulsa «Guardar cambios».", "info");
      formulario.dataset.editando = String(nota.id);
      document.querySelector(".principal").textContent = "Guardar cambios";
      titulo.focus();
    });

    const eliminar = document.createElement("button");
    eliminar.type = "button";
    eliminar.className = "eliminar";
    eliminar.textContent = "Eliminar";

    eliminar.addEventListener("click", () => {
      const confirmar = window.confirm(
        `¿Quieres eliminar la nota «${nota.titulo}»?`
      );

      if (!confirmar) {
        mostrarMensaje("No se eliminó la nota.", "info");
        return;
      }

      notaEliminada = nota;
      notas = notas.filter((n) => n.id !== nota.id);
      renderizarNotas();

      mostrarMensaje("Nota eliminada.", "info");

      const deshacer = document.createElement("button");
      deshacer.type = "button";
      deshacer.className = "secundario";
      deshacer.textContent = "Deshacer eliminación";
      deshacer.setAttribute("aria-label", "Deshacer la eliminación de la nota");

      deshacer.addEventListener("click", () => {
        if (!notaEliminada) return;

        notas.push(notaEliminada);
        notaEliminada = null;
        renderizarNotas();
        mostrarMensaje("Nota restaurada correctamente.", "exito");
        deshacer.remove();
      });

      mensaje.appendChild(document.createTextNode(" "));
      mensaje.appendChild(deshacer);
    });

    acciones.append(editar, eliminar);
    tarjeta.append(encabezado, texto, acciones);
    listaNotas.appendChild(tarjeta);
  });
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nuevoTitulo = titulo.value.trim();
  const nuevoContenido = contenido.value.trim();

  if (!nuevoTitulo || !nuevoContenido) {
    mostrarMensaje("Completa el título y el contenido.", "error");

    if (!nuevoTitulo) {
      titulo.focus();
    } else {
      contenido.focus();
    }

    return;
  }

  const idEditando = formulario.dataset.editando;

  if (idEditando) {
    notas.push({
      id: Number(idEditando),
      titulo: nuevoTitulo,
      contenido: nuevoContenido
    });

    delete formulario.dataset.editando;
    document.querySelector(".principal").textContent = "Agregar nota";
    mostrarMensaje("Nota actualizada correctamente.", "exito");
  } else {
    notas.push({
      id: siguienteId++,
      titulo: nuevoTitulo,
      contenido: nuevoContenido
    });

    mostrarMensaje("Nota agregada correctamente.", "exito");
  }

  formulario.reset();
  renderizarNotas();
});

renderizarNotas();
