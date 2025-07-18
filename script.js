document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");
  const estado = JSON.parse(localStorage.getItem("estadoRamos") || "{}");

  function actualizarEstado() {
    ramos.forEach(ramo => {
      const id = ramo.dataset.id;
      const prereq = ramo.dataset.prerq.split(",").filter(Boolean);
      const aprobado = !!estado[id];

      // Primero quitamos todo
      ramo.classList.remove("aprobado", "bloqueado");

      // Si tiene prerrequisitos y no se cumplen todos, se bloquea
      if (prereq.length > 0 && !prereq.every(pr => estado[pr])) {
        ramo.classList.add("bloqueado");
      }

      // Si está aprobado y no está bloqueado, se marca como aprobado
      if (aprobado && !ramo.classList.contains("bloqueado")) {
        ramo.classList.add("aprobado");
      }
    });
  }

  ramos.forEach(ramo => {
    ramo.addEventListener("click", () => {
      const id = ramo.dataset.id;

      if (ramo.classList.contains("bloqueado")) return;

      estado[id] = !estado[id];
      localStorage.setItem("estadoRamos", JSON.stringify(estado));
      actualizarEstado();
    });
  });

  actualizarEstado();
});
document.getElementById("resetBtn").addEventListener("click", () => {
  localStorage.removeItem("estadoRamos");
  location.reload(); // recarga la página para reflejar el cambio
});
