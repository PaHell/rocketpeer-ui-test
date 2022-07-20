<script context="module">
	import { onMount } from "svelte";
	import Message from "@src/components/Message.svelte";
</script>

<script lang="ts">
	export let messages: App.Message[] = [];
	export let users: App.User[] = [];
	export let self: App.User | undefined;

	let ref : HTMLDivElement | undefined;
	let length = 0;

	onMount(() => {
		messages.map(msg => {
			msg._user = users.find(u => u.id === msg.user_id);
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
			<Message {message} {self}/>
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
				& > *:not(:last-child) { @apply mr-2; }
				& > .bubble {@apply rounded-br-none; }
			}
			&:not(.self) {
				@apply flex-row-reverse;
				& > *:not(:first-child) { @apply mr-2; }
				& > .bubble {
					@apply bg-gray-900 rounded-bl-none;
				}
			}

			& > .bubble {
				@apply bg-accent p-2 rounded-md
				text-white;
				& > p {
					&:first-child { @apply opacity-50; }
				}
			}

			& > .image {
				@apply flex items-end;
			}
		}
	}
</style>
