<script context="module">
</script>

<script lang="ts">
	export let css = "";
    export let opened = false;
</script>

<template>
    {#if opened}
        <div class="modal {css}" on:click|self={() => opened = false}>
            <main>
                <slot/>
            </main>
        </div>
    {/if}
</template>

<style global lang="postcss">
	.modal {
		@apply w-full h-full p-8
        fixed inset-0 z-40
        flex flex-col items-center justify-start
		bg-gray-900 bg-opacity-80;
		& > main {
			@apply w-full max-w-3xl
            bg-gray-600 shadow-2xl
            rounded-lg;
		}
	}
</style>
