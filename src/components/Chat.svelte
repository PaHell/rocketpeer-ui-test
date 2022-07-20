<script context="module" lang="ts">
    import Input from "@src/components/Input.svelte";
    import Conversation from "@src/components/Conversation.svelte";
    import Button from "./Button.svelte";
    import Icons from "@src/icons";
import { createEventDispatcher } from "svelte";
import type { SvelteComponentDev } from "svelte/internal";
</script>

<script lang="ts">
    export let messages : App.Message[] = [];
    export let users : App.User[] = [];
    export let self : App.User | undefined;

    let refConversation : SvelteComponentDev | undefined;

    const dispatch = createEventDispatcher<{ send: string }>();
    
    let input =  "";

    function send() {
        dispatch('send', input);
        //input = "";
        setTimeout(refConversation?.scrollToBottom, 0);
    }

</script>

<template>
    <div class="chat">
        <header>
            <slot/>
        </header>
        <Conversation bind:this={refConversation} bind:messages bind:users bind:self/>
        <footer>
            <Input
                placeholder="Type a message..."
                color="primary"
                bind:value={input}
                bordered
                focusOnMount />
            <Button
                on:click={send}
                icon={Icons.CONTINUE}
                text="Send"
                color="primary"
                disabled={!input}
                reverse
            />
        </footer>
    </div>
</template>

<style lang="postcss" global>
    .chat {
        @apply flex flex-col;
        & > header,
        & > footer {
            @apply bg-gray-700 shadow relative;
        }
        & > header {
            @apply flex justify-center items-center h-16;
            & > h1 {
                @apply px-4;
            }
        }
        & > .conversation {
            @apply flex-1 flex-shrink-0;
            @media screen and (-webkit-min-device-pixel-ratio:0) {
                width: calc(100% + 17px);
            }
        }
        & > footer {
            @apply flex p-4;
            & > *:not(:last-child) {
                @apply mr-2;
            }
        }
    } 
</style>
