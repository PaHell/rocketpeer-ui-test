<script context="module" lang="ts">
	import MainLayout from "@src/components/MainLayout.svelte";
	import Button from "@src/components/Button.svelte";
import Icons from "@src/icons";
import NavBar from "@src/components/NavBar.svelte";
</script>

<script lang="ts">
	let top : App.UI.NavBarItem[] = [
		{
			icon: Icons.HOME,
			text: "Friends",
			path: "/messages/friends/all"	
		},
	];
</script>

<template>
	<MainLayout>
		<header class="sidebar px-4">
			<p>Search</p>
		</header>
		<aside>
			<NavBar items={top} css="p-2" vertical/>
		</aside>
		<footer class="sidebar">
			<p>Voice Connection</p>
		</footer>
		<slot />
	</MainLayout>
</template>

<style global lang="postcss">
</style>
