document.addEventListener("DOMContentLoaded", () => {
  const open = document.getElementById("menu-toggle");
  const close = document.getElementById("menu-close");
  const body = document.body;

  open && open.addEventListener("click", () => body.classList.add("menu-open"));
  close && close.addEventListener("click", () => body.classList.remove("menu-open"));
});
