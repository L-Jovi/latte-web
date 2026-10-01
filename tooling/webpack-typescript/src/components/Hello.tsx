import * as React from 'react';

export interface HelloProps {
  compiler: string;
  framework: string;
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Hello extends React.Component<HelloProps, {}> {
  // The page shows one language at a time (assets/language.js), so the
  // heading is drawn again when the reader switches the language.
  componentDidMount() {
    document.addEventListener('languagechange', () => this.forceUpdate());
  }
  render() {
    if (document.documentElement.dataset.language === 'zh')
      return (
        <h1>
          渲染组件，来自 {this.props.compiler} 和 {this.props.framework}
        </h1>
      );
    return (
      <h1>
        Render component from {this.props.compiler} and {this.props.framework}
      </h1>
    );
  }
}
