class FileListPlugin {
  apply(compiler) {
    const { Compilation, sources } = compiler.webpack;
    compiler.hooks.thisCompilation.tap('FileListPlugin', (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: 'FileListPlugin',
          stage: Compilation.PROCESS_ASSETS_STAGE_REPORT,
        },
        (assets) => {
          const names = Object.keys(assets).sort();
          compilation.emitAsset(
            'FILELIST.md',
            new sources.RawSource(
              '# Emitted files\n\n' +
                names.map((name) => '- ' + name).join('\n') +
                '\n',
            ),
          );
        },
      );
    });
  }
}
module.exports = FileListPlugin;
