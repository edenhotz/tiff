import React, { useState, useRef } from "react";
import '../Tasks.css';

// Item that displayes form to enter new task and submit it. after the user submits it creates item for the task.
const TodoInput = ({createTodo}) => {

        // get the input without setting state 
        const todoTitle = useRef("");
        const todoDescription = useRef("");
        const [dueDate, setDueDate] = useState(new Date().toISOString().slice(0, 16));
        const [assignedUserId, setAssignedUserId] = useState('');
        const [priorityId, setPriorityId] = useState(1);
        const [statusId, setStatusId] = useState(1);

        // operations to perform when the user submits the task
        const handleSubmit = (e) => {
            e.preventDefault();
            if (todoTitle.current.value === ''){
                alert("illegal ask");
                return;
            } 
    
            const newTask = {
                title: todoTitle.current.value,
                description: todoDescription.current.value,
                due_date: dueDate,
                assigned_user_id: assignedUserId,
                priority_id: priorityId,
                status_id: statusId,
            };
            createTodo(newTask);

            //reset form 
            todoTitle.current.value = "";
            todoDescription.current.value = "";
            setDueDate(new Date().toISOString().slice(0, 16));
            setAssignedUserId('');
            setPriorityId(1);
            setStatusId(1);
        };

        return (
            <div className="form-container">
            <form className="form" onSubmit = {handleSubmit}>
            <input type="text" placeholder="Task Title" ref={todoTitle}/>
            <input type="text" placeholder="Task Description" ref={todoDescription}/>
            <input 
            type="datetime-local" 
            value={dueDate} 
            onChange={(e) => setDueDate(e.target.value)} 
        />
            <div> 
            <label> Priority: </label>
            <select value={priorityId} 
            onChange={(e) => setPriorityId(Number(e.target.value))}>
                <option value={1}>Low</option>
                <option value={2}>Medium</option>
                <option value={3}>High</option>
                <option value={4}>Urgent</option>
            </select>
            </div>
            <div>
            <input 
                type="number" placeholder="Assigned User ID" 
                value={assignedUserId} 
                onChange={(e) => setAssignedUserId(e.target.value)}  
            />
            </div>
            <div>
            <label> Status: </label>
            <select value={statusId} 
                onChange={(e) => setStatusId(Number(e.target.value))}>
                <option value={1}>Draft</option>
                <option value={2}>In Progress</option>
                <option value={3}>On Hold</option>
                <option value={4}>Completed</option>
                <option value={5}>Deleted</option>
            </select>
            </div>
            <input type="submit" />  
            </form>
            </div>
        );
};

export default TodoInput;