import React from './react'


class LifeCycleDemo extends React.Component {
  constructor(props) {
    super(props)
    console.log("constructor with props: ", props)
  }

  shouldComponentUpdate(props, state) {
    console.log(
      "next props: ",
      props,
      "currentProps:",
      this.props,
      "nextState:",
      state,
      "currentState:",
      this.state
    )
  }

  getSnapshotBeforeUpdate(props, state) {
    console.log("getSnapshotBeforeUpdate with props: ", props, "state:", state)
    return {
      name: "snapshot"
    }
  }

  componentDidUpdate(props, state, snapshot) {
    console.log(
      "componentDidUpdate with props: ",
      props,
      "state:",
      state,
      "snapshot:",
      snapshot
    )
  }

  componentDidMount() {
    console.log("componentDidMount")
  }

  componentWillUnmount() {
    console.log("componentWillUnmount")
  }

  render(props, state) {
    console.log("render with props: ", props, "render with state:", state)
    return <div>Hello {props.name}</div>
  }
}

ReactDOM.render(
  <LifeCycleDemo name="Taylor" />,
  document.getElementById("root")
)
