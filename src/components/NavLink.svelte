<script lang="ts" context="module">
	import { createEventDispatcher, onMount } from 'svelte';
	import { afterNavigate, goto } from '$app/navigation';
	import NavMatch from '@src/navMatch';
	const matchFunctions: [NavMatch, (path1: string, path2: string) => boolean][] = [
		[
			NavMatch.ALL,
			(p1, p2) => {
				return p1 === p2;
			}
		],
		[
			NavMatch.FIRST,
			(p1, p2) => {
				return p1.split('/')[1] === p2.split('/')[1];
			}
		],
		[
			NavMatch.EXCEPT_LAST,
			(p1, p2) => {
				const i1 = p1.lastIndexOf('/');
				const i2 = p2.lastIndexOf('/');
				return p1.substring(0, i1) === p2.substring(0, i2);
			}
		]
	];
</script>

<script lang="ts">
	interface $$Slots {
		default: {
			active: boolean;
		};
	}
	interface $$Events {
		click: MouseEvent;
	}
	export let css = '';
	export let path = '/';
	export let match: NavMatch = NavMatch.ALL;
	let active = false;

	const dispatch = createEventDispatcher<{ click: MouseEvent }>();

	onMount(() => {
		update(window.location.pathname);
	});

	afterNavigate(({ to }) => {
		update(to.pathname);
	});

	function update(_path: string) {
		let func = matchFunctions.find((i) => i[0] === match)?.[1];
		if (func) active = func(path, _path);
	}

	async function onClick(event: MouseEvent): Promise<void> {
		await goto(path);
		dispatch('click', event);
	}
</script>

<template>
	<button class={css} class:active on:click|preventDefault={(e) => onClick(e)}>
		<slot {active} />
	</button>
</template>

<style global lang="postcss">
</style>
