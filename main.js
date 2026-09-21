// Pantalla 1 -> Pantalla 2
var audio = document.getElementById("musica");
var boton = document.getElementById("abrir");
var intro = document.getElementById("intro");

// El jardín (girasoles + hojas) se construye desde el inicio, pero queda
// oculto hasta que se abre el regalo.
buildGarden(document.getElementById("garden"));

boton.addEventListener("click", function () {
  // La reproducción está permitida porque viene de un clic del usuario.
  audio.currentTime = 0;
  audio.play().catch(function () {
    /* si falta el mp3 o el navegador lo bloquea, la animación sigue igual */
  });

  document.body.classList.remove("is-intro");
  document.body.classList.add("is-open");
  boton.disabled = true;

  // Al terminar de desvanecerse, la pantalla inicial deja de estorbar.
  setTimeout(function () {
    intro.style.display = "none";
  }, 900);
});
