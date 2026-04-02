import React from "react";

export default function TaskList() {

    const [title, setTitle] = React.useState('');
    const [tasks, setTasks] = React.useState([]);

    const addTask = (title) => {
        const newTask = {
            id: Date.now(),
            title,
            completed: false,
            created_at: new Date(),
        };
        setTasks([...tasks, newTask]);
        console.log(tasks);
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const markCompleted = (id) => {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault()
        if (title.trim() === '') return;
        addTask(title)
        console.log(title);
        console.log(tasks);
        setTitle('')
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="flex mb-4">
                <input className='border border-gray-600' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Add Task
                </button>
            </form>
            <div className="flex gap-4 mb-4">
                <button className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer">All</button>
                <button className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer">Pending</button>
                <button className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer">Completed</button>
            </div>

            <ul className="space-y-2 flex flex-col gap-2">
                {
                tasks.length > 0 ? (
                    tasks.map(task => {
                        return (
                            <li key={task.id}>
                                {task.title} - 
                                {task.completed ? ' (Completed)' : ' (Pending)'} - Created on: 
                                {task.created_at.toLocaleDateString()}
                                <button onClick={() => deleteTask(task.id)} className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer">- Delete</button>
                                <button onClick={() => markCompleted(task.id)} className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"> - Mark as Completed</button>
                            </li>
                        );
                    })
                ) : (
                    <p>No tasks to display.</p>
                )}
            </ul>
        </>
    )
}