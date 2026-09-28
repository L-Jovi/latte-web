# Third-party notices and license boundaries

The root MIT license covers Jovi's original code and the new explanatory material.
It does not replace existing directory licenses or grant rights to third-party assets.
References to articles identify learning sources, not a claim of their authorship.

- `mechanisms/generator/regenerator-runtime.js`: regenerator-runtime, Copyright
  2014-present Facebook, Inc., MIT. Its original inline notice is retained;
  [upstream license](https://github.com/facebook/regenerator/blob/main/LICENSE).
- `mechanisms/utilities/debounce/lodash-debounce.js`: adapted from Lodash,
  Copyright JS Foundation and other contributors, MIT;
  [upstream license](https://github.com/lodash/lodash/blob/main/LICENSE).
- Existing GPL-2.0 license texts remain in the Less and affected visual example
  directories. Their local terms continue to apply during migration.
- The GraphQL React/Apollo tutorial carries Graphcool's MIT attribution. It will
  remain with its derived example rather than being replaced with Jovi's name.
- Legacy packages may declare ISC or MIT. Directory-specific declarations take
  precedence over the root default.

The migration ledger identifies removed assets and references the original commit.
Generated dependencies remain under their own licenses in node_modules and are not
redistributed as repository source. Historical source is never relabelled as original.
