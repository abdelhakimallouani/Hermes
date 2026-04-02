import { useState } from 'react'

export default function TaskInput({ addTask }) {
const [title, setTitle] = useState('')

const handleSubmit = (e) => {
  e.preventDefault()
  if (title.trim() === '') return;
  addTask(title)
  setTitle('')
}

return (
  <form onSubmit={handleSubmit} className="flex mb-4">
    <input className='border border-gray-600' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
      Add Task
    </button>
  </form>
)

}