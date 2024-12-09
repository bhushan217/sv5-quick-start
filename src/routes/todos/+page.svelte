<script lang="ts">
	import TodoService from './todo.service';
	let todos: Todo[] | any[] = $state([]);
	let todoId = $state(0);
	let text = $state('');
	let errorMessage: string = $state('');
	const todoService = new TodoService();
	const promise = todoService.findAll();
	promise
		.then((tos) => {
			todos = tos;
			todoId = tos.length;
		})
		.catch((err) => (errorMessage = err.message));

	const addTodo = (txt: string) => {
		if (txt) {
			todos.push({ id: ++todoId, text: txt, done: false } as Todo);
			text = '';
		}
	};
	const toggleDone = (todo: Todo) => {
		todo.done = !todo.done;
	};
	const removeTodo = (todo: Todo) => {
		todos = todos.filter((t) => t.id !== todo.id);
	};
</script>

{#if errorMessage}
	{errorMessage}
{:else}
	<form>
		<input type="text" bind:value={text} />

		<button type="button" class="btn-pm" onclick={(e) => addTodo(text)}>Add +</button>
	</form>
	<ul>
		{#each todos.toSorted( (a, b) => (a.done === b.done ? 0 : a.done ? 1 : -1) ) as todo, index (todo.id)}
			<li id="todo-{todo.id}" class:done={todo.done} role="button">
				<span onclick={(e) => toggleDone(todo)}>{todo.id} | {todo.text}</span>
				<button onclick={(e) => removeTodo(todo)}>🗑️</button>
			</li>
		{:else}
			<p>No Data Found</p>
		{/each}
	</ul>
{/if}

<style>
	li.done {
		text-decoration: line-through;
	}
</style>
