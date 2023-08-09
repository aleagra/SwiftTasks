const API_URL = 'https://api.jsonbin.io/v3/b/64d2703ab89b1e2299cd6ba3'

interface Todo {
  id: string
  title: string
  completed: boolean
  order: number
}

export const fetchTodos = async (): Promise<Todo[]> => {
  const res = await fetch(API_URL);

  if (!res.ok) {
    console.error('Error fetching todos');
    return [];
  }

  const data = await res.json();
  const todos = data.record.todos as Todo[]; // Acceder al array "todos" dentro de "record"
  return todos;
};