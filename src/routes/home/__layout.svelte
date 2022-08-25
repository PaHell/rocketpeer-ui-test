<script context="module" lang="ts">
	import MainLayout from '@src/components/MainLayout.svelte';
	import Button from '@src/components/Button.svelte';
	import Icons from '@src/icons';
	import NavBar from '@src/components/NavBar.svelte';
	import NavMatch from '@src/navMatch';
	import Input from '@src/components/Input.svelte';
	import Icon from '@src/components/Icon.svelte';
	import UserImage from '@src/components/UserImage.svelte';
	import { users } from '@src/store';
	import { goto } from '$app/navigation';
import Modal from '@src/components/Modal.svelte';
import NavLink from '@src/components/NavLink.svelte';
</script>

<script lang="ts">
	let search: string = '';
	let searchOpened = false;
	let newMessageOpened = false;
	let top: App.UI.NavBarItem[] = [
		{
			icon: Icons.FRIEND,
			text: 'Friends',
			path: '/home/friends/online',
			match: NavMatch.EXCEPT_LAST
		},
		{
			icon: Icons.KNOWN,
			text: 'Known People',
			path: '/home/known/online',
			match: NavMatch.EXCEPT_LAST
		}
	];
</script>

<template>
	<Modal bind:opened={searchOpened}>
		<p>Search</p>
	</Modal>
	<Modal bind:opened={newMessageOpened}>
		<p>New Message</p>
	</Modal>
	<MainLayout>
		<header class="sidebar">
			<Button css="messages-search" on:click={() => searchOpened = true} text="Search in messages" />
		</header>
		<aside>
			<NavBar items={top} css="p-2" vertical />
			<div class="dm-list">
				<header>
					<p>Direct Messages</p>
					<Button on:click={() => newMessageOpened = true} icon={Icons.ADD} />
				</header>
				<ul class="list">
					{#each $users as user}
						<NavLink path={'/home/message/' + user.id}>
							<UserImage {user} />
							<p>{user.name}</p>
						</NavLink>
					{/each}
				</ul>
			</div>
		</aside>
		<slot />
	</MainLayout>
</template>

<style global lang="postcss">
	.dm-list {
		& > header {
			@apply w-full flex items-center px-4;
			& > p {
				@apply flex-1 uppercase
				font-semibold
				text-sm text-sec;
				letter-spacing: 0.5px;
			}
		}
		& > .list {
			@apply px-2;
			& > button {
				@apply flex items-center p-1 text-tri;
				& > .user-image {
					@apply mr-2;
				}
			}
		}
	}

	.messages-search {
		@apply bg-gray-700 justify-start !important;
		& > p {
			@apply text-sec;
		}
	}
</style>
