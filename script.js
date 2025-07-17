document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");
  const estado = JSON.parse(localStorage.getItem("estadoRamos") || "{}");

  function actualizarEstado() {
    ramos.forEach(ramo => {
      const id = ramo.dataset.id;
      const prereq = ramo.dataset.prerq.split(",").filter(Boolean);
      const aprobado = estado[id];

      if (prereq.length > 0 && !prereq.every(pr => estado[pr])) {
        ramo.classList.add("bloqueado");
        ramo.classList.remove("aprobado");
      } else {
        ramo.classList.remove("bloqueado");
        if (aprobado) ramo.classList.add("aprobado");
        else ramo.classList.remove("aprobado");
      }
    });
  }

  ramos.forEach(ramo => {
    ramo.addEventListener("click", () => {
      const id = ramo.dataset.id;
      estado[id] = !estado[id];
      localStorage.setItem("estadoRamos", JSON.stringify(estado));
      actualizarEstado();
    });
  });

  actualizarEstado();
});
