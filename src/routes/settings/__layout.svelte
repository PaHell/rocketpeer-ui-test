<script context="module" lang="ts">
	import MainLayout from '@src/components/MainLayout.svelte';
	import Button from '@src/components/Button.svelte';
	import Icons from '@src/icons';
	import NavBar from '@src/components/NavBar.svelte';
	import NavMatch from '@src/navMatch';
	import Input from '@src/components/Input.svelte';
	import Icon from '@src/components/Icon.svelte';
	import UserImage from '@src/components/UserImage.svelte';
	import { users } from '@src/store';
	import { goto } from '$app/navigation';
</script>

<script lang="ts">
	let items: App.UI.NavBarItem[] = [
		{
			icon: Icons.FRIEND,
			text: 'Account',
			path: '/settings/account'
		},
		{
			icon: Icons.KNOWN,
			text: 'Profile',
			path: '/settings/profile'
		}
	];
</script>

<template>
	<div id="settings">
		<aside>
			<NavBar {items} css="p-2" vertical />
		</aside>
		<main>
			<slot />
		</main>
		<Button on:click={() => goto('/home/friends/online')} icon={Icons.CLOSE} />
	</div>
</template>

<style global lang="postcss">
	#settings {
		@apply h-full flex bg-gray-500;
		& > aside {
			@apply w-64 bg-gray-600;
		}
		& > main {
			@apply flex-1 px-4;
		}
		& > .btn {
			@apply border-2 border-gray-200 rounded-full;
			height: calc(2.5rem + 4px);
		}
	}
</style>
