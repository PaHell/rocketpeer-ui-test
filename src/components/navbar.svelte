<script context="module">
    import { createEventDispatcher, onMount } from 'svelte';
    import { afterNavigate, goto } from '$app/navigation';
    import Image from '@src/components/Image.svelte';
    import Icon from '@src/components/Icon.svelte';
import { is_empty } from 'svelte/internal';
</script>

<script lang="ts">
    export let items: App.UI.NavBarItem[];
    export let active: number = -1;
    export let css: string | undefined = undefined;
    export let showText: boolean = false;

    const dispatch = createEventDispatcher<{click: {from: App.UI.NavBarItem | undefined, to: App.UI.NavBarItem}}>();

    afterNavigate(({to}) => {
        const split = to.pathname.split("/");
        const relative = '/' + split[split.length - 1];
        active = items.findIndex((s) => s.path?.includes(relative));
    });

    function onClick(item: App.UI.NavBarItem, index: number) : void {
        const before = active;
        active = index;
        if (item.onClick) item.onClick();
		if (item.path) goto(item.path);
        dispatch("click", {
            from: items[before],
            to: items[active]
        });
    }
</script>

<template>
    <div class="_navbar {css}" class:show-text={showText}>
        {#each items as item, index}
            <button
                data-tooltip={showText ? '' : item.name}
                class={item.css}
                class:active={index === active}
                on:click|preventDefault={() => onClick(item, index)}>
                <div>
                    {#if item.img}
                    <Image src={item.img} alt={item.name}/>
                    {:else if item.icon}
                    <Icon name={item.icon}/>
                    {/if}
                    {#if showText}
                    <p>{item.name}</p>
                    {/if}
                </div>
            </button>
        {/each}
    </div>
</template>

<style global lang="postcss">
    ._navbar {
        @apply flex bg-gray-900;

            & > button {
                @apply flex justify-center items-center
                p-2 transition-colors;
                & > div {
                    @apply overflow-hidden
                    flex items-center
                    bg-gray-800 rounded-full
                    text-accent
                    transition-all ease-linear;
                    & > .icon {
                        @apply w-12 h-12
                        leading-[3rem];
                        &:first-child:not(:last-child) {
                            @apply w-auto h-auto pl-1
                            leading-none;
                        }
                    }
                    
                    & > p {
                        @apply px-2 pt-1 pb-[0.3rem];
                        &:last-child:not(:first-child) {
                            @apply pl-0 pr-3;
                        }
                    }
                }
                &:hover,
                &:active,
                &.active {
                    & > div {
                        @apply bg-accent rounded-xl text-white;
                    }
                }
    
            }

            &.show-text {

                & > button {
                    &:not(:first-child) {
                        @apply -ml-2;
                    }
                    & > div {
                        @apply rounded;
                    }
                }
            }
    }
</style>
