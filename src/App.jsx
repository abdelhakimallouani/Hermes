import { useState, useEffect} from 'react'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  
  return (
    <>
      <h1 className="text-center mt-10">Hermes App</h1>
      {/* <TaskInput addTask={addTask} /> */}
      <TaskList />
    </>
  )
}
export default App