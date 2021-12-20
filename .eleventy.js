const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")
const linkedom = require("linkedom")

const headerLinkTransformer = require("./transforms/header-link")
const tableOfContentsTransformer = require("./transforms/table-of-contents")

/** @param {UserConfig} controller */
module.exports = (controller) => {
  controller.addPlugin(syntaxHighlight)
  
  controller.addPassthroughCopy("assets")
  
  controller.addPassthroughCopy("src/**/*.(html|gif|jpg|jpeg|png|webp|svg|mp4|webm|zip)")
  
  controller.setDataDeepMerge(true)
  
  controller.addCollection("entities", /** @param {TemplateCollection} collectionApi */(collectionApi) => {
    return collectionApi.getFilteredByGlob("src/api/**/*.md")
  })
  
  const transforms = [
    headerLinkTransformer,
    tableOfContentsTransformer
  ]
  
  controller.addTransform('html-transforms', async (content, outputPath) => {
    if (outputPath && outputPath.endsWith('.html')) {
      const window = linkedom.parseHTML(content)
      
      for (const transform of transforms) {
        await transform(window, content, outputPath)
      }
      
      return window.document.toString()
    }
    
    return content
  })
  
  return {
    dir: {
      input: "src",
      output: "dist",
      dataTemplateEngine: "njk"
    },
    templateFormats: [ "md", "njk", "html", "liquid" ],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  }
}
