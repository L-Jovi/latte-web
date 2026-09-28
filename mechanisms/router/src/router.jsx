import React from 'react';
const Context = React.createContext(null);
const path = () =>
  window.location.pathname.replace(/\/index\.html$/, '').replace(/\/$/, '');
export class BrowserRouter extends React.Component {
  state = { currentPath: path() };
  onChangeView = () => this.setState({ currentPath: path() });
  componentDidMount() {
    window.addEventListener('popstate', this.onChangeView);
  }
  componentWillUnmount() {
    window.removeEventListener('popstate', this.onChangeView);
  }
  render() {
    return (
      <Context.Provider
        value={{ ...this.state, onChangeView: this.onChangeView }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}
export class Route extends React.Component {
  render() {
    return (
      <Context.Consumer>
        {({ currentPath }) =>
          currentPath === this.props.path.replace(/\/$/, '')
            ? this.props.render()
            : null
        }
      </Context.Consumer>
    );
  }
}
export class Link extends React.Component {
  render() {
    const { to, children, ...props } = this.props;
    return (
      <Context.Consumer>
        {({ onChangeView }) => (
          <a
            {...props}
            href={to}
            onClick={(event) => {
              props.onClick?.(event);
              const target = new URL(to, location.href);
              if (
                event.defaultPrevented ||
                event.button !== 0 ||
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey ||
                (props.target && props.target !== '_self') ||
                props.download != null ||
                target.origin !== location.origin
              )
                return;
              event.preventDefault();
              history.pushState(null, '', to);
              onChangeView();
            }}
          >
            {children}
          </a>
        )}
      </Context.Consumer>
    );
  }
}
