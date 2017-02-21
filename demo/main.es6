import React from "react";
import Immutable from "immutable";
import {Model} from "../easy.js";
import Board from "./components/board.es6";
import {head} from "./helpers.es6";

let models = new Model({
  schema:[
    {name: 'id', type: 'integer'},
    {name: 'title', type: 'string'},
    {name: 'state', type: 'string'},
    {name: 'active', type: 'boolean'},
    {name: 'updatedAt', type: 'datetime'},
  ]
});

models.create({
  id: 1,
  title: "Bo Title",
});

models.toJSON();
console.log(models.toJSON());
console.log(models.all);

var lastId = 701;

var Task = Immutable.Record({
  id: undefined,
  title: undefined,
  state: undefined,
  active: false,
  updatedAt: undefined
});

var tasks = Immutable.List();

function buildTask(i, state) {
  return ({
    id: i,
    title: `Todo #${i}`,
    state: state,
    active: false,
    updatedAt: Date.now() + i
  });
}

function generateTodos() {
  var _tasks = new Model({
    schema:[
      {name: 'id', type: 'integer'},
      {name: 'title', type: 'string'},
      {name: 'state', type: 'string'},
      {name: 'active', type: 'boolean'},
      {name: 'updatedAt', type: 'datetime'},
    ]
  });
  for (let i = 1; i <= 100; i++) {
    _tasks.create(buildTask(i, "todo"));
  }
  for (let i = 101; i <= 200; i++) {
    _tasks.create(buildTask(i, "inprogress"));
  }
  for (let i = 201; i <= 300; i++) {
    _tasks.create(buildTask(i, "testing"));
  }
  for (let i = 301; i <= 350; i++) {
    _tasks.create(buildTask(i, "done"));
  }
  return _tasks;
}

tasks = generateTodos();

React.render(<Board tasks={tasks} />, document.body);
