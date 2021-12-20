const { slugify } = require("transliteration")

module.exports = /** @param {Window} window */ (window) => {
  const content = window.document.querySelector(".main")
  
  if (content === null) {
    return
  }
  
  const headers = content.querySelectorAll("h2, h3, h4, h5, h6")
  
  const headerCounts = new Map()
  
  for (const headerRef of headers) {
    /** @type {HTMLElement} */
    const clonedHeaderRef = headerRef.cloneNode(true)
    
    const headerText = clonedHeaderRef.textContent.trim()
    const id = slugify(headerText)
    
    if (headerCounts.has(id)) {
      headerCounts.set(headerCounts.get(id) + 1)
    } else {
      headerCounts.set(id, 1)
    }
    
    const headerPostfix = headerCounts.get(id) > 1
      ? `-${ headerCounts.get(id) }`
      : ''
    
    const resultId = id + headerPostfix
    
    clonedHeaderRef.setAttribute("id", resultId)
    clonedHeaderRef.setAttribute("tabindex", -1)
    clonedHeaderRef.innerHTML = `${ clonedHeaderRef.innerHTML } <a href="#${ resultId }" class="article-header-link">#</a>`
    
    headerRef.replaceWith(clonedHeaderRef)
  }
}
