<script lang="ts" context="module">
	import { onMount } from 'svelte';
	import Message from '@src/components/chat/Message.svelte';
	import type { App } from '@src/app';
	import { users } from '@src/store';
</script>

<script lang="ts">
	export let messages: App.Message[] = [];

	let ref: HTMLDivElement | undefined;
	let length = 0;

	onMount(() => {
		messages.map((msg) => {
			msg._user = $users.find((u) => u.id === msg.user_id);
		});
		messages = messages;
	});

	export function scrollToBottom() {
		if (ref) ref.scrollTop = 99999;
	}
</script>

<template>
	<div bind:this={ref} class="conversation">
		{#each messages as message}
			<Message {message} />
		{/each}
	</div>
</template>

<style global lang="postcss">
	.conversation {
		@apply overflow-y-scroll
		flex-1
		pb-4 pt-8;

		& > div {
			@apply px-4 flex justify-end;
			&.self {
				& > *:not(:last-child) {
					@apply mr-2;
				}
				& > .bubble {
					@apply rounded-br-none;
				}
			}
			&:not(.self) {
				@apply flex-row-reverse;
				& > *:not(:first-child) {
					@apply mr-2;
				}
				& > .bubble {
					@apply bg-gray-900 rounded-bl-none;
				}
			}

			& > .bubble {
				@apply bg-accent-500 p-2 rounded-md;
			}

			& > .image {
				@apply flex items-end;
			}
		}
	}
</style>
