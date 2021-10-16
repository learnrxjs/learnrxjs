const markdownIt = require("markdown-it")
const markdownItTitleAnchor = require("markdown-it-anchor")
const markdownItAttrs = require("markdown-it-attrs")
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")
const pluginTOC = require('eleventy-plugin-toc')
const markdownItContainer = require('markdown-it-container')
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
  config.addPlugin(pluginTOC, {
    ul: true,
    wrapperClass: "table-of-contents"
  })
  
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
  
  config.addCollection("api", /** @param {TemplateCollection} collectionApi */(collectionApi) => {
    return collectionApi.getFilteredByGlob("src/api/**/*.md")
  })
  
  config.addCollection("apiIndex", /** @param {TemplateCollection} collectionApi */(collectionApi) => {
    return collectionApi.getFilteredByGlob("src/api/index/**/*.md")
  })
  
  config.addCollection("apiOperators", /** @param {TemplateCollection} collectionApi */(collectionApi) => {
    return collectionApi.getFilteredByGlob("src/api/operators/**/*.md")
  })
  
  const markdownParser = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true
  })
    .use(markdownItAttrs)
    .use(markdownItTitleAnchor, {
      permalink: true,
      permalinkClass: "title-anchor",
      permalinkSymbol: "#"
    })
    .use(markdownItContainer, 'spoiler', {
      validate: function (params) {
        return params.trim().match(/^spoiler\s+(.*)$/);
      },
    
      render: function (tokens, idx) {
        var m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/);
      
        if (tokens[idx].nesting === 1) {
          // opening tag
          return '<details><summary>' + markdownParser.utils.escapeHtml(m[1]) + '</summary>\n';
        
        } else {
          // closing tag
          return '</details>\n';
        }
      },
    
      marker: '&'
    })
    .use(markdownItContainer, 'alert', {
      validate: function (params) {
        return params.trim().match(/^alert\s+(.*)$/);
      },
    
      render: function (tokens, idx) {
        const m = tokens[idx].info.trim().match(/^alert\s+(.*)$/);
      
        if (tokens[idx].nesting === 1) {
          return `<section class="alert ${markdownParser.utils.escapeHtml(m[1])}">\n`;
        } else {
          return `</section>\n`;
        }
      },
    
      marker: ':'
    })
  
  config.setLibrary("md", markdownParser)
  
  config.addNunjucksFilter("formatDate", (date) => {
    return date.toLocaleString("ru", {
      hour12: false,
      year: "numeric",
      day: "2-digit",
      month: "short"
    })
  })
  
  config.addNunjucksFilter("toJSON", (object) => {
    return JSON.stringify(object)
  })
  
  config.addNunjucksFilter("prepareApiItemForJSON", (apiItem) => {
    const apiItemData = apiItem.data
    
    const resultData = {
      title: apiItemData.title,
      lastUpdateTime: apiItemData.page.date,
      url: apiItemData.page.url,
      contentType: apiItemData.contentType,
      directory: apiItemData.directory
    }
    
    return JSON.stringify(resultData)
  })
  
  config.addNunjucksFilter("formatDateISO", (date) => {
    return date.toISOString()
  })
  
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
