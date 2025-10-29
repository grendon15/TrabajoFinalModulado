// Módulo de Gestión de Estudiantes
function inicializarModuloEstudiantes() {
  console.log("Inicializando módulo Estudiantes");
  mostrarListaEstudiantes();
  
  // Configurar event listeners específicos del módulo
  document.getElementById("formEstudiante").addEventListener("submit", guardarEstudiante);
}

function mostrarListaEstudiantes() {
  const contenedor = document.getElementById("listaEstudiantes");
  const grupo = data[grupoActual];
  
  if (grupo.estudiantes.length === 0) {
    contenedor.innerHTML = `
      <div class="alert alert-info">
        <h4>No hay estudiantes registrados</h4>
        <p>Utiliza el formulario superior para agregar estudiantes.</p>
      </div>
    `;
    return;
  }
  
  let html = `
    <h4 class="mb-3">Estudiantes - ${grupo.grupo}</h4>
    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th>Identificación</th>
          <th>Nombre</th>
          <th>Apoyo Estudiantil</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
  `;
  
  grupo.estudiantes.forEach((est, idx) => {
    html += `
      <tr>
        <td>${est.identificacion}</td>
        <td>${est.nombre}</td>
        <td>${est.apoyoEstudiantil}</td>
        <td class="acciones-btn">
          <button class="btn btn-warning btn-sm" onclick="editarEstudiante(${idx})">✏️ Editar</button>
          <button class="btn btn-danger btn-sm" onclick="eliminarEstudiante(${idx})">🗑️ Eliminar</button>
        </td>
      </tr>`;
  });
  
  html += `</tbody></table>`;
  contenedor.innerHTML = html;
}

function guardarEstudiante(e) {
  e.preventDefault();

  const identificacion = document.getElementById("identificacion").value.trim();
  const nombre = document.getElementById("nombreEstudiante").value.trim();
  const apoyoEstudiantil = document.getElementById("apoyoEstudiantil").value;
  const editIndex = parseInt(document.getElementById("editEstudianteIndex").value);
  // Validación de campos - Alertas para completat todos los datos
  if (!identificacion || !nombre || !apoyoEstudiantil) {
    Swal.fire({ icon: "error", title: "Oops...", text: "Debes completar todos los campos" });
    return;
  }
  //Condiciomal para evitar duplicados al editar estudiante
  if (editIndex === -1) {
    const existe = data[grupoActual].estudiantes.some(est => est.identificacion === identificacion);
    if (existe) {
      Swal.fire({ icon: "error", title: "Oops...", text: "Ya existe un estudiante con esta identificación" });
      return;
    }
  }

  if (editIndex >= 0) {
    data[grupoActual].estudiantes[editIndex] = { identificacion, nombre, apoyoEstudiantil };
    document.getElementById("formEstudiantesTitulo").textContent = "Agregar Estudiante";
  } else {
    data[grupoActual].estudiantes.push({ identificacion, nombre, apoyoEstudiantil });
  }

  document.getElementById("formEstudiante").reset();
  document.getElementById("editEstudianteIndex").value = -1;
  mostrarListaEstudiantes();
  
  //Mensaje de éxito para guardado de estudiante
  Swal.fire({ title: "Guardado", text: "Estudiante guardado correctamente", icon: "success" });
}

function editarEstudiante(idx) {
  const estudiante = data[grupoActual].estudiantes[idx];
  document.getElementById("identificacion").value = estudiante.identificacion;
  document.getElementById("nombreEstudiante").value = estudiante.nombre;
  document.getElementById("apoyoEstudiantil").value = estudiante.apoyoEstudiantil;
  document.getElementById("editEstudianteIndex").value = idx;
  document.getElementById("formEstudiantesTitulo").textContent = "Editar Estudiante";
}

//Alerta de eliminación de estudiante
function eliminarEstudiante(idx) {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "Esta acción no se puede deshacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      data[grupoActual].estudiantes.splice(idx, 1);
      mostrarListaEstudiantes();
      Swal.fire({ title: "Eliminado", text: "Estudiante eliminado correctamente", icon: "success" });
    }
  });
}