<script context="module">
</script>

<script>
</script>

<template>
	<h1 class="text-red-500">Welcome to SvelteKit</h1>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

	<div class="bg-red-500 outline-blue-2">
		<p>Hello there</p>
	</div>
	<button class="btn">Button</button>
	<button class="btn btn-primary">Button</button>
</template>

<style lang="postcss" global>
	body {
		& > p {
			@apply bg-green-500;
		}
	}
</style>
