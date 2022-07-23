<script context="module">
</script>

<script lang="ts">
	export let src: string;
	export let alt: string;
</script>

<template>
	<div class="image">
		<img {src} {alt} />
	</div>
</template>

<style global lang="postcss">
	.image {
		@apply w-12 h-12 overflow-hidden
		flex justify-center items-center
		bg-gray-700 rounded;
		& > img {
			@apply w-auto h-full shadow;
			border-radius: inherit;
		}
	}
</style>
