<script lang="ts">
	import { onMount } from 'svelte';
	import { slide, fade } from 'svelte/transition';
	import { BinarySearchTree, BiNode } from './bst';
	let visible = $state(false);
	const bst = new BinarySearchTree<string>();
	const data = '20|17|19|13|10|14|25|21|22|33|30|45|09|12|15|18|34|29|47|19.5|20.5|19.75|20.25';
	data.split('|').map((e) => bst.insert(e));
	// console.log(bst);
	const preOrder = bst.preOrder();
	const inOrder = bst.inOrder();
	const postOrder = bst.postOrder();
	const r = $state(12);
	const d = $derived(r * 4);
	const b = $derived(r * d);
	// const r = b / 32;
	const mid = $derived(b / 2);
	onMount(() => {
		setTimeout(() => (visible = true), 500);
	});
	function* range(start: number, end: number): Generator<number> {
		for (let i = start; i < end; i++) yield i;
	}
</script>

{#snippet biNode(node: BiNode<string>, px: number = 0, py: number = 0)}
	{@const x_dir = node.isLeft ? -1 : 1}
	{@const real_level = node.level + 1}
	{@const gap = (b / 2 ** real_level) * x_dir}
	{@const nx = px + gap}
	<!-- why const 4? because vertical gap between center of parent and child 
   is 2 circle  -->
	{@const ny = node.level * r * 4 + r * 5}
	{#key node}
		<g
			in:fade|global={{ duration: real_level * 300, delay: real_level * 300 }}
			out:fade|global={{ duration: 300 }}
		>
			{#if node.parent}
				{@const dx = r / 8}
				<line class="stroke-blue-500"
					x1={nx}
					y1={ny - r}
					x2={px + (r*x_dir) }
					y2={py}
					stroke-width=".5"
					stroke-linecap="round"
					data-pos={node.isLeft ? 'L' : 'R'}
				></line>
				<!-- <path d="
      M {nx} {ny - r} 
      C {px+ r * x_dir + dx} {py - dx} {nx - dx} {ny + dx} 
      {px+ r * x_dir} {py}"
				stroke="#888"
				stroke-width=".5"
				stroke-linecap="round"
        fill="none"></path> -->
			{/if}
			<circle
				cx={nx}
				cy={ny}
				{r}
        class="stroke-blue-500 fill-gray-300 dark:fill-gray-800"
				stroke-width=".5"
				opacity=".8"
        style="position:relative;z-index:{mid-py};"
				data-px={px}
				data-py={py}
				data-gap={gap}
				data-x_dir={x_dir}
				data-pos={node.isLeft ? 'L' : 'R'}
				data-level={node.level}
			/>
			<text
				x={nx}
				y={ny}
        class="fill-gray-800 dark:fill-gray-300"
        style="position:relative;z-index:{mid-py};"
				dominant-baseline="middle"
				text-anchor="middle"
				font-size={r / 2}
				data-isroot={node.isRoot}
				data-isleft={node.isLeft}>{node.value}</text
			>
		</g>
	{/key}
	{#if node.left}
		{@render biNode(node.left, nx, ny)}
	{/if}
	{#if node.right}
		{@render biNode(node.right, nx, ny)}
	{/if}
{/snippet}

<input type="checkbox" bind:checked={visible} />
<!-- Graph {@debug bst} -->
<div class="container">
	{#if visible}
		<div transition:slide>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {b} {b}">
				<!-- Vertical grid lines-->
				{#each range(0, d + 1) as x}
					<line
						x1={x * r}
						y1={0}
						x2={x * r}
						y2={b}
        		class="stroke-green-500"
						stroke-width=".5"
						opacity=".2"
						stroke-linecap="round"
					></line>
				{/each}
				<!-- Horizontal grid lines-->
				{#each range(0, r * 4 + 1) as x}
					<line
						x1={0}
						y1={x * (d / 4)}
						x2={b}
						y2={x * (d / 4)}
        		class="stroke-green-500"
						stroke-width=".5"
						opacity=".2"
						stroke-linecap="round"
					></line>
				{/each}
				<!-- Data as Text -->
				<text
					font-size={r / 2}
					x={mid}
					y="0"
					dominant-baseline="middle"
					text-anchor="middle"
					fill="#eee"
				>
					<tspan x={mid} y="5" dominant-baseline="middle" text-anchor="middle"
        class="fill-gray-800 dark:fill-gray-300">
						Binary Tree Input: {data.replaceAll('|', ' ; ')}
					</tspan>
					<tspan x={mid} y="15" dominant-baseline="middle" text-anchor="middle"
        class="fill-gray-800 dark:fill-gray-300">
						preOrder: {preOrder.join(' ; ')}</tspan
					>
					<tspan x={mid} y="25" dominant-baseline="middle" text-anchor="middle"
        class="fill-gray-800 dark:fill-gray-300">
						inOrder: {inOrder.join(' ; ')}</tspan
					>
					<tspan x={mid} y="35" dominant-baseline="middle" text-anchor="middle"
        class="fill-gray-800 dark:fill-gray-300">
						postOrder: {postOrder.join(' ; ')}</tspan
					>
				</text>
				<!--  Binary Tree-->
				<g opacity="1">
					{@render biNode(bst.getRoot()!)}
				</g>
			</svg>
		</div>
	{/if}
</div>

<style>
	.container {
		svg {
			@apply bg-gray-300 dark:bg-gray-800;
			line {
				z-index: 0;
			}
			circle {
				z-index: 1;
				cursor: pointer;
			}
			text {
				z-index: 2;
				user-select:none;
			}
		}
	}
</style>
