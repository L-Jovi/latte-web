import React from 'react'

interface HeaderProps {

}

interface HeaderState {
  count: number;
}

export default class Header extends React.Component<HeaderProps, HeaderState> {
  parent: any
  child: any

  constructor(props: any) {
    super(props);

    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    console.log(`init: ${this.state.count}`)

    this.setState((preState) => ({
      count: preState.count + 1
    }), () => {
      console.log(`1: ${this.state.count}`)
    })
    this.setState({ count: this.state.count + 1 }, () => {
      console.log(`2: ${this.state.count}`)
    });

    console.log(`sync end: ${this.state.count}`)

    setTimeout(() => {
      console.log(`timeout 0: ${this.state.count}`)

      this.setState({ count: this.state.count + 1 });
      console.log(`timeout 1: ${this.state.count}`)

      this.setState({ count: this.state.count + 1 });
      console.log(`timeout 2: ${this.state.count}`)
    }, 1000)


    // event
    this.parent.addEventListener('click', (e: any) => {
      console.log('dom parent');
    })
    this.child.addEventListener('click', (e: any) => {
      console.log('dom child');
    })
    document.addEventListener('click', (e: any) => {
      console.log('document');
    })
  }

  childClick = (e: any) => {
    debugger
    console.log('react child');
  }

  parentClick = (e: any) => {
    debugger
    console.log('react parent');
  }

  render() {
    return (
      <div>
        <div>Header Placeholder {this.state.count}</div>

        <div onClick={this.parentClick} ref={ref => this.parent = ref}>
          <div onClick={this.childClick} ref={ref => this.child = ref}>
            click me
          </div>
        </div>
      </div>
    )
  }
}
