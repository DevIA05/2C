var container = document.getElementById("container")
var btn = document.getElementById("open-modal-btn")
var modal = document.getElementById("my-modal")
var modalClose = document.getElementById("modalClose")

btn.addEventListener("click", () => {
  container.classList.toggle("modalOpened")
})

modalClose.addEventListener("click", () => {
  container.classList.toggle("modalOpened")
})