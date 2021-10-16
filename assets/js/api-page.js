//@ts-check

/**
 * @typedef {Object} Entity
 * @property {string} title Заголовок
 * @property {string} lastUpdateTime Время последнего обновления в ISO8601
 * @property {string} url Ссылка на ресурс
 * @property {string} contentType Тип контента ("class", "function")
 * @property {string} directory Директория где лежит сущность ("index", "operators")
 */

const { of, combineLatest, fromEvent } = rxjs
const { startWith, map, tap } = rxjs.operators

const { el, setChildren } = redom

class EntityTableRow {
  /**
   * @param {Entity} item
   */
  constructor(item) {
    /**
     * @type {HTMLElement}
     */
    this.el = el("tr")
    this.el.dataset.apiItemInfo = JSON.stringify(item)
    
    const titleTd = el("td", el("a", item.title, { href: item.url }))
    const contentTypeTd = el("td", item.contentType)
  
    setChildren(this.el, [
      titleTd,
      contentTypeTd
    ])
  }
}

document.addEventListener("DOMContentLoaded", () => {
  /** @type {HTMLSelectElement} */
  const contentTypeElementRef = document.querySelector("select#type")
  
  /** @type {HTMLSelectElement} */
  const sortTypeElementRef = document.querySelector("select#sort")
  
  /** @type {HTMLInputElement} */
  const filterInputElementRef = document.querySelector("input#filter")
  
  const contentElementRefs = document.querySelectorAll("[data-api-item-info]")
  
  /**
   * @type {Entity[]}
   */
  const contentData = Array.from(contentElementRefs)
    .map((elementRef) => JSON.parse(elementRef.dataset.apiItemInfo))
  
  const indexPackageContainerRef = document.getElementById("index-package")
  const operatorsPackageContainerRef = document.getElementById("operators-package")
  
  const filteredContentData = combineLatest([
    fromEvent(contentTypeElementRef, "change").pipe(
      map(e => e.target.value),
      startWith(contentTypeElementRef.value)
    ),
    fromEvent(sortTypeElementRef, "change").pipe(
      map(e => e.target.value),
      startWith(sortTypeElementRef.value)
    ),
    fromEvent(filterInputElementRef, "input").pipe(
      map(e => e.target.value),
      startWith(filterInputElementRef.value)
    )
  ]).pipe(
    map(([ contentType, sortType, filterValue ]) => {
      return contentData.filter((data) => {
        return (contentType === 'all' || data.contentType === contentType) && data.title.includes(filterValue)
      })
    })
  )
  
  const indexPackage = filteredContentData.pipe(
    map((contentData) => contentData.filter(c => c.directory === 'index')),
    tap((contentData) => {
      contentData.forEach((item) => {
        const tr = new EntityTableRow(item)
        setChildren(indexPackageContainerRef, tr)
      })
    })
  )
  
  indexPackage.subscribe()
  
  const operatorsPackage = filteredContentData.pipe(
    map((contentData) => contentData.filter(c => c.directory === 'operators'))
  )
  
  // operatorsPackage.subscribe(console.log)
})
