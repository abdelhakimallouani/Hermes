import {useState, useEffect} from "react";

export default function TaskList() {

    const [title, setTitle] = useState('');
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    

    useEffect(() => {
        console.log('Tasks updated:', tasks);
    }, [tasks]);

    const addTask = (title) => {
        const newTask = {
            id: Date.now(),
            title,
            completed: false,
            created_at: new Date(),
        };
        console.log(newTask);
        setTasks([...tasks, newTask]);
        console.log("Tasks:", tasks);
        
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
        // console.log(title);
        // console.log(tasks);
        setTitle('')
        // console.log(tasks);
    }

    const filterTasks = (filter) => {
        switch (filter) {
            case 'all':
                return tasks;
            case 'pending':
                return tasks.filter(task => !task.completed);
            case 'completed':
                return tasks.filter(task => task.completed);
            default:
                return tasks;
        }
    };
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {

        console.log('save', tasks);
        const data = JSON.parse(localStorage.getItem('tasks'));
        // console.log(data);
        if (data !== null) {
            setTasks(data);
        }
            setLoaded(true);
    }, []);

    useEffect(() => {
        if (loaded) {
            console.log('save', tasks);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }, [tasks, loaded]);

    let nbrTasks = tasks.length;
    let nbrCompleted = tasks.filter(task => task.completed).length;
    let nbrPending = tasks.filter(task => !task.completed).length;


    return (
  <div className="min-h-screen bg-[#FAFBFC] font-sans text-gray-800 flex flex-col">
    <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
      <div className="flex items-center gap-3 w-64">
        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <h1 className="font-bold text-lg leading-tight">Hermes</h1>
          <p className="text-xs text-gray-400">Task Dashboard</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>
      </div>
    </header>

    <div className="flex flex-1 max-w-6xl mx-auto w-full px-4 py-8 gap-10">
      <main className="flex-1">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-1">My Tasks</h2>
          <p className="text-gray-500">{new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-start justify-between shadow-sm">
            <div>
              <p className="text-3xl font-bold mb-1">{nbrTasks}</p>
              <p className="text-xs text-gray-400 font-medium">Total Tasks</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
            </div>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-start justify-between shadow-sm">
            <div>
              <p className="text-3xl font-bold mb-1">{nbrCompleted}</p>
              <p className="text-xs text-gray-400 font-medium">Completed</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-green-50 text-green-500 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-start justify-between shadow-sm">
            <div>
              <p className="text-3xl font-bold mb-1">{nbrPending}</p>
              <p className="text-xs text-gray-400 font-medium">Pending</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-2 mb-6 flex items-center shadow-sm">
          <button type="submit" className="w-10 h-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center justify-center transition-colors flex-shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          </button>
          <input 
            className="flex-1 px-4 outline-none bg-transparent placeholder-gray-400 text-gray-700" 
            type="text" 
            placeholder="Add a new task..."
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
        </form>

        <div className="flex items-center justify-between mb-4">
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button onClick={() => setFilter('all')} className={`px-5 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === 'all' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>All</button>
            <button onClick={() => setFilter('pending')} className={`px-5 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === 'pending' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>Pending</button>
            <button onClick={() => setFilter('completed')} className={`px-5 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === 'completed' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>Completed</button>
          </div>
        </div>

        <div className="space-y-3">
          {filterTasks(filter).length > 0 ? (
            filterTasks(filter).map(task => (
              <div key={task.id} className={`flex items-center justify-between p-4 bg-white border rounded-2xl transition-all ${task.completed ? 'border-gray-100 opacity-70' : 'border-gray-200 shadow-sm'}`}>
                <div className="flex flex-col">
                  <span className={`font-medium text-gray-700'}`}>
                    {task.title}
                  </span>
                  <span className="text-xs text-gray-400 mt-1">
                    Created on: {new Date(task.created_at).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => markCompleted(task.id)} 
                    className={`${task.completed ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'} text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer`}
                  >
                    {task.completed ? 'Completed' : 'Mark as Completed'}
                  </button>

                  <button 
                    onClick={() => deleteTask(task.id)} 
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white border border-dashed border-gray-200 rounded-2xl">
              <p className="text-gray-400">No tasks to display.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  </div>
);
}