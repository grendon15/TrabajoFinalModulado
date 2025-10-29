// =======================
// DATOS INICIALES COMPLETOS - 3 GRUPOS Y 3 MATERIAS
// =======================
const data = [
  {
    grupo: "Grupo A",
    estudiantes: [
      { identificacion: "1001", nombre: "Juan Pérez", apoyoEstudiantil: "Matricula Cero" },
      { identificacion: "1002", nombre: "María García", apoyoEstudiantil: "Viejitos activos" },
      { identificacion: "1003", nombre: "Carlos López", apoyoEstudiantil: "Niños en progreso" },
      { identificacion: "1004", nombre: "Ana Rodríguez", apoyoEstudiantil: "Los amantes al salchichon" },
      { identificacion: "1005", nombre: "Pedro Martínez", apoyoEstudiantil: "Matricula Cero" }
    ],
    materias: [
      { 
        nombre: "Metodologías", 
        notas: [
          { estudianteId: "1001", notas: [4.5, 3.8, 4.2] },
          { estudianteId: "1002", notas: [3.2, 4.0, 3.5] },
          { estudianteId: "1003", notas: [4.8, 4.5, 4.7] },
          { estudianteId: "1004", notas: [2.8, 3.0, 2.5] },
          { estudianteId: "1005", notas: [3.0, 2.8, 3.2] }
        ], 
        asistencias: [
          {
            fecha: "2024-01-15",
            asistencias: [
              { estudianteId: "1001", estudiante: "Juan Pérez", estado: "asiste" },
              { estudianteId: "1002", estudiante: "María García", estado: "asiste" },
              { estudianteId: "1003", estudiante: "Carlos López", estado: "no asiste" },
              { estudianteId: "1004", estudiante: "Ana Rodríguez", estado: "asiste" },
              { estudianteId: "1005", estudiante: "Pedro Martínez", estado: "no asiste" }
            ]
          },
          {
            fecha: "2024-01-22",
            asistencias: [
              { estudianteId: "1001", estudiante: "Juan Pérez", estado: "asiste" },
              { estudianteId: "1002", estudiante: "María García", estado: "no asiste" },
              { estudianteId: "1003", estudiante: "Carlos López", estado: "asiste" },
              { estudianteId: "1004", estudiante: "Ana Rodríguez", estado: "asiste" },
              { estudianteId: "1005", estudiante: "Pedro Martínez", estado: "asiste" }
            ]
          }
        ] 
      },
      { 
        nombre: "Backend1", 
        notas: [
          { estudianteId: "1001", notas: [3.8, 4.0, 4.2] },
          { estudianteId: "1002", notas: [4.5, 4.3, 4.7] },
          { estudianteId: "1003", notas: [3.5, 3.8, 4.0] },
          { estudianteId: "1004", notas: [2.5, 2.8, 3.0] },
          { estudianteId: "1005", notas: [3.2, 3.5, 3.8] }
        ], 
        asistencias: [] 
      },
      { 
        nombre: "Front1", 
        notas: [
          { estudianteId: "1001", notas: [4.0, 4.2, 4.5] },
          { estudianteId: "1002", notas: [3.8, 4.1, 4.3] },
          { estudianteId: "1003", notas: [4.5, 4.7, 4.8] },
          { estudianteId: "1004", notas: [2.9, 3.1, 3.3] },
          { estudianteId: "1005", notas: [3.4, 3.6, 3.8] }
        ], 
        asistencias: [] 
      }
    ]
  },
  {
    grupo: "Grupo B",
    estudiantes: [
      { identificacion: "2001", nombre: "Laura Martínez", apoyoEstudiantil: "Viejitos activos" },
      { identificacion: "2002", nombre: "Diego Hernández", apoyoEstudiantil: "Niños en progreso" },
      { identificacion: "2003", nombre: "Sofia Castro", apoyoEstudiantil: "Matricula Cero" },
      { identificacion: "2004", nombre: "Andrés Ramírez", apoyoEstudiantil: "Los amantes al salchichon" }
    ],
    materias: [
      { 
        nombre: "Metodologías", 
        notas: [
          { estudianteId: "2001", notas: [4.2, 4.0, 4.5] },
          { estudianteId: "2002", notas: [3.5, 3.8, 4.0] },
          { estudianteId: "2003", notas: [4.7, 4.5, 4.8] },
          { estudianteId: "2004", notas: [3.0, 3.2, 3.5] }
        ], 
        asistencias: [] 
      },
      { 
        nombre: "Backend1", 
        notas: [
          { estudianteId: "2001", notas: [4.0, 4.3, 4.5] },
          { estudianteId: "2002", notas: [3.8, 4.0, 4.2] },
          { estudianteId: "2003", notas: [4.6, 4.8, 4.9] },
          { estudianteId: "2004", notas: [3.2, 3.4, 3.6] }
        ], 
        asistencias: [] 
      },
      { 
        nombre: "Front1", 
        notas: [
          { estudianteId: "2001", notas: [4.1, 4.4, 4.6] },
          { estudianteId: "2002", notas: [3.9, 4.1, 4.3] },
          { estudianteId: "2003", notas: [4.7, 4.9, 5.0] },
          { estudianteId: "2004", notas: [3.3, 3.5, 3.7] }
        ], 
        asistencias: [] 
      }
    ]
  },
  {
    grupo: "Grupo C",
    estudiantes: [
      { identificacion: "3001", nombre: "Camila González", apoyoEstudiantil: "Niños en progreso" },
      { identificacion: "3002", nombre: "Javier López", apoyoEstudiantil: "Matricula Cero" },
      { identificacion: "3003", nombre: "Valentina Silva", apoyoEstudiantil: "Viejitos activos" },
      { identificacion: "3004", nombre: "Mateo Díaz", apoyoEstudiantil: "Los amantes al salchichon" },
      { identificacion: "3005", nombre: "Isabella Rojas", apoyoEstudiantil: "Matricula Cero" }
    ],
    materias: [
      { 
        nombre: "Metodologías", 
        notas: [
          { estudianteId: "3001", notas: [4.3, 4.5, 4.7] },
          { estudianteId: "3002", notas: [3.6, 3.9, 4.1] },
          { estudianteId: "3003", notas: [4.8, 4.9, 5.0] },
          { estudianteId: "3004", notas: [3.1, 3.3, 3.5] },
          { estudianteId: "3005", notas: [3.4, 3.6, 3.8] }
        ], 
        asistencias: [] 
      },
      { 
        nombre: "Backend1", 
        notas: [
          { estudianteId: "3001", notas: [4.2, 4.4, 4.6] },
          { estudianteId: "3002", notas: [3.7, 3.9, 4.1] },
          { estudianteId: "3003", notas: [4.7, 4.8, 4.9] },
          { estudianteId: "3004", notas: [3.0, 3.2, 3.4] },
          { estudianteId: "3005", notas: [3.5, 3.7, 3.9] }
        ], 
        asistencias: [] 
      },
      { 
        nombre: "Front1", 
        notas: [
          { estudianteId: "3001", notas: [4.4, 4.6, 4.8] },
          { estudianteId: "3002", notas: [3.8, 4.0, 4.2] },
          { estudianteId: "3003", notas: [4.9, 5.0, 5.0] },
          { estudianteId: "3004", notas: [3.2, 3.4, 3.6] },
          { estudianteId: "3005", notas: [3.6, 3.8, 4.0] }
        ], 
        asistencias: [] 
      }
    ]
  }
];

// Variables globales
let grupoActual = 0;
let materiaActual = 0;
let estudianteEditandoNotas = -1;
let fechaEditandoAsistencia = "";
let graficoActual = null;

// =======================
// INICIALIZACIÓN
// =======================
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM cargado - Inicializando sistema...");
  mostrarGrupos();
  configurarEventListeners();
});

function configurarEventListeners() {
  console.log("Configurando event listeners...");
  
  // Botones de módulos
  document.getElementById("btnEstudiantes").addEventListener("click", mostrarModuloEstudiantes);
  document.getElementById("btnNotas").addEventListener("click", mostrarModuloNotas);
  document.getElementById("btnAsistencias").addEventListener("click", mostrarModuloAsistencias);
  document.getElementById("btnReportes").addEventListener("click", mostrarModuloReportes);
}

// =======================
// FUNCIONES PRINCIPALES
// =======================
function promedioEstudiante(notas) {
  if (!notas || notas.length === 0) return 0;
  const notasValidas = notas.filter(nota => nota !== null && nota !== undefined && nota !== '');
  if (notasValidas.length === 0) return 0;
  const total = notasValidas.reduce((sum, nota) => sum + parseFloat(nota), 0);
  return (total / notasValidas.length).toFixed(1);
}

function promedioMateria(materia) {
  if (!materia.notas || materia.notas.length === 0) return 0;
  let total = 0;
  let count = 0;
  
  materia.notas.forEach(notaEstudiante => {
    if (notaEstudiante.notas && notaEstudiante.notas.length > 0) {
      const promedioEst = promedioEstudiante(notaEstudiante.notas);
      total += parseFloat(promedioEst);
      count++;
    }
  });
  
  return count > 0 ? (total / count).toFixed(1) : 0;
}

function mostrarGrupos() {
  const contenedor = document.getElementById("grupos");
  contenedor.innerHTML = "";
  data.forEach((g, index) => {
    const esSeleccionado = index === grupoActual;
    const claseBtn = esSeleccionado ? "grupo-seleccionado" : "grupo-no-seleccionado";
    contenedor.innerHTML += `
      <button class="btn btn-primary grupo-btn ${claseBtn}" onclick="seleccionarGrupo(${index})">
        ${g.grupo}
      </button>`;
  });
}

function seleccionarGrupo(indexGrupo) {
  console.log("Seleccionando grupo:", indexGrupo);
  grupoActual = indexGrupo;
  materiaActual = 0;
  mostrarGrupos();
  mostrarMaterias(indexGrupo);
  actualizarInfoSeleccion();
}

function mostrarMaterias(indexGrupo) {
  console.log("Mostrando materias para grupo:", indexGrupo);
  const contenedor = document.getElementById("materias");
  
  contenedor.innerHTML = "";
  
  data[indexGrupo].materias.forEach((m, idx) => {
    const promedio = promedioMateria(m);
    const esSeleccionada = idx === materiaActual;
    const claseCard = esSeleccionada ? "materia-seleccionada" : "materia-no-seleccionada";
    
    contenedor.innerHTML += `
      <div class="col-md-4">
        <div class="card materia-card ${claseCard}" onclick="seleccionarMateria(${indexGrupo}, ${idx})">
          <div class="card-body text-center">
            <h5 class="card-title">${m.nombre}</h5>
            <p class="card-text">Promedio: <strong>${promedio}</strong></p>
            <small class="text-muted">${m.notas ? m.notas.length : 0} estudiantes con notas</small>
          </div>
        </div>
      </div>`;
  });
}

function seleccionarMateria(indexGrupo, indexMateria) {
  console.log("Seleccionando materia:", indexGrupo, indexMateria);
  grupoActual = indexGrupo;
  materiaActual = indexMateria;
  
  mostrarMaterias(indexGrupo);
  mostrarModuloEstudiantes();
  actualizarInfoSeleccion();
}

function actualizarInfoSeleccion() {
  const seleccionInfo = document.getElementById("seleccionInfo");
  const infoGrupoMateria = document.getElementById("infoGrupoMateria");
  
  seleccionInfo.style.display = "block";
  infoGrupoMateria.innerHTML = `
    <i class="bi bi-check-circle-fill"></i> 
    Trabajando en: <strong>${data[grupoActual].grupo}</strong> - 
    Materia: <strong>${data[grupoActual].materias[materiaActual].nombre}</strong>
    <br><small class="opacity-75">Selecciona una sección para comenzar a trabajar</small>
  `;
}

// =======================
// GESTIÓN DE MÓDULOS
// =======================
function mostrarModuloEstudiantes() {
  console.log("Mostrando módulo Estudiantes");
  cargarModulo('modules/estudiantes.html', 'estudiantes');
}

function mostrarModuloNotas() {
  console.log("Mostrando módulo Notas");
  cargarModulo('modules/notas.html', 'notas');
}

function mostrarModuloAsistencias() {
  console.log("Mostrando módulo Asistencias");
  cargarModulo('modules/asistencias.html', 'asistencias');
}

function mostrarModuloReportes() {
  console.log("Mostrando módulo Reportes");
  cargarModulo('modules/reportes.html', 'reportes');
}

function cargarModulo(url, modulo) {
  fetch(url)
    .then(response => response.text())
    .then(html => {
      document.getElementById('moduloContainer').innerHTML = html;
      // Inicializar el módulo específico después de cargar el HTML
      switch(modulo) {
        case 'estudiantes':
          inicializarModuloEstudiantes();
          break;
        case 'notas':
          inicializarModuloNotas();
          break;
        case 'asistencias':
          inicializarModuloAsistencias();
          break;
        case 'reportes':
          inicializarModuloReportes();
          break;
      }
    })
    .catch(error => {
      console.error('Error cargando módulo:', error);
      document.getElementById('moduloContainer').innerHTML = `
        <div class="alert alert-danger">
          <h4>Error al cargar el módulo</h4>
          <p>No se pudo cargar el contenido solicitado.</p>
        </div>
      `;
    });
}