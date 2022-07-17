<script context="module" lang="ts">
	import '../style/app.css';
	import Header from '@src/components/Header.svelte';
</script>

<template>
	<Header />
	<slot />
</template>

<style global lang="postcss">
	html,
	body {
		@apply w-screen min-h-screen;
	}

	body {
		@apply flex flex-col;
	}
</style>
