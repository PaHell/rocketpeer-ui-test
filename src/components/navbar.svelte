<script context="module" lang="ts">
	import Tooltip from '@src/components/Tooltip.svelte';
	import Image from '@src/components/Image.svelte';
	import Icon from '@src/components/Icon.svelte';
	import type NavMatch from '@src/navMatch';
	import type { App } from '@src/app';
	import NavLink from "./NavLink.svelte";
</script>

<script lang="ts">
	export let items: App.UI.NavBarItem[] = [];
	export let css: string = '';
	export let vertical = false;
</script>

<template>
	<nav class="_navbar {css}" class:vertical>
		{#each items as item}
			<NavLink path={item.path} match={item.match}>
				{#if item.icon}
					<Icon name={item.icon} />
				{/if}
				{#if item.text}
					<p>{item.text}</p>
				{/if}
			</NavLink>
		{/each}
	</nav>
</template>

<style global lang="postcss">
	._navbar {
		@apply flex;

		&.vertical {
			@apply flex-col;
			& > button {
				@apply w-full;
			}
		}

		&:not(.vertical) {
			@apply flex-row w-full;
		}

		& > button {
			@apply flex items-center
			rounded;

			&:hover {
				@apply bg-gray-700;
			}
			&:active {
				@apply bg-gray-600;
			}
			&.active {
				@apply bg-accent-500;
			}

			& > .icon {
				@apply mx-2;
				&:first-child:not(:last-child) {
					@apply mr-1;
				}
			}
			& > p {
				@apply mr-3
				text-white;
				&:first-child:last-child {
					@apply mx-2;
				}
			}
		}
	}
</style>
