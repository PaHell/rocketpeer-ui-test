<script context="module">
	import UserImage from '../UserImage.svelte';
</script>

<script lang="ts">
	export let message: App.Message;
	export let self: App.User | undefined;
</script>

<template>
	<div class="message" class:self={message._user?.id === self?.id}>
		<div class="bubble">
			<p class="text-xs">{message._user?.name}</p>
			<p>{message.content}</p>
		</div>
		<div class="image">
			<UserImage user={message._user} />
		</div>
	</div>
</template>

<style global lang="postcss">
	.message {
		@apply flex justify-end py-2
    select-none
    transition-colors;
		&:hover {
			@apply bg-gray-700;
		}
		&:active {
			@apply bg-gray-600;
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
				@apply bg-gray-900 rounded-bl-none;
			}
		}

		& > .bubble {
			@apply bg-primary p-2 rounded-md
        text-white;
			& > p {
				&:first-child {
					@apply opacity-50;
				}
			}
		}

		& > .image {
			@apply flex items-end;
		}
	}
</style>
