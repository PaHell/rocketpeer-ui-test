<script context="module" lang="ts">
	import '../style/app.css';
	import Header from '@src/components/Header.svelte';
	import type { LoadOutput, LoadInput } from '@sveltejs/kit';
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
</script>

<template>
	<Header />
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
</style>
