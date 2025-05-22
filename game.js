// Lógica base del juego
console.log('Juego iniciado');
const jugador = localStorage.getItem("playerName") || "Jugador";
document.getElementById("mesa").innerHTML = `Jugador: ${jugador}`;