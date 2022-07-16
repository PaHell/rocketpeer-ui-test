<script context="module">
	import { onMount } from 'svelte';
</script>

<script lang="ts">
	export let placeholder: string;
	export let value: string;
	export let label: string | undefined = undefined;
	export let focusOnMount: boolean = false;

	let ref: HTMLInputElement | undefined;

	onMount(() => {
		if (!!ref && focusOnMount) setTimeout(() => ref?.focus(), 0);
	});
</script>

<template>
	<div class="form-control w-full max-w-xs">
		<label class="label">
			<span class="label-text">{label}</span>
			<span class="label-text-alt">Alt label</span>
		</label>
		<input
			bind:this={ref}
			bind:value
			type="text"
			{placeholder}
			class="input input-bordered w-full max-w-xs"
		/>
		<label class="label">
			<span class="label-text-alt">Alt label</span>
			<span class="label-text-alt">Alt label</span>
		</label>
	</div>
</template>

<style global lang="postcss">
	.icon {
		@apply text-[24px];
	}
</style>
