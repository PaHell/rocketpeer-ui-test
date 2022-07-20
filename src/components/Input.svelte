<script context="module">
	import { onMount } from 'svelte';
</script>

<script lang="ts">
	export let placeholder: string;
	export let value: string;
	export let label: string | undefined = undefined;
	export let labelPosition: 0 | 1 | 2 | 3 = 0;
	export let focusOnMount = false;
	export let color:
		| 'primary'
		| 'secondary'
		| 'accent'
		| 'ghost'
		| 'info'
		| 'success'
		| 'warning'
		| 'error'
		| '' = '';
	/*
		input
		input-primary
		input-secondary
		input-accent
	*/
	export let size: 'xs' | 'sm' | 'md' | 'lg' | '' = '';
	export let disabled = false;
	export let bordered = false;

	let ref: HTMLInputElement | undefined;

	onMount(() => {
		if (focusOnMount) focus();
	});

	export function focus() {
		ref?.focus();
	}
</script>

<template>
	<div class="form-control w-full">
		{#if label}
			<label class="label" for={label ?? placeholder}>
				<span class="label-text">{labelPosition == 0 ? label : ''}</span>
				<span class="label-text-alt">{labelPosition == 1 ? label : ''}</span>
			</label>
		{/if}
		<input
			id={label ?? placeholder}
			name={label ?? placeholder}
			bind:this={ref}
			bind:value
			type="text"
			{placeholder}
			{disabled}
			class="input input-{color} input-{size} w-full"
			class:input-bordered={bordered}
		/>
		{#if label}
			<label class="label" for={label ?? placeholder}>
				<span class="label-text-alt">{labelPosition == 2 ? label : ''}</span>
				<span class="label-text-alt">{labelPosition == 3 ? label : ''}</span>
			</label>
		{/if}
	</div>
</template>

<style global lang="postcss">
	.icon {
		@apply text-[24px];
	}
</style>
