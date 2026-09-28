const webpack = require('webpack');
const topics = [
  'getting-started',
  'asset-management',
  'output-management',
  'development',
  'hot-module-replacement',
  'lazy-loading',
  'code-splitting',
  'caching',
  'production',
  'tree-shaking',
  'shimming',
  'plugins',
  'library',
];
async function build() {
  for (const topic of topics) {
    await new Promise((resolve, reject) => {
      const compiler = webpack(require('./' + topic + '/webpack.config.cjs'));
      compiler.run((error, stats) =>
        compiler.close((closeError) =>
          error || closeError || stats.hasErrors()
            ? reject(
                error ||
                  closeError ||
                  new Error(stats.toString({ all: false, errors: true })),
              )
            : resolve(),
        ),
      );
    });
    console.log('Built ' + topic);
  }
}
build().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
