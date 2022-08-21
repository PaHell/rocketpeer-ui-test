<script context="module" lang="ts">
	import NavBar from '@src/components/NavBar.svelte';
	import Icons from '@src/icons';
</script>

<script lang="ts">
	let items: App.UI.NavBarItem[] = [
		{
			text: 'Online',
			path: '/home/known/online'
		},
		{
			text: 'All',
			path: '/home/known/all'
		},
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
