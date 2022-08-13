<script context="module" lang="ts">
	import '../style/app.css';
	import Tooltip from '@src/components/Tooltip.svelte';
	import Image from '@src/components/Image.svelte';
	import type { LoadOutput } from '@sveltejs/kit';
	import Icons from '@src/icons';
	import Icon from '@src/components/Icon.svelte';
	import { servers, user, users } from '@src/store';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Button from '@src/components/Button.svelte';
	import NotificationCentre from '@src/components/NotificationCentre.svelte';
	import { notifCenter } from '@src/NotificationStore';
	import NavLink from '@src/components/NavLink.svelte';
	import NavMatch from '@src/navMatch';

	const unauthed: string[] = ['/auth/login', '/auth/register'];
	const redirectUnauthorized = unauthed[0];
	const redirectAuthorized = '/home';

	export async function load({ session, url }): Promise<LoadOutput> {
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
	let active: number = -1;
	let indicator: HTMLDivElement | undefined;

	onMount(() => {
		user.set($users[0]);
		notifCenter.init([
			'Maurice is playing a game',
			'Maurice is listening to spotify',
			'Maurice is watching a movie',
			'Maurice is watching a show',
			'Maurice is watching a game'
		]);
	});
	let show: boolean = false;
</script>

<template>
	<Tooltip />
	{#if show && $notifCenter.length}
		<NotificationCentre center={notifCenter} />
	{/if}
	<nav>
		<NavLink path="/messages/friends/online" match={NavMatch.FIRST}>
			<div>
				<Icon name={Icons.HOME} />
			</div>
		</NavLink>
		<hr />
		{#each $servers as server}
			<NavLink path="/server/{server.id}" match={NavMatch.ALL}>
				<div>
					{#if server.img}
						<Image src={server.img} alt={server.text} />
					{:else}
						<Icon name={Icons.SERVER} />
					{/if}
				</div>
			</NavLink>
		{/each}
		<NavLink path="/create" match={NavMatch.ALL}>
			<div>
				<Icon name={Icons.ADD} />
			</div>
		</NavLink>
		<NavLink path="/discover" match={NavMatch.ALL}>
			<div>
				<Icon name={Icons.DISCOVER} />
			</div>
		</NavLink>
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
			@apply flex flex-col bg-gray-700;
			& > hr {
				@apply my-2 mx-5
				border-0 border-t-[2px] border-gray-500;
			}
			& > button {
				@apply flex justify-center items-center
                p-2 transition-colors;
				& > div {
					@apply overflow-hidden
					w-12 h-12
                    flex items-center
                    bg-gray-500 rounded-full
                    text-accent-500
                    transition-all ease-linear;
					& > .icon {
						@apply w-full leading-[3rem];
					}
				}
				&:before {
					content: '';
					@apply w-1 h-0 block absolute
					bg-transparent rounded-r-full
					translate-x-[-1.875rem]
					transition-all;
					will-change: height, background-color;
					/* 4rem / 2 - widthOfIndicator */
				}
				&:hover:before {
					@apply h-5 bg-white;
				}
				&.active:before {
					@apply h-8 bg-white;
				}
				&:hover,
				&:active,
				&.active {
					& > div {
						@apply bg-accent-500 rounded-xl;
						@apply text-white !important;
					}
				}
				&:first-child > div {
					@apply text-tri;
				}
			}
		}
		& > main {
			@apply flex-1 h-full;
		}
	}
</style>
