const { AsyncSeriesHook } = require('tapable') // 此处我们创建了一些异步钩子

class Compiler {
  constructor(config, _callback) {
    const {
      entry,
      output,
      module,
      plugins
    } = config

    this.entryPath = entry
    // 输出文件路径
    this.distPath = output.path
    // 输出文件名称
    this.distName = output.fileName
    // 需要使用的loader
    this.loaders = module.rules
    // 需要挂载的plugin
    this.plugins = plugins
    // 根目录
    this.root = process.cwd()
    // 编译工具类Compilation
    this.compilation = {}
    // 入口文件在module中的相对路径，也是这个模块的id
    this.entryId = getRootPath(this.root, entry, this.root)

    this.hooks = {
      // 生命周期事件
      beforeRun: new AsyncSeriesHook(['compiler']), // compiler代表我们将向回调事件中传入一个compiler参数
      afterRun: new AsyncSeriesHook(['compiler']),
      beforeCompile: new AsyncSeriesHook(['compiler']),
      afterCompile: new AsyncSeriesHook(['compiler']),
      emit: new AsyncSeriesHook(['compiler']),
      failed: new AsyncSeriesHook(['compiler']),
    }

    this.mountPlugin()
  }

  // 注册所有的plugin
  mountPlugin() {
    for(let i=0;i<this.plugins.length;i++) {
      const item = this.plugins[i]
      if ('apply' in item && typeof item.apply === 'function') {
        // 注册各生命周期钩子的发布订阅监听事件
        item.apply(this)
      }
    }
  }

  // 当运行run方法的逻辑之前
  run() {
    // 在特定的生命周期发布消息，触发对应的订阅事件
    this.hooks.beforeRun.callAsync(this) // this作为参数传入，对应之前的compiler
  }
}

