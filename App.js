// Task Component
const Task = ({ task, onToggle, onDelete }) => {
  return (
    <li className={`task-item ${task.completed ? 'task-completed' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={onToggle}
          className="task-checkbox"
        />
        <span className="task-text">{task.text}</span>
      </div>
      <button onClick={onDelete} className="delete-btn">
        ×
      </button>
    </li>
  );
};

// Filter Tasks Function
const getFilteredTasks = (tasks, filter) => {
  switch (filter) {
    case FILTER_ACTIVE:
      return tasks.filter(task => !task.completed);
    case FILTER_COMPLETED:
      return tasks.filter(task => task.completed);
    default:
      return tasks;
  }
};

// App Component
const App = () => {
  const { tasks, filter } = ReactRedux.useSelector(state => state);
  const dispatch = ReactRedux.useDispatch();
  const [newTask, setNewTask] = React.useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      dispatch(addTask(newTask.trim()));
      setNewTask('');
    }
  };
  
  const filteredTasks = getFilteredTasks(tasks, filter);
  
  return (
    <div className="container">
      <div className="app-container">
        <header className="app-header">
          <h1>Redux Task Manager</h1>
          <p>Powered by React and Redux</p>
        </header>
        
        <form className="task-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="task-input"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button type="submit" className="btn">Add Task</button>
        </form>
        
        <div className="filters">
          <button 
            className={`filter-btn ${filter === FILTER_ALL ? 'active' : ''}`}
            onClick={() => dispatch(setFilter(FILTER_ALL))}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filter === FILTER_ACTIVE ? 'active' : ''}`}
            onClick={() => dispatch(setFilter(FILTER_ACTIVE))}
          >
            Active
          </button>
          <button 
            className={`filter-btn ${filter === FILTER_COMPLETED ? 'active' : ''}`}
            onClick={() => dispatch(setFilter(FILTER_COMPLETED))}
          >
            Completed
          </button>
        </div>
        
        <ul className="task-list">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <Task
                key={task.id}
                task={task}
                onToggle={() => dispatch(toggleTask(task.id))}
                onDelete={() => dispatch(deleteTask(task.id))}
              />
            ))
          ) : (
            <div className="empty-state">
              <p>No tasks found</p>
            </div>
          )}
        </ul>
      </div>
      
      <footer className="app-footer">
        <p>Tasks remaining: {tasks.filter(task => !task.completed).length}</p>
      </footer>
    </div>
  );
};

// Render the App
ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <App />
  </ReactRedux.Provider>,
  document.getElementById('root')
); 