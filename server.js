const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8080;
const FILE_PATH = path.join(__dirname, 'tasks.json'); // Path to store tasks

app.use(cors());
app.use(bodyParser.json());

// Utility to read tasks from JSON file
const readTasksFromFile = () => {
    try {
        const data = fs.readFileSync(FILE_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading the file", error);
        return [];
    }
};

// Utility to save tasks to JSON file
const saveTasksToFile = (tasks) => {
    try {
        fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2), 'utf8');
    } catch (error) {
        console.error("Error saving to file", error);
    }
};

// Get all tasks
app.get('/', (req, res) => {
    const tasks = readTasksFromFile();
    res.json(tasks);
});

// Create a new task
app.post('/', (req, res) => {
    const { title, description, due_date, assigned_user_id, priority_id, status_id } = req.body;
    
    if (!title || !description || !assigned_user_id || !priority_id || !status_id || !due_date) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const newTask = {
        id: Date.now().toString(), // Using timestamp as a unique ID
        title,
        description,
        create_date: Date.now(),
        update_date: Date.now(),
        due_date: new Date(due_date).getTime(),
        assigned_user_id,
        priority_id,
        status_id,
    };

    const tasks = readTasksFromFile();
    tasks.push(newTask);

    saveTasksToFile(tasks);
    res.status(201).json(newTask); // Send back the created task
});

// Delete a task by ID
    app.delete('/:id', (req, res) => {
        const { id } = req.params;
        console.log(id)
        const tasks = readTasksFromFile();
        const filteredTasks = tasks.filter((task) => task.id !== id);
    
        if (tasks.length === filteredTasks.length) {
            return res.status(404).json({ error: 'Task not found' });
        }
    
        saveTasksToFile(filteredTasks);
        res.status(200).json({ message: 'Task deleted successfully' });
    
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});