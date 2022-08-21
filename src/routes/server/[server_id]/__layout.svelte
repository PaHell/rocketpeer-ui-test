<script context="module" lang="ts">
	import MainLayout from "@src/components/MainLayout.svelte";
	import Button from "@src/components/Button.svelte";
	import Icon from "@src/components/Icon.svelte";
	import Icons from "@src/icons";
	import UserImage from "@src/components/UserImage.svelte";
	import { users, servers, voiceChannels, textChannels } from "@src/store";
	import type { App } from "@src/app";
	import { onMount } from "svelte";
	import { page } from "$app/stores";

	export async function load({ session, url }): Promise<LoadOutput> {
		return { props: {} };
	}
</script>

<script lang="ts">
import NavLink from "@src/components/NavLink.svelte";
import { append } from "svelte/internal";
import { goto } from "$app/navigation";

	export let server : App.Server|undefined;
	export let channels : (App.TextChannel|App.VoiceChannel)[] = [];

	onMount(() => {
		server = $servers.find(s => s.id === $page.params.server_id);
		channels = [
			...$textChannels.filter(s => s.server_id === $page.params.server_id),
			...$voiceChannels.filter(s => s.server_id === $page.params.server_id),
		];
		channels = channels.sort(c => c.order);
		console.log($textChannels);
	});
	page.subscribe(val => {
		server = $servers.find(s => s.id === val.params.server_id);
		channels = [
			...$textChannels.filter(s => s.server_id === val.params.server_id),
			...$voiceChannels.filter(s => s.server_id === val.params.server_id),
		];
		channels = channels.sort(c => c.order);
	});
	servers.subscribe(val => {
		server = val.find(s => s.id === $page.params.server_id);
	});
	textChannels.subscribe(val => {
		channels = [
			...val.filter(s => s.server_id === $page.params.server_id),
			...$voiceChannels.filter(s => s.server_id === $page.params.server_id),
		];
		channels = channels.sort(c => c.order);
	});
	voiceChannels.subscribe(val => {
		channels = [
			...$textChannels.filter(s => s.server_id === $page.params.server_id),
			...val.filter(s => s.server_id === $page.params.server_id),
		];
		channels = channels.sort(c => c.order);
	});
</script>

<template>
	{#if server}
		<MainLayout>
			<header class="sidebar">
				<Button
					on:click={() => {}}
					color="secondary">
					<h1>{server.name}</h1>
					<Icon name={Icons.DROPDOWN}/>
				</Button>	
			</header>
			<aside>
				<div class="channel-group">
					<header>
						<Button
							on:click={() => {}}
							color="secondary"
							small>
							<Icon name={Icons.DROPDOWN}/>
							<p class="text-sec">Channels</p>
						</Button>	
						<Button
							on:click={() => {}}
							icon={Icons.ADD}
						/>
					</header>
					<ul class="list">
						{#each channels as channel}
						{#if Object.hasOwn(channel, "messages")}
							<Button
								on:click={() => goto(`/server/${server?.id}/${channel.id}`)}
								icon={Icons.TEXT_CHANNEL}
								text={channel.name}>
							</Button>	
						{:else}
							<Button
								on:click={() => goto(`/server/${server?.id}/${channel.id}`)}
								icon={Icons.VOICE_CHANNEL}
								text={channel.name}>
							</Button>
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
							<Button
								on:click={() => {}}
								color="secondary">
								<UserImage user={user}/>
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
			& > .btn {
				@apply justify-start text-tri;
				& > .icon {
					@apply mr-2;
				}
			}
		}
	}
	.role-group {
		@apply p-2;
		&:first-child { @apply pt-4; }
		&:last-child { @apply pb-4; }
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
