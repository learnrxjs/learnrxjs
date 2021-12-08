const searchInputRef = document.getElementById("search-input")

document.addEventListener("keyup", (event) => {
  if (event.code === "Slash") {
    searchInputRef.focus()
  }
})
