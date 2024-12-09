<script lang="ts">
	import '../app.css';
	import { navigating } from '$app/stores';
	let { children } = $props();
	// On page load or when changing themes, best to add inline in `head` to avoid FOUC
	document.body.classList.toggle(
		'dark',
		localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
	);

	// Whenever the user explicitly chooses light mode
	// localStorage.theme = 'light';

	// Whenever the user explicitly chooses dark mode
	// localStorage.theme = 'dark';

	// Whenever the user explicitly chooses to respect the OS preference
	// localStorage.removeItem('theme');
	let currentPath = $state(location.pathname);
	const routes = $state([
		{ path: '/todos', label: 'Todos', isActive: false },
		{ path: '/binarytree', label: 'Binary Tree', isActive: false },
		{ path: '/empty1', label: 'Empty 1', isActive: false },
		{ path: '/empty2', label: 'Empty 2', isActive: false }
	]);
	routes.map((r) => {
		r.isActive = currentPath === r.path;
	});
	$effect(() => {
		// console.log($state.snapshot($navigating));
		// console.log($navigating?.to?.route?.id);
		const path = $navigating?.to?.route?.id;
		if (path && path !== currentPath) {
			currentPath = path;
			const r = routes.find((rr) => rr.isActive);
			if (r) {
				r.isActive = false;
			}

			routes
				.filter((r) => currentPath === r.path)
				?.map((r) => {
					r.isActive = true;
					return r;
				});
		}
	});
</script>

<div class="main-container">
	<header class="top-header"><p class="logo">Header</p></header>
	<section>
		<aside class="side-menu">
			<ul>
				{#each routes as r, index (r.path)}
					<li>
						<a class:active={r.isActive} href={r.path}>{r.label}</a>
					</li>
				{/each}
			</ul>
		</aside>
		<main class="main-content">
			{@render children()}
		</main>
	</section>
</div>
