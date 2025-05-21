let vidasJugador = 3;
let vidasBot = 3;
let cartaJugador, cartaBot;

function generarCarta() {
  return Math.floor(Math.random() * 10) + 1;
}

function actualizarMesa() {
  const mesa = document.getElementById("mesa");
  mesa.innerHTML = `
    <div class="carta">🧍 ${cartaJugador}</div>
    <div class="carta">🤖 ${cartaBot}</div>
  `;
}

function perderVida(jugador) {
  if (jugador === "jugador") {
    vidasJugador--;
    document.getElementById("vidasJugador").textContent = vidasJugador;
  } else {
    vidasBot--;
    document.getElementById("vidasBot").textContent = vidasBot;
  }
  if (vidasJugador === 0 || vidasBot === 0) {
    alert(`🎉 ${vidasJugador === 0 ? '¡Bot gana!' : '¡Tú ganas!'}`);
    location.reload();
  }
}

function turnoJuego(intercambiaJugador) {
  if (intercambiaJugador) cartaJugador = generarCarta();
  cartaBot = Math.random() > 0.5 ? generarCarta() : cartaBot;
  actualizarMesa();
  if (cartaJugador < cartaBot) perderVida("jugador");
  else if (cartaBot < cartaJugador) perderVida("bot");
}

cartaJugador = generarCarta();
cartaBot = generarCarta();
actualizarMesa();

document.getElementById("btnIntercambiar").onclick = () => turnoJuego(true);
document.getElementById("btnPlantarse").onclick = () => turnoJuego(false);

document.getElementById("inputMensaje").addEventListener("keypress", function (e) {
  if (e.key === "Enter" && this.value.trim() !== "") {
    const nuevoMensaje = document.createElement("li");
    nuevoMensaje.textContent = `🗨️ ${this.value}`;
    document.getElementById("mensajes").appendChild(nuevoMensaje);
    this.value = "";
  }
});