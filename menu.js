function iniciarJuego() {
  const nombre = document.getElementById("nombreHumano").value || "Jugador";
  const cantidadBots = parseInt(document.getElementById("cantidadBots").value);
  const dificultad = document.getElementById("dificultad").value;
  const nombres = [nombre];
  const dificultades = ["humano"];

  for (let i = 1; i <= cantidadBots; i++) {
    nombres.push("Bot " + i);
    dificultades.push(dificultad);
  }
  localStorage.setItem("nombres", JSON.stringify(nombres));
  localStorage.setItem("dificultades", JSON.stringify(dificultades));
  window.location.href = "game.html";
}