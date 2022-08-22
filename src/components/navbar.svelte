<script context="module" lang="ts">
	import Tooltip from '@src/components/Tooltip.svelte';
	import Image from '@src/components/Image.svelte';
	import Icon from '@src/components/Icon.svelte';
	import type NavMatch from '@src/navMatch';
	import type { App } from '@src/app';
	import NavLink from './NavLink.svelte';
</script>

<script lang="ts">
	export let items: App.UI.NavBarItem[] = [];
	export let css: string = '';
	export let vertical = false;
</script>

<template>
	<nav class="navbar {css}" class:vertical>
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
	.navbar {
		@apply flex;

		&.vertical {
			@apply flex-col;
			& > button {
				@apply w-full h-12;
			}
		}

		&:not(.vertical) {
			@apply flex-row w-full;
			& > button {
				@apply h-10 min-w-[3rem] justify-center;
			}
		}

		& > button {
			@apply flex items-center
			rounded;

			&:hover {
				@apply bg-gray-400;
			}
			&:active {
				@apply bg-gray-300;
			}
			&:hover,
			&:active {
				& > p,
				& > .icon {
					@apply text-sec;
				}
			}
			&.active {
				@apply bg-gray-200;
				& > p,
				& > .icon {
					@apply text-pri;
				}
			}

			& > .icon {
				@apply mx-2 text-tri;
				&:first-child:not(:last-child) {
					@apply mr-1;
				}
			}
			& > p {
				@apply mr-3 pt-[1px] text-tri;
				&:first-child:last-child {
					@apply mx-2;
				}
			}
		}
	}
</style>
