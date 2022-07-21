<script context="module">
	import Icon from './Icon.svelte';
	import Icons from '@src/icons';
</script>

<script lang="ts">
	export let server: App.Server | undefined;
</script>

<template>
	<div class="server-image">
		<div>
			{#if server?.img}
                <img src={server.img} alt="" />
            {:else}
                <Icon name={Icons.SERVER} />
			{/if}
		</div>
	</div>
</template>

<style global lang="postcss">
	.server-image {
		& > * {
			@apply w-12 h-12;
		}
		& > div {
			@apply flex justify-center items-center
			overflow-hidden
			bg-gray-700 rounded-full;
			& > img {
				@apply w-auto h-full;
			}
		}
	}
</style>
