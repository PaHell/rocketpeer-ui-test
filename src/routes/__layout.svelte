<script context="module" lang="ts">
	import '../style/app.css';
	import Tooltip from '@src/components/Tooltip.svelte';
	import Navigation from "@src/components/Navigation.svelte";
	import Image from '@src/components/Image.svelte';
	import type { LoadOutput } from '@sveltejs/kit';
	import Icons from '@src/icons';
	import Icon from '@src/components/Icon.svelte';
	import {servers} from '@src/store';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
import { detach } from 'svelte/internal';
	
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

	let items : App.UI.MainNavItem[] = [];
	let lastPath : string | undefined;
	const buttons : {[name: string]: App.UI.MainNavItem} = {
		home: {
			icon: Icons.HOME,
			text: "Home",
			path: "/messages/friends/online",
		},
		settings: {
			icon: Icons.SETTINGS,
			text: "Settings",
			path: "/settings",
			css: 'mt-auto',
		},
		notifications: {
			icon: Icons.NOTIFICATION,
			text: "Notifications",
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
			...servers.reduce<App.UI.MainNavItem[]>((acc, curr) => {
				acc.push({
					img: curr.img,
					icon: Icons.SERVER,
					text: curr.name,
					path: "/server/" + curr.id,
				});
				return acc;
			}, []),
			buttons.settings,
			buttons.notifications
		];
	}

	function onClick(from: App.UI.MainNavItem, to: App.UI.MainNavItem) : void {
		// make each item go back in history if clicked again
		if (
			lastPath
			&& from?.path === to?.path
			&& lastPath !== to?.path) {
			goto(lastPath);
		}
		if (from) lastPath = from.path;
	}
</script>

<template>
	<Tooltip/>
	<nav>
		<Navigation
			{items}
			bind:active
			pathSelector={(item) => item.path ?? ""}
			on:click={(e) => onClick(e.detail.from, e.detail.to)}
			let:item
			let:index>
			<div data-tooltip={item.text}>
				{#if item.img}
					<Image src={item.img} alt={item.text}/>
				{:else if item.icon}
					<Icon name={item.icon}/>
				{/if}
			</div>
		</Navigation>
	</nav>
	<main>
		<slot />
	</main>
</template>

<style global lang="postcss">
	html,
	body {
		@apply w-screen h-screen overflow-hidden;
	}

	body {
		@apply flex;
		& > nav {
			@apply flex flex-col bg-gray-900;
			& > button {
                @apply flex justify-center items-center
                p-2 transition-colors;
                & > div {
                    @apply overflow-hidden
                    flex items-center
                    bg-gray-800 rounded-full
                    text-accent
                    transition-all ease-linear;
                    & > .icon {
                        @apply w-12 h-12
                        leading-[3rem];
                    }
                }
                &:hover,
                &:active,
                &.active {
                    & > div {
                        @apply bg-accent rounded-xl text-white;
                    }
                }
    
            }
		}
		& > main {
			@apply flex-1 h-full;
		}
	}


</style>
