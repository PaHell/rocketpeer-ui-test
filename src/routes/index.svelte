<script context="module">
	import Navbar from './components/navbar/navbar.svelte';
</script>

<script>
</script>

<template>
	<div>
		<div>
			<Navbar />
		</div>
		<h1 class="text-3xl text-red-500">Hello World</h1>
	</div>
</template>

<style lang="postcss" global>
	body {
		& > p {
			@apply bg-green-500;
		}
	}
</style>
