const nombres = JSON.parse(localStorage.getItem("nombres"));
const dificultades = JSON.parse(localStorage.getItem("dificultades"));
iniciarPartida(nombres, dificultades);
document.getElementById("hud").innerText = "Turno actual: " + nombres[turnoActual];