<script context="module" lang="ts">
	import MainLayout from "@src/components/MainLayout.svelte";
	import Button from "@src/components/Button.svelte";
	import Icon from "@src/components/Icon.svelte";
	import Icons from "@src/icons";
	import UserImage from "@src/components/UserImage.svelte";
	import { servers, users } from "@src/store";
	import type { App } from "@src/app";
	import { onMount } from "svelte";
	import { page } from "$app/stores";

	export async function load({ session, url }): Promise<LoadOutput> {
		return { props: {} };
	}
</script>

<script lang="ts">
	export let server : App.Server | undefined;

	$: {
		server = $servers.find(s => s.id === $page.params.id);
	}
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
						<Button
							on:click={() => {}}
							icon={Icons.TEXT_CHANNEL}
							text="teletext">
						</Button>	
						<Button
							on:click={() => {}}
							icon={Icons.VOICE_CHANNEL}
							text="Die Gruppe">
						</Button>
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
