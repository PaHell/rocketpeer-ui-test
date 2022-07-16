<script context="module" lang="ts">
	import Navbar from './components/navbar/navbar.svelte';
	let maurice: never | 'uses' | any | 'typescript';
</script>

<script>
</script>

<template>
	<div>
		<div class="flex">
			<Navbar />
		</div>
	</div>
</template>

<style lang="postcss" global>
	body {
		& > p {
			@apply bg-green-500;
		}
	}
</style>
