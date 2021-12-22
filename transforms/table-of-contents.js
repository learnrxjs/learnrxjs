/**
 * Получает уровень заголовка
 *
 * @param {HTMLHeadingElement} headerRef Ссылка на узел заголовка
 * @return {number}
 */
function takeHeaderLevel(headerRef) {
  return parseInt(headerRef.tagName[ 1 ])
}

module.exports = /** @param {Window} window */ (window) => {
  const tocContainerRef = window.document.querySelector(".toc-instance")
  
  if (tocContainerRef === null) {
    return
  }
  
  /** @type Array<HTMLElement> */
  const headers = Array.from(window.document
    .querySelector(".main")
    .querySelectorAll("h2, h3, h4, h5, h6"))
  
  const listItems = headers.map((header) => {
    const id = header.getAttribute("id")
    const content = header.childNodes.item(0).textContent
    return `<li class="toc-list-item" style="--header-level: ${ takeHeaderLevel(header) - 2 }">
      <a class="toc-link" href="#${ id }">${ content }</a>
    </li>`
  })
  
  const resultUnmarkeredList = `<ul class="toc-list">${ listItems.join("") }</ul>`
  
  tocContainerRef.innerHTML = resultUnmarkeredList
}
