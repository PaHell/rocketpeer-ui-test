<script lang="ts" context="module">
	import Chat from '@src/components/chat/Chat.svelte';
	import Icon from '@src/components/Icon.svelte';
	import Icons from '@src/icons';
	import { page } from '$app/stores';
	import { user, users } from '@src/store';
	import type { App } from '@src/app';
import Button from '@src/components/Button.svelte';
</script>

<script lang="ts">
	let messages: App.Message[] = [
		{
			content: 'Hello',
			user_id: 'davidnoah'
		},
		{
			content: 'Hello there.',
			user_id: 'redesiigner'
		},
		{
			content: 'stfu',
			user_id: 'muskatnuzz'
		}
	];

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
		messages.push(message);
		messages = messages;
	}
</script>

<template>
	<header>
		<Icon name={Icons.TEXT_CHANNEL} css="text-tri"/>
		<h1>teletext</h1>
		<p class="text-sec">Hier könnte Ihre Werbung stehen!</p>
	</header>
	<main id="main-server">
		<Chat {messages} on:send={sendMessage}/>
	</main>
</template>

<style lang="postcss" global>
	#main-server {
		& > .chat {
			@apply h-full overflow-hidden;
		}
	}
</style>
