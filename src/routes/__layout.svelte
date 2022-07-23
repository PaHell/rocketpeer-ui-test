<script context="module" lang="ts">
	import '../style/app.css';
	import NavBar from '@src/components/NavBar.svelte';
	import Tooltip from '@src/components/Tooltip.svelte';
	import Image from '@src/components/Image.svelte';
	import type { LoadOutput, LoadInput } from '@sveltejs/kit';
	import Icons from '@src/icons';
	import Icon from '@src/components/Icon.svelte';
	import {servers} from '@src/store';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Button from '@src/components/Button.svelte';
	
	const unauthed: string[] = ['/auth/login', '/auth/register'];
	const redirectUnauthorized = unauthed[0];
	const redirectAuthorized = '/home';

	export async function load({session, url}): Promise<LoadOutput> {
		return { props: {} };
		const requiresAuth = !unauthed.find((r) => r === url.pathname);
		let loggedIn = Object.keys(session).length > 0;
		let path = url.pathname;
		console.log({ path, requiresAuth, loggedIn });
		if (!requiresAuth && loggedIn) path = redirectAuthorized;
		else if (requiresAuth && !loggedIn) path = redirectUnauthorized;
		if (path !== url.pathname) {
			return { redirect: path, status: 302 };
		}
		return { props: {} };
	}
</script>

<script lang="ts">
	let items : App.UI.NavBarItem[] = [];
	let lastPath : string | undefined;
	const buttons : {[name: string]: App.UI.NavBarItem} = {
		home: {
			icon: Icons.HOME,
			name: "Home",
			path: "/friends/online",
		},
		settings: {
			icon: Icons.SETTINGS,
			name: "Settings",
			path: "/settings",
			css: 'ml-auto',
		},
		notifications: {
			icon: Icons.NOTIFICATION,
			name: "Notifications",
			onClick: () => console.log('toggle nc'),
		},
	};
	let active : number = -1;

	servers.subscribe(val => {
		updateServers(val);
	});

	onMount(() => {
		updateServers($servers);
	});
	
	function updateServers(servers: App.Server[]) {
		items = [
			buttons.home,
			...servers.reduce<App.UI.NavBarItem[]>((acc, curr) => {
				acc.push({
					img: curr.img,
					icon: Icons.SERVER,
					name: curr.name,
					path: "/server/" + curr.id,
				});
				return acc;
			}, []),
			buttons.settings,
			buttons.notifications
		];
	}

	function onClick(event: CustomEvent<{from: App.UI.NavBarItem | undefined, to: App.UI.NavBarItem}>) : void {
		const {from, to} = event.detail;
		// make each item go back in history if clicked again
		if (
			lastPath
			&& from?.path === to?.path
			&& lastPath !== to?.path) {
			goto(lastPath);
		}
		if (event.detail.from) lastPath = event.detail.from.path;
	}
</script>

<template>
	<Tooltip/>
	<NavBar
		{items}
		bind:active
		css="w-full"
		on:click={onClick}/>
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
