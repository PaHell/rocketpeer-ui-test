<script context="module" lang="ts">
	import MainLayout from '@src/components/MainLayout.svelte';
	import Button from '@src/components/Button.svelte';
	import Icons from '@src/icons';
	import NavBar from '@src/components/NavBar.svelte';
	import NavMatch from '@src/navMatch';
import Input from '@src/components/Input.svelte';
</script>

<script lang="ts">
	let search: string = "";
	let top: App.UI.NavBarItem[] = [
		{
			icon: Icons.FRIEND,
			text: 'Friends',
			path: '/messages/friends/all',
			match: NavMatch.EXCEPT_LAST
		},
		{
			icon: Icons.KNOWN,
			text: 'Known People',
			path: '/messages/known/all',
			match: NavMatch.EXCEPT_LAST
		},
	];
</script>

<template>
	<MainLayout>
		<header class="sidebar">
			<Input
				placeholder="Search in messages..."
				color="primary"
				bind:value={search}
				bordered
				focusOnMount
			/>
		</header>
		<aside>
			<NavBar items={top} css="p-2" vertical />
		</aside>
		<slot />
	</MainLayout>
</template>

<style global lang="postcss">
</style>
