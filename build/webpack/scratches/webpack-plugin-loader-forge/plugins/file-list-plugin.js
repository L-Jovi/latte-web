/**
 * MyPlugin
 * https://zhuanlan.zhihu.com/p/102917655
 */
class FileListPlugin {
  constructor(options) {
    this.filename = options && options.filename ? options.filename : 'FILELIST.md'
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('FileListPlugin', (compilation, cb) => {
      const len = Object.keys(compilation.assets).length

      let content = `# ${len} file${len > 1 ? 's' : ''} emitted by webpack\n\n`

      for (let filename in compilation.assets) {
        content += `- ${filename}\n`;
      }

      compilation.assets[this.filename] = {
        source() {
          return content
        },

        size() {
          return content.length
        }
      }

      cb()
    })

    compiler.hooks.done.tap('FileListPlugin', (stats) => {
      console.log('finished :)')
    })
  }
}

module.exports = FileListPlugin
