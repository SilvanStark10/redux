// Initial State
const initialState = {
  tasks: [],
  filter: FILTER_ALL
};

// Root Reducer
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
      
    case TOGGLE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? { ...task, completed: !task.completed }
            : task
        )
      };
      
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload.id)
      };
      
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload.filter
      };
      
    default:
      return state;
  }
}; 