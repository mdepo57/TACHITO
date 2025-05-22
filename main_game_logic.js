const palos = ["oros", "copas", "espadas", "bastos"];
const valores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
function crearMazo() {
  const mazo = [];
  for (let palo of palos) {
    for (let valor of valores) {
      mazo.push({ valor, palo });
    }
  }
  return mezclar(mazo);
}
function mezclar(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
let jugadores = [];
let mazo = [];
let turnoActual = 0;
let repartidorIndex = 0;
function iniciarPartida(nombres, dificultadBots) {
  jugadores = nombres.map((nombre, i) => ({
    nombre,
    carta: null,
    vidas: 3,
    bot: nombre.startsWith("Bot"),
    dificultad: dificultadBots[i] || "facil"
  }));
  mazo = crearMazo();
  repartidorIndex = Math.floor(Math.random() * jugadores.length);
  turnoActual = (repartidorIndex + 1) % jugadores.length;
  repartirCartas();
}
function repartirCartas() {
  mazo = crearMazo();
  for (let jugador of jugadores) {
    jugador.carta = mazo.pop();
  }
}
function siguienteTurno() {
  if (jugadores[turnoActual].bot) {
    decidirAccionBot(jugadores[turnoActual]);
  }
}
function decidirAccionBot(bot) {
  if (bot.dificultad === "facil") {
    const decision = Math.random() < 0.5 ? "plantarse" : "intercambiar";
    if (decision === "intercambiar" && bot.carta.valor !== 12) {
      bot.carta = mazo.pop();
    }
  } else if (bot.dificultad === "intermedio") {
    if (bot.carta.valor < 6 && mazo.length > 0) {
      bot.carta = mazo.pop();
    }
  }
  avanzarTurno();
}
function avanzarTurno() {
  turnoActual = (turnoActual + 1) % jugadores.length;
  if (turnoActual === repartidorIndex) {
    finalizarRonda();
  } else {
    siguienteTurno();
  }
}
function finalizarRonda() {
  const vivos = jugadores.filter(j => j.vidas > 0);
  const cartas = vivos.map(j => ({ nombre: j.nombre, valor: j.carta.valor }));
  const min = Math.min(...cartas.map(c => c.valor));
  const perdedores = cartas.filter(c => c.valor === min);
  if (perdedores.length === 1) {
    const perdedor = jugadores.find(j => j.nombre === perdedores[0].nombre);
    perdedor.vidas--;
  }
  repartirCartas();
  repartidorIndex = (repartidorIndex + 1) % jugadores.length;
  turnoActual = (repartidorIndex + 1) % jugadores.length;
  siguienteTurno();
}