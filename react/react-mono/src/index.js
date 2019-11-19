import React from './react'


class HelloMessage extends React.Component {
  render({ name }) {
    return <div>Hello {name}</div>
  }
}


ReactDOM.render(
  <HelloMessage name="Taylor" />,
  document.getElementById("root")
)
