// Módulo de Gestión de Notas
function inicializarModuloNotas() {
  console.log("Inicializando módulo Notas");
  mostrarTablaNotas();
  
  // Configurar event listeners específicos del módulo
  document.getElementById("btnDescargarPDF").addEventListener("click", descargarPDFNotas);
  document.getElementById("btnGuardarNotas").addEventListener("click", guardarNotasEstudiante);
}

function mostrarTablaNotas() {
  const contenedor = document.getElementById("tablaNotas");
  const grupo = data[grupoActual];
  const materia = data[grupoActual].materias[materiaActual];
  
  if (grupo.estudiantes.length === 0) {
    contenedor.innerHTML = `
      <div class="alert alert-info">
        <h4>No hay estudiantes registrados</h4>
        <p>Primero debes agregar estudiantes en el módulo de Gestión de Estudiantes.</p>
      </div>
    `;
    return;
  }
  
  let html = `
    <h4 class="mb-3">Notas - ${materia.nombre}</h4>
    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th>Identificación</th>
          <th>Nombre</th>
          <th>Nota 1</th>
          <th>Nota 2</th>
          <th>Nota 3</th>
          <th>Promedio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
  `;
  
  grupo.estudiantes.forEach((est, idx) => {
    const notasEstudiante = materia.notas ? materia.notas.find(n => n.estudianteId === est.identificacion) : null;
    let notas = [null, null, null];
    if (notasEstudiante && notasEstudiante.notas) {
      notasEstudiante.notas.forEach((nota, index) => {
        if (index < 3) notas[index] = nota;
      });
    }
    const promedio = promedioEstudiante(notas.filter(n => n !== null));
    
    html += `
      <tr>
        <td>${est.identificacion}</td>
        <td>${est.nombre}</td>
        <td>${notas[0] !== null ? notas[0] : ''}</td>
        <td>${notas[1] !== null ? notas[1] : ''}</td>
        <td>${notas[2] !== null ? notas[2] : ''}</td>
        <td><strong>${promedio}</strong></td>
        <td class="acciones-btn">
          <button class="btn btn-primary btn-sm" onclick="gestionarNotasEstudiante(${idx})">📝 Editar Notas</button>
        </td>
      </tr>`;
  });
  
  html += `</tbody></table>`;
  contenedor.innerHTML = html;
}

function gestionarNotasEstudiante(indexEstudiante) {
  const estudiante = data[grupoActual].estudiantes[indexEstudiante];
  const materia = data[grupoActual].materias[materiaActual];
  
  const notasEstudiante = materia.notas ? materia.notas.find(n => n.estudianteId === estudiante.identificacion) : null;
  let notas = ['', '', ''];
  if (notasEstudiante && notasEstudiante.notas) {
    notasEstudiante.notas.forEach((nota, index) => {
      if (index < 3) notas[index] = nota;
    });
  }
  
  estudianteEditandoNotas = indexEstudiante;
  
  let html = `
    <h5>Gestionar notas de ${estudiante.nombre}</h5>
    <p><strong>Identificación:</strong> ${estudiante.identificacion}</p>
    <div id="notasContainer">
      <div class="input-group nota-input">
        <span class="input-group-text">Nota 1</span>
        <input type="number" class="form-control nota-valor" value="${notas[0]}" step="0.1" min="0" max="5" placeholder="Ingrese nota">
      </div>
      <div class="input-group nota-input">
        <span class="input-group-text">Nota 2</span>
        <input type="number" class="form-control nota-valor" value="${notas[1]}" step="0.1" min="0" max="5" placeholder="Ingrese nota">
      </div>
      <div class="input-group nota-input">
        <span class="input-group-text">Nota 3</span>
        <input type="number" class="form-control nota-valor" value="${notas[2]}" step="0.1" min="0" max="5" placeholder="Ingrese nota">
      </div>
    </div>
  `;
  
  document.getElementById("modalNotasBody").innerHTML = html;
  new bootstrap.Modal(document.getElementById('modalNotas')).show();
}

function guardarNotasEstudiante() {
  const estudiante = data[grupoActual].estudiantes[estudianteEditandoNotas];
  const materia = data[grupoActual].materias[materiaActual];
  
  const inputsNotas = document.querySelectorAll('.nota-valor');
  const nuevasNotas = [];
  
  inputsNotas.forEach(input => {
    const valor = input.value.trim();
    if (valor !== '' && !isNaN(valor) && parseFloat(valor) >= 0 && parseFloat(valor) <= 5) {
      nuevasNotas.push(parseFloat(valor));
    }
  });
  
  // Asegurar que exista el array de notas
  if (!materia.notas) {
    materia.notas = [];
  }
  
  const indexExistente = materia.notas.findIndex(n => n.estudianteId === estudiante.identificacion);
  
  if (nuevasNotas.length > 0) {
    if (indexExistente >= 0) {
      materia.notas[indexExistente].notas = nuevasNotas;
    } else {
      materia.notas.push({
        estudianteId: estudiante.identificacion,
        notas: nuevasNotas
      });
    }
    
    Swal.fire({
      title: "Guardado",
      text: "Notas guardadas correctamente",
      icon: "success",
      draggable: true
    });
  } else {
    if (indexExistente >= 0) {
      materia.notas.splice(indexExistente, 1);
    }
    
    Swal.fire({
      title: "Eliminado",
      text: "Todas las notas han sido eliminadas",
      icon: "info",
      draggable: true
    });
  }
  
  bootstrap.Modal.getInstance(document.getElementById('modalNotas')).hide();
  mostrarTablaNotas();
  mostrarMaterias(grupoActual);
}

function descargarPDFNotas() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  const grupo = data[grupoActual];
  const materia = data[grupoActual].materias[materiaActual];
  
  // Título
  doc.setFontSize(16);
  doc.text(`Reporte de Notas - ${materia.nombre}`, 14, 15);
  doc.setFontSize(12);
  doc.text(`Grupo: ${grupo.grupo}`, 14, 25);
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 32);
  
  // Preparar datos de la tabla
  const tableData = [];
  tableData.push(['Identificación', 'Nombre', 'Nota 1', 'Nota 2', 'Nota 3', 'Promedio']);
  
  grupo.estudiantes.forEach(est => {
    const notasEstudiante = materia.notas ? materia.notas.find(n => n.estudianteId === est.identificacion) : null;
    let notas = [null, null, null];
    if (notasEstudiante && notasEstudiante.notas) {
      notasEstudiante.notas.forEach((nota, index) => {
        if (index < 3) notas[index] = nota;
      });
    }
    const promedio = promedioEstudiante(notas.filter(n => n !== null));
    
    tableData.push([
      est.identificacion,
      est.nombre,
      notas[0] !== null ? notas[0].toString() : '-',
      notas[1] !== null ? notas[1].toString() : '-',
      notas[2] !== null ? notas[2].toString() : '-',
      promedio
    ]);
  });
  
  // Generar tabla
  doc.autoTable({
    startY: 40,
    head: [tableData[0]],
    body: tableData.slice(1),
    styles: { fontSize: 10 },
    headStyles: { fillColor: [41, 128, 185] }
  });
  
  // Guardar PDF
  doc.save(`notas_${grupo.grupo}_${materia.nombre}_${new Date().toISOString().split('T')[0]}.pdf`);
}