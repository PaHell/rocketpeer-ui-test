<script context="module" lang="ts">
	import MainLayout from '@src/components/MainLayout.svelte';
	import Button from '@src/components/Button.svelte';
	import Icon from '@src/components/Icon.svelte';
	import Icons from '@src/icons';
	import UserImage from '@src/components/UserImage.svelte';
	import { users, servers, voiceChannels, textChannels, connectedVoiceChannel, user } from '@src/store';
	import type { App } from '@src/app';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
import NavLink from '@src/components/NavLink.svelte';
import Modal from '@src/components/Modal.svelte';

	export async function load({ session, url }): Promise<LoadOutput> {
		return { props: {} };
	}
</script>

<script lang="ts">
	export let server: App.Server | undefined;
	export let channels: (App.TextChannel | App.VoiceChannel)[] = [];
	let addChannelOpened = false;

	onMount(() => {
		server = $servers.find((s) => s.id === $page.params.server_id);
		channels = [
			...$textChannels.filter((s) => s.server_id === $page.params.server_id),
			...$voiceChannels.filter((s) => s.server_id === $page.params.server_id)
		];
		channels = channels.sort((c) => c.order);
		console.log($textChannels);
	});
	page.subscribe((val) => {
		console.log('page change', val);
		server = $servers.find((s) => s.id === val.params.server_id);
		channels = [
			...$textChannels.filter((s) => s.server_id === val.params.server_id),
			...$voiceChannels.filter((s) => s.server_id === val.params.server_id)
		];
		channels = channels.sort((c) => c.order);
	});
	servers.subscribe((val) => {
		console.log('servers change', val);
		server = val.find((s) => s.id === $page.params.server_id);
	});
	textChannels.subscribe((val) => {
		console.log('text change', val);
		channels = [
			...val.filter((s) => s.server_id === $page.params.server_id),
			...$voiceChannels.filter((s) => s.server_id === $page.params.server_id)
		];
		channels = channels.sort((c) => c.order);
	});
	voiceChannels.subscribe((val) => {
		console.log('voice change', val);
		channels = [
			...$textChannels.filter((s) => s.server_id === $page.params.server_id),
			...val.filter((s) => s.server_id === $page.params.server_id)
		];
		channels = channels.sort((c) => c.order);
	});

	function connect(channel_id: string) {
		if ($connectedVoiceChannel === channel_id) return;
		console.warn("connect to", {channel_id});
		if ($connectedVoiceChannel) {
			// disconnect
			voiceChannels.update(value => {
				const channel = value.find(c => c.id === $connectedVoiceChannel);
				if (!channel || !$user) return value;
				channel.connectedUsers = channel.connectedUsers.filter(u => u.id !== $user.id);
				return value;
			})
		}
		// connect
		connectedVoiceChannel.set(channel_id);
		voiceChannels.update(value => {
			const channel = value.find(c => c.id === channel_id);
			if (!channel || !$user) return value;
			channel.connectedUsers.push($user);
			return value;
		})
	}
</script>

<template>
	<Modal bind:opened={addChannelOpened}>
		<p>Add Channel</p>
	</Modal>
	{#if server}
		<MainLayout>
			<header class="sidebar">
				<Button on:click={() => {}} color="secondary">
					<h1>{server.name}</h1>
					<Icon name={Icons.DROPDOWN} />
				</Button>
			</header>
			<aside>
				<div class="channel-group">
					<header>
						<Button on:click={() => {}} color="secondary" small>
							<Icon name={Icons.DROPDOWN} />
							<p class="text-sec">Channels</p>
						</Button>
						<Button on:click={() => addChannelOpened = true} icon={Icons.ADD} />
					</header>
					<ul class="list">
						{#each channels as channel}
							{#if Object.hasOwn(channel, 'messages')}
								<NavLink
									css="text"
									path={`/server/${server?.id}/${channel.id}`}
								>
									<Icon name={Icons.TEXT_CHANNEL}/>
									<p>{channel.name}</p>
								</NavLink>
							{:else}
							<button class="voice" on:click={() => connect(channel.id)} class:active={channel.id === $connectedVoiceChannel}>
								<Icon name={Icons.VOICE_CHANNEL}/>
								<p>{channel.name}</p>
							</button>
							{#if channel.connectedUsers}
								<ul class="list">
									{#each channel.connectedUsers as user}
									<button on:click={() => {}} color="secondary">
										<UserImage {user} />
										<p>{user.name}</p>
									</button>
									{/each}
								</ul>
								{/if}
							{/if}
						{/each}
					</ul>
				</div>
			</aside>
			<svelte:fragment slot="right">
				<div class="role-group">
					<p>Admins</p>
					<ul class="list">
						{#each $users as user}
							<Button on:click={() => {}} color="secondary">
								<UserImage {user} />
								<p>{user.name}</p>
							</Button>
						{/each}
					</ul>
				</div>
			</svelte:fragment>
			<slot />
		</MainLayout>
	{:else}
		<p>Loading...</p>
	{/if}
</template>

<style global lang="postcss">
	.channel-group {
		@apply p-2;
		& > header {
			@apply w-full flex items-center;
			& > .btn {
				&:first-child {
					@apply p-0 flex-1 justify-start;
					& > p {
						@apply uppercase;
						letter-spacing: 0.5px;
					}
				}
			}
		}
		& > .list {
			& > button {
				@apply flex justify-start items-center text-tri;
				& > .icon {
					@apply mr-2 ml-1;
				}
				& > p {
					@apply mt-[1px] text-sec;
				}
				&:hover {
					& > p {
						@apply text-pri;
					}
				}
				&.active:not(:hover) {
					&.voice {
						@apply bg-transparent;
					}
				}

			}
			& > .list {
				padding-left: calc(24px + .75rem);
				& > button {
					@apply p-1 flex justify-start items-center;
					& > .user-image {
						@apply mr-2;
					}
				}
			}
		}
	}
	.role-group {
		@apply p-2;
		&:first-child {
			@apply pt-4;
		}
		&:last-child {
			@apply pb-4;
		}
		& > p {
			@apply px-2
			text-sm uppercase text-tri font-semibold;
			letter-spacing: 0.5px;
		}
		& > .list {
			& > .btn {
				@apply justify-start text-tri;
				& > .user-image {
					@apply mr-1;
				}
			}
		}
	}
</style>
