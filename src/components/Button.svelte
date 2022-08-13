<script lang="ts" context="module">
	import Icon from '@src/components/Icon.svelte';
	import type Icons from '@src/icons';
	import { onMount } from 'svelte';
</script>

<script lang="ts">
	export let icon: Icons | undefined = undefined;
	export let text: string | undefined = undefined;
	export let color:
		| 'primary'
		| 'secondary'
		| 'accent'
		| 'success'
		| 'warning'
		| 'danger'
		| 'link' = 'secondary';
	/*
		btn
		btn-primary
		btn-secondary
		btn-accent
	*/
	export let active = false;
	export let disabled = false;
	export let loading = false;
	export let focusOnMount = false;
	export let small = false;
	export let css = "";

	let ref: HTMLButtonElement | undefined;

	onMount(() => {
		if (focusOnMount) focus();
	});

	export function focus() {
		ref?.focus();
	}
</script>

<template>
	<button
		bind:this={ref}
		on:click
		{disabled}
		class="btn btn-{color} {css}"
		class:btn-active={active}
		class:btn-small={small}
	>
		{#if icon}
			<Icon name={icon} />
		{/if}
		{#if text}
			<p>{text}</p>
		{/if}
		<slot/>
	</button>
</template>

<style global lang="postcss">
	.btn {
		@apply flex items-center justify-center
		flex-shrink-0
		h-10 px-2 min-w-[1.5rem] rounded
		text-white;

		& > p {
			@apply mt-[1px] px-1;
		}
		& > .icon {
			@apply w-[24px];
		}

		&.btn-small {
			@apply h-8;
			& > p {
				@apply text-sm font-semibold
				overflow-hidden whitespace-nowrap text-ellipsis;
			}
		}

		&.btn-primary {
			@apply bg-button-normal;
			&:hover { @apply bg-button-hover; }
			&:active { @apply bg-button-active; }
		}
		&.btn-secondary,
		&.btn-link {
			@apply bg-transparent;
			& > .icon { @apply text-tri; }
			&:hover {
				& > .icon { @apply text-sec; }
			}
			&:active {
				& > .icon { @apply text-pri; }
			}
		}
		&.btn-accent {
			@apply bg-accent-500;
			&:hover { @apply bg-accent-400; }
			&:active { @apply bg-accent-600; }
		}
		&.btn-success {
			@apply bg-success-500;
			&:hover { @apply bg-success-400; }
			&:active { @apply bg-success-600; }
		}
		&.btn-warning {
			@apply bg-warning-500;
			&:hover { @apply bg-warning-400; }
			&:active { @apply bg-warning-600; }
		}
		&.btn-danger {
			@apply bg-danger-500;
			&:hover { @apply bg-danger-400; }
			&:active { @apply bg-danger-600; }
		}
		&.btn-link {
			&:hover {
				& > p {
					@apply underline;
				}
			}
		}
	}
</style>
