<script context="module">
    import { createEventDispatcher } from 'svelte';
</script>

<script lang="ts">
    export let items: any[];
    export let active: any;
    export let css: string | undefined = undefined;

    const dispatch = createEventDispatcher<{click: any}>();

    function onClick(item: any) : void {
        active = item;
        dispatch("click", item);
    }
</script>

<template>
    <div class="dock {css}">
        {#each items as item, index}
            <button class:active={item === active} on:click|preventDefault={() => onClick(item)}>
                <slot {item} {index}/>
            </button>
        {/each}
    </div>
</template>

<style global lang="postcss">
    .dock {
        @apply flex bg-gray-900;

            & > button {
                @apply flex justify-center items-center
                p-2 transition-colors;
                &:hover,
                &:active,
                &.active {
                    & > .icon,
                    & .server-image > div {
                        @apply bg-accent rounded-xl
                        text-white;
                    }
                }
    
                & > .icon {
                    @apply w-12 h-12
                    text-accent
                    leading-[3rem] rounded-full;
                }
    
                & > .icon,
                & .server-image > div {
                    @apply bg-gray-800
                    transition-all ease-linear;
                }
            }
    }
</style>
