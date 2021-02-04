const Compiler = require("./compiler");
const options = require("../webpack.config");

new Compiler(options).run();
