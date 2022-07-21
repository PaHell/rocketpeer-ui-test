<script context="module" lang="ts">
	import '../style/app.css';
	import Dock from '@src/components/Dock.svelte';
	import ServerImage from '@src/components/ServerImage.svelte';
	import type { LoadOutput, LoadInput } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
import Icons from '@src/icons';
import Icon from '@src/components/Icon.svelte';
import { onMount } from 'svelte';
	const unauthed: string[] = ['/auth/login', '/auth/register'];
	const redirectUnauthorized = unauthed[0];
	const redirectAuthorized = '/home';

	export async function load(context: LoadInput): Promise<LoadOutput> {
		return { props: {} };
		const requiresAuth = !unauthed.find((r) => r === context.url.pathname);
		let loggedIn = Object.keys(context.session).length > 0;
		let path = context.url.pathname;
		console.log({ path, requiresAuth, loggedIn });
		if (!requiresAuth && loggedIn) path = redirectAuthorized;
		else if (requiresAuth && !loggedIn) path = redirectUnauthorized;
		if (path !== context.url.pathname) {
			return { redirect: path, status: 302 };
		}
		return { props: {} };
	}
</script>

<script lang="ts">
	const servers : App.Server[] = [
		{
			id: "hellebrand2021",
			name: "Hause Hellebrand",
			img: "",
		},
		{
			id: "amitdoener",
			name: "Amit's Dönerbude",
			img: "",
		},
		{
			id: "fi2021",
			name: "Fi2021",
			img: "",
		},
	];
	const left : App.UI.NavBarItem[] = [
		{
			icon: Icons.HOME,
			url: '/home',
		}
	];
	const right : App.UI.NavBarItem[] = [
		{
			icon: Icons.SETTINGS,
			url: '/settings',
		},
		{
			icon: Icons.NOTIFICATION,
			func: () => console.log('toggle nc'),
		},
	];
	let active : App.Server | App.UI.NavBarItem | undefined | null = null;

	onMount(() => {
		const split = window.location.pathname.split("/");
		const relative = '/' + split[split.length - 1];
		if (split[split.length - 2] === "server") {
			active = servers.find((s) => s.id === split[split.length - 1]);
		} else {
			active = left.find((s) => s.url === relative);
			if (active) return;
			active = right.find((s) => s.url === relative);
		}
	});

	function navigate(event: CustomEvent<App.Server | App.UI.NavBarItem>) {
		const isServer = event.detail?.id != undefined;
		if (isServer) goto(`/server/${event.detail.id}`);
		else if (event.detail?.url) goto(event.detail.url);
		else if (event.detail?.func) event.detail.func();
	}
</script>

<template>
	<div class="flex w-full">
		<Dock items={left} bind:active on:click={navigate} let:item>
			<Icon name={item.icon} css="!text-white"/>
		</Dock>
		<Dock css="flex-1" items={servers} bind:active on:click={navigate} let:item>
			<div class="dock-server">
				<ServerImage server={item}/>
				<p>{item.name}</p>
			</div>
		</Dock>
		<Dock items={right} bind:active on:click={navigate} let:item>
			<Icon name={item.icon}/>
		</Dock>
	</div>
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

	.dock-server {
		@apply flex flex-col items-center;
		& > p {
			@apply hidden;
		}
	}
</style>
