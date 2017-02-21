import React from "react";
import Tasks from "./tasks.es6";

export default React.createClass({
  render: function() {
    if (this.props.collection.size === 0) {
      return null;
    }
    return (
      <div className = "board-column">
        <h4 className = "board-column-title"> {this.props.title} </h4>
        <Tasks collection={this.props.collection} actions={ this.props.actions } />
      </div>
    );
  }
});
