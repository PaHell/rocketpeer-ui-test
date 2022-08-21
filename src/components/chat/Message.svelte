<script lang="ts" context="module">
	import UserImage from '../UserImage.svelte';
	import {user} from '@src/store';
	import type {App } from '@src/app';
</script>

<script lang="ts">
	export let message: App.Message;
</script>

<template>
	<div class="message" class:self={message._user?.id === $user?.id}>
		<div class="bubble">
			<p class="text-xs">{message._user?.name}</p>
			<p>{message.content}</p>
		</div>
		<UserImage user={message._user} />
	</div>
</template>

<style global lang="postcss">
	.message {
		@apply flex justify-end py-2
    select-none
    transition-colors;
		&:hover,
		&:active {
			@apply bg-gray-550;
		}
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
				@apply bg-gray-700 rounded-bl-none;
			}
		}
		
		& > .bubble {
			@apply bg-accent-500 p-2 rounded-md;
			& > p:first-child { @apply opacity-50; }
		}

		& > .image {
			@apply flex items-end;
		}
	}
</style>
