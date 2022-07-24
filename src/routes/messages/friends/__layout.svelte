<script context="module" lang="ts">
	import NavBar from '@src/components/NavBar.svelte';
import Icons from '@src/icons';
</script>

<script lang="ts">
	let items : App.UI.NavBarItem[] = [
		{
			text: "Online",
			path: "/messages/friends/online",
		},
		{
			text: "All",
			path: "/messages/friends/all",
		},
		{
			text: "Pending",
			path: "/messages/friends/pending",
		},
		{
			icon: Icons.CONTINUE,
			text: "Add",
			path: "/messages/friends/add",
		},
	];
	let active : number = -1;
</script>

<template>
		<header class="header-content px-4">
			<NavBar
				{items}
				bind:active/>
		</header>
		<main class="content">
			<slot />
		</main>
</template>

<style global lang="postcss">
</style>
