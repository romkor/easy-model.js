import React from "react";

export default React.createClass({
  doReject() {
    this.props.actions.doStopTask(this.props.id, {state: 'todo'});
  },
  doStart() {
    this.props.actions.doActivateTask(this.props.id, {state: 'inprogress'});
  },
  doFinish() {
    this.props.actions.doStopTask(this.props.id, {state: 'testing'});
  },
  doAccept() {
    this.props.actions.doStopTask(this.props.id, {state: 'done'});
  },
  doDestroy() {
    this.props.actions.doDestroyTask(this.props.id);
  },
  doActivate() {
    this.props.actions.doActivateTask(this.props.id);
  },
  doStop() {
    this.props.actions.doStopTask(this.props.id);
  },
  renderActions() {
    const stateActions = {
      todo: ['inprogress', 'destroy'],
      inprogress: ['testing', 'todo', 'destroy'],
      testing: ['done', 'todo', 'destroy'],
      done: ['destroy']
    };
    const actionComponents = {
      todo: (<button className="action" onClick={this.doReject}>Reject</button>),
      inprogress: (<button className="action" onClick={this.doStart}>Start</button>),
      testing: (<button className="action" onClick={this.doFinish}>Finish</button>),
      done: (<button className="action" onClick={this.doAccept}>Accept</button>),
      destroy: (<button className="action" onClick={this.doDestroy}>Destroy</button>)
    };
    var actions = stateActions[this.props.state].map((item) => {
      return actionComponents[item];
    });

    return (
      <div className="board-task-actions">
        { actions }
      </div>
    );
  },
  renderActivateButton() {
    if (["todo", "done"].indexOf(this.props.state) !== -1 ) return null;
    if (this.props.active) {
      return (<button onClick={this.doStop} style={ {float:'right'} }>❚❚</button>);
    } else {
      return (<button onClick={this.doActivate} style={ {float:'right'} }>▶</button>);
    }
  },
  render() {
    var actions = this.renderActions();
    var activate = this.renderActivateButton();
    var className = this.props.active ? className = "board-task__active" : "board-task";
    return (
      <div className={className}>
        <div className="board-task-title">
          { this.props.title }
          { activate }
        </div>
        { actions }
      </div>
    );
  }
});
