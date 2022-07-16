<script context="module" lang="ts">
	import Input from '@src/components/Input.svelte';
</script>

<script>
	let username = '';
</script>

<template>
	<div>
		<div class="flex">
			<Input label="Username" placeholder="Maurice" bind:value={username} focusOnMount />
		</div>
	</div>
</template>

<style lang="postcss">
</style>
