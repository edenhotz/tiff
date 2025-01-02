import React from "react";
import TodoItem from './TodoItem';
import '../Tasks.css';

// maps over todos array and displayes them to the screen
 const todos = ({todos, deleteTodo}) => {

    const tasks = todos.map((todo) => {
        return <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} />;
    });

    return (<div className="task-container">
        {tasks}
    </div>);  
 }

export default todos;