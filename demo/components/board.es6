import React from "react";
import Immutable from "immutable";
import {PureRenderMixin} from "react/addons";
import Column from "./column.es6";
import FastForm from "./fast-form.es6";
import {head} from "../helpers.es6";

export default React.createClass({
  mixins: [PureRenderMixin],

  getInitialState: function() {
    return { tasks: this.props.tasks };
  },
  render() {
    var collections = {
      todo: Immutable.List(),
      inprogress: Immutable.List(),
      testing: Immutable.List(),
      done: Immutable.List()
    };
    this.state.tasks.sort((a, b) => {
      return b.get("updatedAt") - a.get("updatedAt");
    }).forEach((item) => {
      collections[item.get("state")] = collections[item.get("state")].push(item);
    });
    const actions = {
      doAddTask: this.doAddTask,
      doEditTask: this.doEditTask,
      doDestroyTask: this.doDestroyTask,
      doActivateTask: this.doActivateTask,
      doStopTask: this.doStopTask,
    };

    return (
      <div className="screen">
        <div className="board">
          <Column collection={collections.todo} title="Todo" actions={ actions } />
          <Column collection={collections.inprogress} title="In progress" actions={ actions } />
          <Column collection={collections.testing} title="Testing" actions={ actions } />
          <Column collection={collections.done} title="Done" actions={ actions } />
        </div>
        <FastForm task={this.state.currentTask} actions={actions}></FastForm>
      </div>
    )
  },
  doAddTask(fields) {
    var taskTemplate = {
      id: -1,
      title: "",
      state: "todo",
      active: false,
      updatedAt: 0
    };
    var task = Object.assign({}, taskTemplate, fields, {
      id: ++lastId,
      updatedAt: Date.now()
    });
    this.state.tasks.unshift(task);
    this.setState({tasks: this.state.tasks});
    return task;
  },
  doEditTask(id, fields) {
    var index = this.state.tasks.find((item) => {
      return item.get("id") === id;
    });
    console.log("index", index);
    var updatedAt = { updatedAt: Date.now()};
    // this.state.tasks
    //   .filter(item => item.id === id)
    //   .map(item => Object.assign(item, fields, updatedAt));
    this.setState({tasks: this.state.tasks});
  },
  doDestroyTask(id) {
    var index = this.state.tasks
      .findIndex(item => item.id === id);
    this.state.tasks.splice(index, 1);
    this.setState({tasks: this.state.tasks});
  },
  doActivateTask(id, fields = {}) {
    var indexPrev = this.state.tasks
      .findIndex(item => item.active === true);
    if (indexPrev !== -1) {
      this.state.tasks[indexPrev].active = false;
    }
    this.doEditTask(id, Object.assign(fields, { active: true }));
  },
  doStopTask(id, fields = {}) {
    this.doEditTask(id, Object.assign(fields, { active: false }));
  }
});
