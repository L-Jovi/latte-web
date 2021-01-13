// https://aotu.io/notes/2020/07/17/webpack-analize/index.html

const Compiler = require('./compiler')

function webpack(config, callback) {
  // 此处应有参数校验
  const compiler = new Compiler(config)
  // 开始编译
  compiler.run()
}

module.exports = webpack
