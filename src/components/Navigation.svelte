<script context="module">
    import { createEventDispatcher } from 'svelte';
    import { afterNavigate, goto } from '$app/navigation';
</script>

<script lang="ts">
    type T = $$Generic
	interface $$Slots {
		default: {
			item: T
			index: number
		}
	}
    export let items: T[];
    export let active: number = -1;
    export let match = (url: URL) => url.pathname;
    export let pathSelector = (item: T) => JSON.stringify(item);

    const dispatch = createEventDispatcher<{click: {from: T | undefined, to: T}}>();

    afterNavigate(({to}) => {
        const route = match(to);
        active = items.findIndex((s) => pathSelector(s) === route);
    });

    async function onClick(item: any, index: number) : Promise<void> {
        const from = items[active];
        active = index;
        await goto(pathSelector(items[active]));
        dispatch("click", {
            from,
            to: item
        });
    }
</script>

<template>
        {#each items as item, index}
            <button
                class:active={index === active}
                on:click|preventDefault={() => onClick(item, index)}>
                <slot {item} {index}/>
            </button>
        {/each}
</template>

<style global lang="postcss">
</style>
