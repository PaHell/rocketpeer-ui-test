<script context="module" lang="ts">
	import Input from '@src/components/Input.svelte';
	import Conversation from '@src/components/chat/Conversation.svelte';
	import Button from '@src/components/Button.svelte';
	import Icons from '@src/icons';
	import { createEventDispatcher } from 'svelte';
	import type { SvelteComponentDev } from 'svelte/internal';
</script>

<script lang="ts">
	export let messages: App.Message[] = [];

	let refConversation: SvelteComponentDev | undefined;

	const dispatch = createEventDispatcher<{ send: string }>();

	let input = '';

	function send() {
		dispatch('send', input);
		//input = "";
		setTimeout(refConversation?.scrollToBottom, 0);
	}

	function openShare() {}
</script>

<template>
	<div class="chat">
		<Conversation bind:this={refConversation} bind:messages />
		<footer>
			<Button on:click={openShare} icon={Icons.UPLOAD} />
			<Input
				placeholder="Type a message..."
				color="accent"
				bind:value={input}
				bordered
				focusOnMount
			/>
			<Button on:click={send} icon={Icons.CONTINUE} text="Send" color="accent" disabled={!input} />
		</footer>
	</div>
</template>

<style lang="postcss" global>
	.chat {
		@apply flex flex-col;
		& > .conversation {
			@apply flex-1 flex-shrink-0;
			@media screen and (-webkit-min-device-pixel-ratio: 0) {
				width: calc(100% + 17px);
			}
		}
		& > footer {
			@apply flex m-4 relative
			bg-gray-400 rounded shadow;
			& > *:not(:last-child) {
				@apply mr-2;
			}
		}
	}
</style>
