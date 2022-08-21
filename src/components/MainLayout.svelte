<script context="module">
</script>

<script lang="ts">
import Icons from "@src/icons";

import Button from "./Button.svelte";
import UserImage from "./UserImage.svelte";
import { user } from "@src/store";
import { goto } from "$app/navigation";


</script>

<template>
	<div class="main-layout" class:show-right={!!$$slots.right}>
		<slot />
		<footer class="sidebar">
			<UserImage user={$user} />
			<main>
				<p>{$user?.name}</p>
				<p class="text-sm text-sec">#{$user?.id}</p>
			</main>
			<Button
				on:click={() => {}}
				icon={Icons.MICROPHONE}
			/>
			<Button
				on:click={() => {}}
				icon={Icons.SPEAKER}
			/>
			<Button
				on:click={() => goto("/settings")}
				icon={Icons.SETTINGS}
			/>
		</footer>
		<aside class="right">
			<slot name="right"/>
		</aside>
	</div>
</template>

<style global lang="postcss">
	.main-layout {
		@apply grid w-full h-full;
		grid-template-areas:
			'headerSidebar headerContent headerContent'
			'sidebarL      content       sidebarR'
			'footerSidebar content       sidebarR';
		grid-template-rows: 4rem auto 4rem;
		grid-template-columns: 16rem auto 0;
		
		&.show-right {
			grid-template-columns: 16rem auto 16rem;
		}

		& > header,
		& > footer {
			@apply flex items-center
			relative;
			box-shadow: 0 2px 2px -2px rgba(0,0,0, .75);
		}
		& > header.sidebar {
			grid-area: headerSidebar;
			@apply flex p-2 bg-gray-600;

			& > .btn:first-child:last-child {
				@apply flex-1;
			}
		}
		& > header:not(.sidebar) {
			grid-area: headerContent;
			@apply flex px-4 bg-gray-500;
			& > h1 {
				@apply pl-1;
			}
			& > p {
				@apply pl-3 flex items-center;

				&:before {
					content: "";
					@apply block h-6 mr-3
					border-l border-gray-300;
				}
			}
		}
		& > aside:not(.right) {
			grid-area: sidebarL;
			@apply bg-gray-600;
		}
		& > aside.right {
			grid-area: sidebarR;
			@apply bg-gray-600;
		}
		& > main {
			grid-area: content;
			@apply bg-gray-500;
		}
		& > footer.sidebar {
			grid-area: footerSidebar;
			@apply flex px-2
			bg-gray-800;

			& > main {
				@apply flex-1 px-2 overflow-hidden;

				& > p {
					@apply overflow-hidden whitespace-nowrap text-ellipsis;
				}
			}
		}
	}
</style>
