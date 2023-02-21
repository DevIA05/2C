var container = document.getElementById("container")
var btn = document.getElementById("open-modal-btn")
var modal = document.getElementById("my-modal")
var modalClose = document.getElementById("modalClose")

btn.addEventListener("click", () => {
  // modal.style.display = "block"
  container.classList.toggle("modalOpened")
})

modalClose.addEventListener("click", () => {
  // modal.style.display = "none"
  container.classList.toggle("modalOpened")
})