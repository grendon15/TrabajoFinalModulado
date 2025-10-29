// Módulo de Reportes y Gráficos
function inicializarModuloReportes() {
  console.log("Inicializando módulo Reportes");
  mostrarFiltrosEspecificos(document.getElementById("tipoReporte").value);
  
  // Configurar event listeners específicos del módulo
  document.getElementById("tipoReporte").addEventListener("change", function() {
    mostrarFiltrosEspecificos(this.value);
  });

  // Botones de generación de reportes
  document.getElementById("btnGenerarAsistencia").addEventListener("click", generarReporteAsistencia);
  document.getElementById("btnGenerarApoyo").addEventListener("click", generarReporteApoyo);
  document.getElementById("btnGenerarAprobados").addEventListener("click", generarReporteAprobados);
}

function mostrarFiltrosEspecificos(tipoReporte) {
  // Ocultar todos los filtros primero
  document.getElementById('filtrosAsistencia').style.display = 'none';
  document.getElementById('filtrosApoyo').style.display = 'none';
  document.getElementById('filtrosAprobados').style.display = 'none';

  // Mostrar los filtros correspondientes al tipo de reporte
  switch(tipoReporte) {
    case 'asistenciaMensual':
      document.getElementById('filtrosAsistencia').style.display = 'block';
      // Establecer fechas por defecto (último mes)
      const hoy = new Date();
      const haceUnMes = new Date();
      haceUnMes.setMonth(hoy.getMonth() - 1);
      
      document.getElementById('fechaFinal').value = hoy.toISOString().split('T')[0];
      document.getElementById('fechaInicial').value = haceUnMes.toISOString().split('T')[0];
      break;
    case 'apoyoEstudiantil':
      document.getElementById('filtrosApoyo').style.display = 'block';
      break;
    case 'aprobadosReprobados':
      document.getElementById('filtrosAprobados').style.display = 'block';
      break;
  }
}

function generarReporteAsistencia() {
  const grupoIndex = parseInt(document.getElementById("grupoReporte").value);
  const materiaIndex = parseInt(document.getElementById("materiaReporte").value);
  const fechaInicial = document.getElementById("fechaInicial").value;
  const fechaFinal = document.getElementById("fechaFinal").value;

  if (!fechaInicial || !fechaFinal) {
    Swal.fire({ icon: "error", title: "Error", text: "Debes seleccionar ambas fechas" });
    return;
  }

  const grupo = data[grupoIndex];
  const materia = grupo.materias[materiaIndex];

  if (!materia.asistencias || materia.asistencias.length === 0) {
    mostrarMensajeSinDatos("No hay registros de asistencia para esta materia");
    return;
  }

  // Filtrar asistencias por rango de fechas
  const asistenciasFiltradas = materia.asistencias.filter(registro => {
    return registro.fecha >= fechaInicial && registro.fecha <= fechaFinal;
  });

  if (asistenciasFiltradas.length === 0) {
    mostrarMensajeSinDatos("No hay registros de asistencia en el rango de fechas seleccionado");
    return;
  }

  // Calcular totales
  let totalAsistencias = 0;
  let totalInasistencias = 0;
  let totalRegistros = 0;

  asistenciasFiltradas.forEach(registro => {
    registro.asistencias.forEach(asistencia => {
      totalRegistros++;
      if (asistencia.estado === "asiste") {
        totalAsistencias++;
      } else {
        totalInasistencias++;
      }
    });
  });

  const porcentajeAsistencias = ((totalAsistencias / totalRegistros) * 100).toFixed(1);
  const porcentajeInasistencias = ((totalInasistencias / totalRegistros) * 100).toFixed(1);

  // Destruir gráfico anterior si existe
  if (graficoActual) {
    graficoActual.destroy();
    graficoActual = null;
  }

  // Crear contenedor para el gráfico
  const contenedor = document.getElementById("contenedorGraficos");
  contenedor.innerHTML = `
    <div class="row mb-4">
      <div class="col-md-6">
        <div class="card text-center">
          <div class="card-body">
            <h3 class="text-success">${totalAsistencias}</h3>
            <p class="card-text">Asistencias</p>
            <h5 class="text-success">${porcentajeAsistencias}%</h5>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card text-center">
          <div class="card-body">
            <h3 class="text-danger">${totalInasistencias}</h3>
            <p class="card-text">Inasistencias</p>
            <h5 class="text-danger">${porcentajeInasistencias}%</h5>
          </div>
        </div>
      </div>
    </div>
    <div class="chart-container">
      <canvas id="graficoReporte"></canvas>
    </div>
  `;

  const ctx = document.getElementById('graficoReporte').getContext('2d');
  
  graficoActual = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Asistencias', 'Inasistencias'],
      datasets: [{
        label: 'Cantidad',
        data: [totalAsistencias, totalInasistencias],
        backgroundColor: ['#4CAF50', '#F44336'],
        borderWidth: 2,
        borderColor: ['#388E3C', '#D32F2F']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { 
          beginAtZero: true, 
          title: { 
            display: true, 
            text: 'Cantidad de Registros',
            font: { size: 14, weight: 'bold' }
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            afterLabel: function(context) {
              const porcentaje = context.dataIndex === 0 ? porcentajeAsistencias : porcentajeInasistencias;
              return `Porcentaje: ${porcentaje}%`;
            }
          }
        }
      }
    }
  });
}

//Reporte de apoyo estudiantil
function generarReporteApoyo() {
  const grupoIndex = parseInt(document.getElementById("grupoReporte").value);
  const grupo = data[grupoIndex];

  if (!grupo.estudiantes || grupo.estudiantes.length === 0) {
    mostrarMensajeSinDatos("No hay estudiantes registrados en este grupo");
    return;
  }

  // Contar estudiantes por tipo de apoyo
  const apoyos = {};
  grupo.estudiantes.forEach(est => {
    const apoyo = est.apoyoEstudiantil;
    apoyos[apoyo] = (apoyos[apoyo] || 0) + 1;
  });

  const labels = Object.keys(apoyos);
  const datos = Object.values(apoyos);

  // Destruir gráfico anterior si existe
  if (graficoActual) {
    graficoActual.destroy();
    graficoActual = null;
  }

  // Crear contenedor para el gráfico
  const contenedor = document.getElementById("contenedorGraficos");
  contenedor.innerHTML = `
    <div class="alert alert-info">
      <h5>Distribución de Apoyo Estudiantil</h5>
      <p>Total de estudiantes: <strong>${grupo.estudiantes.length}</strong></p>
    </div>
    <div class="chart-container">
      <canvas id="graficoReporte"></canvas>
    </div>
  `;

  const ctx = document.getElementById('graficoReporte').getContext('2d');
  
  graficoActual = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Cantidad de Estudiantes',
        data: datos,
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
          '#FF9F40', '#FF6384', '#C9CBCF', '#4BC0C0', '#36A2EB'
        ],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { 
          beginAtZero: true, 
          title: { 
            display: true, 
            text: 'Cantidad de Estudiantes',
            font: { size: 14, weight: 'bold' }
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            afterLabel: function(context) {
              const total = grupo.estudiantes.length;
              const porcentaje = ((context.parsed / total) * 100).toFixed(1);
              return `Porcentaje: ${porcentaje}%`;
            }
          }
        }
      }
    }
  });
}

function generarReporteAprobados() {
  const grupoIndex = parseInt(document.getElementById("grupoReporte").value);
  const materiaIndex = parseInt(document.getElementById("materiaReporte").value);
  
  const grupo = data[grupoIndex];
  const materia = grupo.materias[materiaIndex];

  if (!materia.notas || materia.notas.length === 0) {
    mostrarMensajeSinDatos("No hay notas registradas para esta materia");
    return;
  }

  let aprobados = 0;
  let reprobados = 0;

  materia.notas.forEach(notaEstudiante => {
    const promedio = promedioEstudiante(notaEstudiante.notas);
    if (promedio >= 3.0) {
      aprobados++;
    } else {
      reprobados++;
    }
  });

  const total = aprobados + reprobados;
  const porcentajeAprobados = total > 0 ? ((aprobados / total) * 100).toFixed(1) : 0;
  const porcentajeReprobados = total > 0 ? ((reprobados / total) * 100).toFixed(1) : 0;

  // Destruir gráfico anterior si existe
  if (graficoActual) {
    graficoActual.destroy();
    graficoActual = null;
  }

  // Crear contenedor para el gráfico
  const contenedor = document.getElementById("contenedorGraficos");
  contenedor.innerHTML = `
    <div class="row mb-4">
      <div class="col-md-6">
        <div class="card text-center">
          <div class="card-body">
            <h3 class="text-success">${aprobados}</h3>
            <p class="card-text">Aprobados</p>
            <h5 class="text-success">${porcentajeAprobados}%</h5>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card text-center">
          <div class="card-body">
            <h3 class="text-danger">${reprobados}</h3>
            <p class="card-text">Reprobados</p>
            <h5 class="text-danger">${porcentajeReprobados}%</h5>
          </div>
        </div>
      </div>
    </div>
    <div class="chart-container">
      <canvas id="graficoReporte"></canvas>
    </div>
  `;

  const ctx = document.getElementById('graficoReporte').getContext('2d');
  
  graficoActual = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Aprobados', 'Reprobados'],
      datasets: [{
        label: 'Cantidad de Estudiantes',
        data: [aprobados, reprobados],
        backgroundColor: ['#4CAF50', '#F44336'],
        borderWidth: 2,
        borderColor: ['#388E3C', '#D32F2F']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { 
          beginAtZero: true, 
          title: { 
            display: true, 
            text: 'Cantidad de Estudiantes',
            font: { size: 14, weight: 'bold' }
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            afterLabel: function(context) {
              const porcentaje = context.dataIndex === 0 ? porcentajeAprobados : porcentajeReprobados;
              return `Porcentaje: ${porcentaje}%`;
            }
          }
        }
      }
    }
  });
}

function mostrarMensajeSinDatos(mensaje = "No hay datos disponibles para generar el reporte") {
  const contenedor = document.getElementById("contenedorGraficos");
  contenedor.innerHTML = `
    <div class="alert alert-warning text-center">
      <h4>⚠️ ${mensaje}</h4>
      <p>Agrega datos en los módulos correspondientes y vuelve a intentar.</p>
    </div>
  `;
}