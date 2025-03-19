// Action Types
const ADD_TASK = 'ADD_TASK';
const TOGGLE_TASK = 'TOGGLE_TASK';
const DELETE_TASK = 'DELETE_TASK';
const SET_FILTER = 'SET_FILTER';

// Filter Types
const FILTER_ALL = 'FILTER_ALL';
const FILTER_ACTIVE = 'FILTER_ACTIVE';
const FILTER_COMPLETED = 'FILTER_COMPLETED';

// Action Creators
const addTask = (text) => ({
  type: ADD_TASK,
  payload: {
    id: Date.now(),
    text,
    completed: false
  }
});

const toggleTask = (id) => ({
  type: TOGGLE_TASK,
  payload: { id }
});

const deleteTask = (id) => ({
  type: DELETE_TASK,
  payload: { id }
});

const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: { filter }
}); 