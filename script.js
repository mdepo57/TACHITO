
// Juego TACHITO con minijuego de desempate
const palos = ['oros', 'copas', 'espadas', 'bastos'];
const iconos = {
  oros: '💰',
  copas: '🍷',
  espadas: '⚔️',
  bastos: '🌿'
};

let jugadores = [], turno = 0, mazo = [], repartidor = 0;
let empateActual = [], elecciones = {};

function crearMazo() {
  const nuevoMazo = [];
  palos.forEach(palo => {
    for (let i = 1; i <= 12; i++) {
      nuevoMazo.push({ valor: i, palo });
    }
  });
  return nuevoMazo.sort(() => Math.random() - 0.5);
}

// Otras funciones del juego (inicio, turnos, intercambio, etc.)
// Lógica de minijuego de desempate
function lanzarMiniJuego(empate) {
  empateActual = empate;
  elecciones = {};
  document.getElementById("minijuego").style.display = "block";
  const contenedor = document.getElementById("minijugadores");
  contenedor.innerHTML = "";
  empate.forEach(j => {
    const div = document.createElement("div");
    div.innerHTML = \`\${j.nombre}: <button onclick="elegir('piedra','\${j.nombre}')">✊</button> <button onclick="elegir('papel','\${j.nombre}')">✋</button> <button onclick="elegir('tijera','\${j.nombre}')">✌️</button>\`;
    contenedor.appendChild(div);
    if (j.bot) elecciones[j.nombre] = ['piedra', 'papel', 'tijera'][Math.floor(Math.random()*3)];
  });
}

function elegir(opcion, nombre) {
  elecciones[nombre] = opcion;
  const restantes = empateActual.filter(j => !elecciones[j.nombre]);
  if (restantes.length === 0) evaluarMinijuego();
}

function evaluarMinijuego() {
  const pierdeContra = (a, b) =>
    (a === 'piedra' && b === 'papel') ||
    (a === 'papel' && b === 'tijera') ||
    (a === 'tijera' && b === 'piedra');

  let perdedor;
  for (let i = 0; i < empateActual.length; i++) {
    const a = elecciones[empateActual[i].nombre];
    let pierdeTodos = true;
    for (let j = 0; j < empateActual.length; j++) {
      if (i !== j) {
        const b = elecciones[empateActual[j].nombre];
        if (!pierdeContra(a, b)) {
          pierdeTodos = false;
          break;
        }
      }
    }
    if (pierdeTodos) {
      perdedor = empateActual[i];
      break;
    }
  }

  document.getElementById("minijuego").style.display = "none";

  if (perdedor) {
    alert(`💀 ${perdedor.nombre} pierde el desempate`);
    perdedor.vidas--;
  } else {
    alert("⚔️ Empate de nuevo. Reintentando...");
    setTimeout(() => lanzarMiniJuego(empateActual), 1000);
  }
}
