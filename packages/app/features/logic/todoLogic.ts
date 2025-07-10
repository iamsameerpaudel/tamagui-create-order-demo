import storage from "./UniversalStorage"

export interface Todo {
  id: number
  text: string
  completed: boolean
}

const STORAGE_KEY = 'todos'

export const saveTodos = async (todos: Todo[]) => {
  
  await storage.setItem(STORAGE_KEY, JSON.stringify(todos))
}

export const loadTodos = async (): Promise<Todo[]> => {

  const data = await storage.getItem(STORAGE_KEY)
  
  
  return data ? JSON.parse(data) : []
}

export const addTodo = (todos: Todo[], text: string): Todo[] => {
  return [...todos, { id: Date.now(), text, completed: false }]
}

export const toggleTodo = (todos: Todo[], id: number): Todo[] => {
  return todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  )
}

export const deleteTodo = (todos: Todo[], id: number): Todo[] => {
  return todos.filter(todo => todo.id !== id)
}
