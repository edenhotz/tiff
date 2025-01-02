import {useState, useEffect} from 'react';
import './App.css';
import Todos from './components/Todos';
import axios from 'axios';
import TodoItem from './components/TodoItem';
import TodoInput from './components/TodoInput';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [todos, setTodos] = useState([]);

  // get saved todos from server
  useEffect(() => {
    const getTodos = async () => {
    const res = await axios.get("http://localhost:8080");
    setTodos(res.data);
    };

    getTodos();
  }, []);

  // creates new todo and saves it to the server, also updates todos.
  const createTodo = async (newTask) => {
    try {
        const res = await axios.post("http://localhost:8080", newTask);
        setTodos((prevTodos) => [...prevTodos, res.data]);
    } catch (error) {
        console.error("Failed to create a todo:", error);
    }
};

  // deletes todo from the server and updates todos
  const deleteTodo = async (id) => {
    try {
    const res = await axios.delete(`http://localhost:8080/${id}`);
    if (res.status === 200) {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }
} catch (error) {
  console.error('Error deleting task', error);
}
};

  // sorts by name
  const handleClickName = async () => {
        const res = await axios.get("http://localhost:8080");
        const sortedTodos = res.data.sort((a, b) => {
          if (a.title.toLowerCase() < b.title.toLowerCase()) {return -1};
          if (a.title.toLowerCase() > b.title.toLowerCase()) {return 1};
          return 0;
      });
        setTodos(sortedTodos);
      }

  // sorts by due dates      
  const handleClickDate = async () => {
    const res = await axios.get("http://localhost:8080");
    const sortedTodos = res.data.sort((a, b) => {
      if (a.due_date < b.due_date) {return -1};
      if (a.due_date > b.due_date) {return 1};
      return 0;
  });
    setTodos(sortedTodos);
  }

  // displays todos to the screen
  return (
    <div className="container">
      <h1>TO DO LIST</h1>
      <TodoInput createTodo={createTodo} />
      {todos && todos.length > 0 ? <Todos todos = {todos} deleteTodo={deleteTodo}/> : <h1>no todos</h1>}
      <button onClick={handleClickName}>sort by title</button>
      <button onClick={handleClickDate}>sort by Due Date</button>
      </div>
  );
} 

export default App;
