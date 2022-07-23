<script context="module" lang="ts">
	import NavBar from '@src/components/NavBar.svelte';
import Icons from '@src/icons';
</script>

<script lang="ts">
	let items : App.UI.NavBarItem[] = [
		{
			name: "Online",
			path: "/friends/online",
		},
		{
			name: "All",
			path: "/friends/all",
		},
		{
			name: "Pending",
			path: "/friends/pending",
		},
		{
			icon: Icons.CONTINUE,
			name: "Add",
			path: "/friends/add",
		},
	];
	let active : number = -1;
</script>

<template>
	<NavBar
		{items}
		bind:active
		css="w-full"
		showText/>
	<slot />
</template>

<style global lang="postcss">
	html,
	body {
		@apply w-screen h-screen overflow-hidden;
	}

	body {
		@apply flex flex-col;
	}

	header {

	}
</style>
