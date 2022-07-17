<script lang="ts" context="module">
	import Icon from "@src/components/Icon.svelte";
	import type Icons from "@src/icons";
import { onMount } from "svelte";
</script>

<script lang="ts">
	export let icon : Icons | undefined = undefined;
	export let text : string | undefined = undefined;
	export let color : 'primary' | 'secondary' | 'accent'| 'ghost' | 'link' | 'info' | 'success' | 'warning' | 'error' | '' = '';
	export let size : 'xs' | 'sm'| 'lg' | '' = '';
	export let form : 'circle' | 'square'| '' = '';
	export let width : 'wide' | 'block'| '' = '';
	export let active = false;
	export let disabled = false;
	export let outlined = false;
	export let loading = false;
	export let reverse = false;
	export let focusOnMount = false;
	// this is ugly af
	export let glass = false;

	let ref : HTMLButtonElement | undefined;

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
		class="btn btn-{color} btn-{size} btn-{form} btn-{width}"
		class:glass
		class:loading
		class:flex-row-reverse={reverse}
		class:btn-active={active}
		class:btn-outline={outlined}>
		{#if icon}
			<Icon name={icon}/>
		{/if}
		{#if text}
			<p>{text}</p>
		{/if}
	</button>
</template>

<style global lang="postcss">
</style>
