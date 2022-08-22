<script lang="ts" context="module">
	import { page } from '$app/stores';
</script>

<script lang="ts">
</script>

<template>
	<div id="error">
		<h1>{$page.status}</h1>
		<p class="text-sec">{$page?.error?.message}</p>
	</div>
</template>

<style global lang="postcss">
	#error {
		@apply flex flex-col
		items-center justify-center
		h-full;

		& > h1 {
			@apply text-[8rem] leading-none;
		}
	}
</style>
