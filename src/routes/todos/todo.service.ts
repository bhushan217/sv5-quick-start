export default class TodoService{
  async findAll(): Promise<Todo[]>{
    const response = await fetch(`/data/todos.json?n=${new Date().getTime()}`);
    const todos: Todo[] = await response.json() ?? []
    return todos;
  }
}