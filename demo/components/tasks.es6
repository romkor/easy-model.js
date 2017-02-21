import React from "react";
import Task from "./task.es6";

export default React.createClass({
  render: function() {
    var list = [];
    this.props.collection.forEach((item, index) => {
        list.push(
          <Task key={index} active={item.active} title={item.title} id={item.id} state={item.state} actions={ this.props.actions } />
        );
      });
      return (
        <div className = "board-column-tasks" >
        { list }
        </div>
      );
  }
});
