import React from 'react';
export default class TodoItem extends React.Component {
  state = { editing: false, text: this.props.todo.text };
  save = (event) => {
    event.preventDefault();
    const text = this.state.text.trim();
    text
      ? this.props.actions.editTodo(this.props.todo.id, text)
      : this.props.actions.deleteTodo(this.props.todo.id);
    this.setState({ editing: false });
  };
  render() {
    const { todo, actions } = this.props;
    return (
      <li>
        {this.state.editing ? (
          <form onSubmit={this.save}>
            <input
              aria-label="Edit todo"
              value={this.state.text}
              onChange={(event) => this.setState({ text: event.target.value })}
            />
            <button>Save</button>
          </form>
        ) : (
          <>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => actions.completeTodo(todo.id)}
              />
              {todo.text}
            </label>
            <button
              onClick={() => this.setState({ editing: true, text: todo.text })}
            >
              Edit
            </button>
            <button onClick={() => actions.deleteTodo(todo.id)}>Delete</button>
          </>
        )}
      </li>
    );
  }
}
