// Refer
// https://zhuanlan.zhihu.com/p/76969308
//

const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')

function stepOne(filename) {
  const content = fs.readFileSync(filename, 'utf-8')
  const ast = parser.parse(content, {
    sourceType: 'module'
  })
  const dependencies = {}

  traverse(ast, {
    ImportDeclaration({ node }) {
      const dirname = path.dirname(filename)
      const newFile = './' + path.join(dirname, node.source.value)
      dependencies[node.source.value] = newFile
    }
  })

  const { code } = babel.transformFromAst(ast, null, {
    presets: ["@babel/preset-env"]
  })

  return {
    filename,
    dependencies,
    code,
  }
}

function stepTwo(entry) {
  const entryModule = stepOne(entry)
  const graphArray = [entryModule]

  for (let i = 0; i < graphArray.length; i++) {
    const item = graphArray[i];
    const { dependencies } = item
    for (let j in dependencies) {
      graphArray.push(stepOne(dependencies[j]))
    }
  }

  const graph = {}
  graphArray.forEach(item => {
    graph[item.filename] = {
      dependencies: item.dependencies,
      code: item.code
    }
  })
  return graph
}

function step3(entry) {
  const graph = JSON.stringify(stepTwo(entry))
  return `
        (function(graph) {
            function require(module) {
                function localRequire(relativePath) {
                    return require(graph[module].dependencies[relativePath]);
                }
                var exports = {};
                (function(require, exports, code) {
                    eval(code);
                })(localRequire, exports, graph[module].code);
                return exports;
            }
            require('${entry}')
        })(${graph})`
}

const code = step3('./src/index.js')
console.log(code)
