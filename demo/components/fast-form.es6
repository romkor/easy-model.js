import React from "react";

export default React.createClass({
  getInitialState: function() {
    return {value: ""};
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  handleSubmit: function(event) {
    event.preventDefault();
    this.props.actions.doAddTask({
      "title": this.state.value
    });
    this.setState({value: ""});
  },
  render: function() {
    var value = this.state.value;
    return (
      <form className="task-fast-form" onSubmit={this.handleSubmit}>
        <input className="task-input" type="text" value={value} onChange={this.handleChange} />
      </form>
    );
  }
});
