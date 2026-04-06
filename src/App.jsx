import { useState, useEffect} from 'react'
import TaskList from './components/TaskList'
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  
  return (
    <>
      <TaskList />
    </>
  )
}
export default App