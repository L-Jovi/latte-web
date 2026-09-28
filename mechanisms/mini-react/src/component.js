export default class Component {
  constructor(props) {
    this.props = props;
    this.state = {};
  }
  setState(change) {
    if (!this.update) return;
    const previous = this.state;
    const patch =
      typeof change === 'function' ? change(previous, this.props) : change;
    this.state = { ...previous, ...patch };
    this.update(previous);
  }
}
