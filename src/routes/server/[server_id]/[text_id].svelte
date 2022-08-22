<script lang="ts" context="module">
	import Chat from '@src/components/chat/Chat.svelte';
	import Icon from '@src/components/Icon.svelte';
	import Icons from '@src/icons';
	import { page } from '$app/stores';
	import { textChannels, user, users } from '@src/store';
	import type { App } from '@src/app';
	import Button from '@src/components/Button.svelte';
	import { onMount } from 'svelte';
</script>

<script lang="ts">
	let textChannel: App.TextChannel | undefined;

	onMount(() => {
		textChannel = $textChannels.find((s) => s.id === $page.params.text_id);
	});
	textChannels.subscribe((val) => {
		textChannel = val.find((s) => s.id === $page.params.text_id);
	});
	page.subscribe((val) => {
		textChannel = $textChannels.find((s) => s.id === val.params.text_id);
	});

	function sendMessage(event: CustomEvent<string>): void {
		console.log('sendMessage', event.detail);
		// temp
		onMessage({
			content: event.detail,
			user_id: $user?.id
		});
	}

	function onMessage(message: App.Message): void {
		console.log('onMessage', message);
		message._user = $users.find((u) => u.id == message.user_id);
		textChannel?.messages.push(message);
	}
</script>

<template>
	{#if textChannel?.name}
		<header>
			<Icon name={Icons.TEXT_CHANNEL} css="text-tri" />
			<h1>{textChannel.name}</h1>
			<p class="text-sec">Hier könnte Ihre Werbung stehen!</p>
		</header>
		<main id="main-server">
			<Chat messages={textChannel.messages} on:send={sendMessage} />
		</main>
	{/if}
</template>

<style lang="postcss" global>
	#main-server {
		& > .chat {
			@apply h-full overflow-hidden;
		}
	}
</style>
