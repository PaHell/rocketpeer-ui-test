<script context="module">
	import Icons from '@src/icons';
	const prefix = 'ri-';
</script>

<script lang="ts">
	export let name: Icons = Icons.HOME;
	export let css: string | undefined = undefined;
</script>

<template>
	<i class="icon {prefix}{name} {css} ri-fw" />
</template>

<style global lang="postcss">
	.icon {
		@apply text-[24px];
	}
</style>
