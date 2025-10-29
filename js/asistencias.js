// Módulo de Gestión de Asistencias
function inicializarModuloAsistencias() {
  console.log("Inicializando módulo Asistencias");
  mostrarFormularioAsistencias();
  
  // Configurar event listeners específicos del módulo
  document.getElementById("btnGuardarAsistencias").addEventListener("click", guardarAsistencias);
  document.getElementById("btnVerAsistencias").addEventListener("click", mostrarRegistrosAsistencias);
  document.getElementById("btnActualizarAsistencia").addEventListener("click", actualizarAsistencia);
}

function mostrarFormularioAsistencias() {
  const materia = data[grupoActual].materias[materiaActual];
  const contenedor = document.getElementById("tablaAsistencias");
  const grupo = data[grupoActual];
  
  // Validar si hay estudiantes sino muestra mensaje que no hay
  if (grupo.estudiantes.length === 0) {
    contenedor.innerHTML = `
      <div class="alert alert-info">
        <h4>No hay estudiantes registrados</h4>
        <p>Primero debes agregar estudiantes en el módulo de Gestión de Estudiantes.</p>
      </div>
    `;
    return;
  }
  
  const hoy = new Date().toISOString().split('T')[0];
  document.getElementById("fechaAsistencia").value = hoy;
  
  let html = `
    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th>Nombre del Estudiante</th>
          <th>Asistencia</th>
        </tr>
      </thead>
      <tbody>
  `;
  
  data[grupoActual].estudiantes.forEach((estudiante, idx) => {
    html += `
      <tr>
        <td>${estudiante.nombre}</td>
        <td>
          <select class="form-select asistencia-alumno" data-id="${estudiante.identificacion}">
            <option value="asiste">Asiste</option>
            <option value="no asiste">No Asiste</option>
          </select>
        </td>
      </tr>`;
  });
  
  html += `</tbody></table>`;
  contenedor.innerHTML = html;
}

//Validar fecha no futura
function guardarAsistencias() {
  const fecha = document.getElementById("fechaAsistencia").value;
  if (!fecha) {
    Swal.fire({ icon: "error", title: "Oops...", text: "Debes seleccionar una fecha" });
    return;
  }

  // Validar que la fecha no sea futura
  const hoy = new Date().toISOString().split('T')[0];
  if (fecha > hoy) {
    Swal.fire({ 
      icon: "error", 
      title: "Fecha inválida", 
      text: "No puedes registrar asistencias para fechas futuras" 
    });
    return;
  }
  
  const materia = data[grupoActual].materias[materiaActual];
  const selects = document.querySelectorAll('.asistencia-alumno');
  const registroAsistencias = {
    fecha: fecha,
    asistencias: []
  };
  
  selects.forEach(select => {
    const estudianteId = select.getAttribute('data-id');
    const estudiante = data[grupoActual].estudiantes.find(e => e.identificacion === estudianteId);
    const estado = select.value;
    registroAsistencias.asistencias.push({
      estudianteId: estudianteId,
      estudiante: estudiante.nombre,
      estado: estado
    });
  });
  
  // Asegurar que exista el array de asistencias
  if (!materia.asistencias) {
    materia.asistencias = [];
  }
  
  const indexExistente = materia.asistencias.findIndex(a => a.fecha === fecha);
  if (indexExistente >= 0) {
    materia.asistencias[indexExistente] = registroAsistencias;
  } else {
    materia.asistencias.push(registroAsistencias);
  }
  //Mensaje de asistencias guardadas
  Swal.fire({ title: "Guardado", text: "Asistencias guardadas correctamente", icon: "success" });
}

function mostrarRegistrosAsistencias() {
  const materia = data[grupoActual].materias[materiaActual];
  const modalBody = document.getElementById("modalAsistenciasBody");
  
  if (!materia.asistencias || materia.asistencias.length === 0) {
    modalBody.innerHTML = "<p>No hay registros de asistencia para esta materia.</p>";
  } else {
    let html = `
      <div class="table-responsive">
        <table class="table table-striped">
          <thead class="table-dark">
            <tr>
              <th>Fecha</th>
              <th>Estudiante</th>
              <th>Asistencia</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
    `;
    
    materia.asistencias.forEach((registro, index) => {
      registro.asistencias.forEach(asistencia => {
        const estadoClass = asistencia.estado === "asiste" ? "text-success" : "text-danger";
        html += `
          <tr>
            <td>${registro.fecha}</td>
            <td>${asistencia.estudiante}</td>
            <td class="${estadoClass}">${asistencia.estado}</td>
            <td>
              <button class="btn btn-warning btn-sm" onclick="editarAsistencia('${registro.fecha}')">✏️ Editar</button>
            </td>
          </tr>
        `;
      });
    });
    
    html += `</tbody></table></div>`;
    modalBody.innerHTML = html;
  }
  
  new bootstrap.Modal(document.getElementById('modalAsistencias')).show();
}

function editarAsistencia(fecha) {
  const materia = data[grupoActual].materias[materiaActual];
  const registro = materia.asistencias.find(a => a.fecha === fecha);
  
  if (!registro) return;
  
  fechaEditandoAsistencia = fecha;
  
  let html = `
    <h5>Editar asistencia - ${fecha}</h5>
    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th>Estudiante</th>
          <th>Asistencia</th>
        </tr>
      </thead>
      <tbody>
  `;
  
  registro.asistencias.forEach(asistencia => {
    html += `
      <tr>
        <td>${asistencia.estudiante}</td>
        <td>
          <select class="form-select editar-asistencia" data-id="${asistencia.estudianteId}">
            <option value="asiste" ${asistencia.estado === "asiste" ? "selected" : ""}>Asiste</option>
            <option value="no asiste" ${asistencia.estado === "no asiste" ? "selected" : ""}>No Asiste</option>
          </select>
        </td>
      </tr>`;
  });
  
  html += `</tbody></table>`;
  document.getElementById("modalEditarAsistenciaBody").innerHTML = html;
  new bootstrap.Modal(document.getElementById('modalEditarAsistencia')).show();
}

function actualizarAsistencia() {
  const materia = data[grupoActual].materias[materiaActual];
  const registroIndex = materia.asistencias.findIndex(a => a.fecha === fechaEditandoAsistencia);
  
  if (registroIndex === -1) return;
  
  const selects = document.querySelectorAll('.editar-asistencia');
  
  selects.forEach(select => {
    const estudianteId = select.getAttribute('data-id');
    const nuevoEstado = select.value;
    
    const asistenciaIndex = materia.asistencias[registroIndex].asistencias.findIndex(a => a.estudianteId === estudianteId);
    if (asistenciaIndex !== -1) {
      materia.asistencias[registroIndex].asistencias[asistenciaIndex].estado = nuevoEstado;
    }
  });
  
  Swal.fire({ title: "Actualizado", text: "Asistencia actualizada correctamente", icon: "success" });
  bootstrap.Modal.getInstance(document.getElementById('modalEditarAsistencia')).hide();
}