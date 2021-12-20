module.exports = /** @param {Window} window */ (window) => {
  const tocContainerRef = window.document.querySelector(".table-of-content-container")
  
  if (tocContainerRef === null) {
    return
  }
  
  const headers = Array.from(window.document.querySelectorAll("h2, h3, h4, h5, h6"))
  
}
