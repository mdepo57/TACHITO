
const palos = ['oros','copas','espadas','bastos'];
const iconos = { oros:'💰', copas:'🍷', espadas:'⚔️', bastos:'🌿' };
let jugadores = [], turno = 0, mazo = [], repartidor = 0;
function generarCamposJugadores() {
  const cantidad = parseInt(document.getElementById("numHumanos").value);
  const contenedor = document.getElementById("camposJugadores");
  contenedor.innerHTML = "";
  for (let i = 1; i <= cantidad; i++) {
    let input = document.createElement("input");
    input.placeholder = `Jugador ${i}`; input.id = `jugador${i}`;
    contenedor.appendChild(input);
  }
}
function crearMazo() {
  let m = []; palos.forEach(p => { for(let i=1;i<=12;i++)m.push({valor:i,palo:p}) });
  return m.sort(()=>Math.random()-0.5);
}
function iniciarJuego() {
  const cantidad = parseInt(document.getElementById("numHumanos").value);
  jugadores = [];
  for (let i = 1; i <= cantidad; i++) {
    let nombre = document.getElementById(`jugador${i}`).value || `Jugador ${i}`;
    jugadores.push({ nombre, vidas: 3, bot: false });
  }
  jugadores.push({ nombre: "Bot 1", vidas: 3, bot: true });
  repartidor = Math.floor(Math.random() * jugadores.length);
  mazo = crearMazo();
  document.getElementById("pantallaInicio").style.display = "none";
  document.getElementById("pantallaJuego").style.display = "block";
  siguienteRonda();
}
function siguienteRonda() {
  jugadores.forEach(j => j.carta = mazo.pop());
  turno = (repartidor + 1) % jugadores.length;
  actualizarMesa();
}
function actualizarMesa() {
  let mesa = document.getElementById("mesa");
  mesa.innerHTML = "";
  jugadores.forEach((j,i) => {
    let d = document.createElement("div");
    d.className = "jugador-carta" + (i===repartidor?" repartidor":"") + (i===turno?" en-turno":"");
    d.innerHTML = `${iconos[j.carta.palo]}<br>${j.carta.valor}<br>${j.nombre} ❤️${j.vidas}`;
    mesa.appendChild(d);
  });
}
function intercambiarCarta() { avanzarTurno(); }
function plantarse() { avanzarTurno(); }
function avanzarTurno() {
  turno = (turno + 1) % jugadores.length;
  if (turno === (repartidor + 1) % jugadores.length) return;
  actualizarMesa();
}
function enviarMensaje() {
  const input = document.getElementById("chatInput");
  if (input.value.trim()) {
    let div = document.createElement("div");
    div.textContent = `💬 ${input.value}`; document.getElementById("chatMensajes").appendChild(div);
    input.value = "";
  }
}
