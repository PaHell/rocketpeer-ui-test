<script context="module" lang="ts">
	import NavBar from '@src/components/NavBar.svelte';
	import Icons from '@src/icons';
</script>

<script lang="ts">
	let items: App.UI.NavBarItem[] = [
		{
			text: 'Online',
			path: '/home/friends/online'
		},
		{
			text: 'All',
			path: '/home/friends/all'
		},
		{
			text: 'Pending',
			path: '/home/friends/pending'
		},
		{
			icon: Icons.ADD,
			text: 'Add',
			path: '/home/friends/add'
		}
	];
	let active: number = -1;
</script>

<template>
	<header class="header-content px-4">
		<NavBar {items} bind:active />
	</header>
	<main class="content">
		<slot />
	</main>
</template>

<style global lang="postcss">
</style>
