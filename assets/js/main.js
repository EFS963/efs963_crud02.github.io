const txtNota = document.getElementById("txtNota");
const tblNotas = document.getElementById("tblNotas");

let notas = (localStorage.getItem("notas")) ? JSON.parse(localStorage.getItem("notas")) : [];


mostrarNotas();

function guardar() {
    const nota = txtNota.value;
    notas.push(nota);
    actualizarStorage();
    txtNota.value = "";
}

function actualizarStorage() {
    localStorage.setItem("notas", JSON.stringify(notas));
    mostrarNotas();
}

function mostrarNotas() {
    if (notas.length === 0) {
        tblNotas.innerHTML = `<tr><td colspan="2" class="text-center font-weight-bold">No hay notas</td></tr>`;
    } else {
        tblNotas.innerHTML = "";
        for (const nota of notas) {
            const tr = document.createElement("tr");
            tr.classList.add("text-center");

            const tdNota = document.createElement("td");
            tdNota.innerText = nota;
            tr.appendChild(tdNota);

            const tdAcciones = document.createElement("td");

            const btnEliminar = document.createElement("button");
            btnEliminar.classList.add("btn", "btn-danger");
            btnEliminar.innerText = "Eliminar";
            btnEliminar.onclick = () => eliminar(nota);
            tdAcciones.appendChild(btnEliminar);

            const btnEditar = document.createElement("button");
            btnEditar.classList.add("btn", "btn-primary", "ml-2");
            btnEditar.innerText = "Editar";
            btnEditar.onclick = () => editar(nota);
            tdAcciones.appendChild(btnEditar);
            tr.appendChild(tdAcciones);

            tblNotas.appendChild(tr);
        }
    }

}

function eliminar(nota) {
    const index = notas.indexOf(nota);
    notas.splice(index, 1);
    actualizarStorage();
}

function editar(nota) {
    const index = notas.indexOf(nota);
    const nuevo_nombre_nota = prompt(`Escribe el nuevo nombre para ${nota}`);
    notas[index] = nuevo_nombre_nota;
    actualizarStorage();
}


txtNota.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        guardar();
    }
});


// Agregar evento enter
// Agregar que no permita agregar una pelicula previamente agregada