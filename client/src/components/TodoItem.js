import React from "react";
import '../Tasks.css';

// display todoItem to the screen
const TodoItem = ({todo, deleteTodo}) => {

    const formatDateTime = (date) => {
        date = new Date(date)
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
      
        const formattedDate = date.toLocaleDateString('en-US', dateOptions);  // e.g., "January 1, 2025"
        const formattedTime = date.toLocaleTimeString('en-US', timeOptions);  // e.g., "03:45:12 PM"
      
        return `${formattedDate} ${formattedTime}`;
      };

      const getPriorityText = (priority) => {
        switch (priority) {
            case 1:
                return 'Low';
              case 2:
                return 'Medium';
              case 3:
                return 'High';
              case 4:
                return 'Urgent';
              default:
                return 'Unknown';
            }
      };
      
      const getStatusText = (status) => {
        switch (status) {
            case 1:
                return 'Draft';
              case 2:
                return 'In Progress';
              case 3:
                return 'On Hold';
              case 4:
                return 'Completed';
              case 5:
                return 'Deleted';
              default:
                return 'Unknown';
        }
    }

    return (
        <div className="todo-item">
        <div className="todo-content">
        <div className="todo-title"> {todo.title}</div>
        <div className="todo-description">{todo.description}</div>
        <div className="todo-due-date">Due Date: {formatDateTime(todo.due_date)}</div>
        <div className="todo-priority">
        Priority: <span className={`priority-${todo.priority_id}`}>{getPriorityText(todo.priority_id)}</span>
      </div>
      <div className="todo-status">
        Status: <span className={`status-${todo.status_id}`}>{getStatusText(todo.status_id)}</span>
      </div>
        </div>
        <div className="todo-buttons">
            <div className="todo-button">
        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
        </div>
        </div>
    );
}

export default TodoItem;