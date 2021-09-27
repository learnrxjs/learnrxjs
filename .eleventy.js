const markdownIt = require("markdown-it")
const markdownItTitleAnchor = require("markdown-it-anchor")
const markdownItToc = require("markdown-it-table-of-contents")
const markdownItAttrs = require("markdown-it-attrs")
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")
const toml = require("toml")


/**
 * @param {UserConfig} config Конфигурация
 */
function eleventy(config) {
  config.addDataExtension("toml", (content) => toml.parse(content))
  
  config.setDataDeepMerge(true)
  config.addPassthroughCopy("assets")
  config.addPassthroughCopy("src/**/*.(html|gif|jpg|jpeg|png|webp|svg|mp4|webm|zip)")
  
  config.addPlugin(syntaxHighlight)
  config.setFrontMatterParsingOptions({
    engines: {
      toml: (content) => toml.parse(content)
    },
    language: "toml"
  })
  
  config.addCollection("tags", /** @param {TemplateCollection} collectionApi */(collectionApi) => {
    const tags = []
    
    for (const item of collectionApi.getAll()) {
      if (!("tags" in item.data)) {
        continue
      }
      
      for (const tagName of item.data.tags) {
        const tag = tags.find((tag) => tag.name === tagName)
        
        if (typeof tag !== "undefined") {
          tag.articleCount = tag.articleCount + 1
          continue
        }
        
        tags.push({
          name: tagName,
          articleCount: 1
        })
      }
    }
    
    return tags
  })
  
  const markdownParser = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true
  })
    .use(markdownItAttrs)
    .use(markdownItToc, {
      includeLevel: [ 2, 3, 4, 5, 6 ],
      listType: "ol",
      containerHeaderHtml: `<h2>Содержание</h2>`,
      containerClass: `article-table-of-content`
    })
    .use(markdownItTitleAnchor, {
      permalink: true,
      permalinkClass: "title-anchor",
      permalinkSymbol: "⌗"
    })
  
  config.setLibrary("md", markdownParser)
  
  return {
    dir: {
      input: "src",
      output: "dist",
      dataTemplateEngine: "njk"
    },
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
    ],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  }
}

module.exports = eleventy
