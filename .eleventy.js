/** @param {UserConfig} controller */
module.exports = (controller) => {
  controller.addPassthroughCopy("assets")
  controller.addPassthroughCopy("vendor")
  
  controller.addPassthroughCopy("src/**/*.(html|gif|jpg|jpeg|png|webp|svg|mp4|webm|zip)")
  
  controller.setDataDeepMerge(true)
  
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
