<script lang="ts">
	import Icon from '@src/icons/notification_close.svg';
	let show: Boolean = false;
	import { onMount } from 'svelte';
	// all the Notification Center Stuff happening here :}
	import { center } from '@src/NotificationStore';

	const handleDismiss = (message: string) => {
		center.dismiss(message);

		if ($center.length === 0) {
			show = false;
		}
	};

	const handlePopup = () => {
		if ($center.length === 0) {
			show = false;
		} else {
			show = !show;
		}
	};

	const clearAll = () => {
		center.clear();
		show = false;
	};

	onMount(() => {
		center.init([
			'Maurice is playing a game',
			'Maurice is listening to spotify',
			'Maurice is watching a movie',
			'Maurice is watching a show',
			'Maurice is watching a game'
		]);
	});
</script>

<template>
	<!-- notification center in header-->
	<button class="relative" on:click={handlePopup}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="w-6 h-6"
		>
			<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
			<path d="M13.73 21a2 2 0 0 1-3.46 0" />
		</svg>
		{#if $center.length}
			<span class="badge">{$center.length}</span>
		{/if}
	</button>

	{#if show && $center.length}
		<!-- button to close popup -->
		<button
			tabindex="-1"
			class="fixed inset-0 w-full h-full cursor-default focus:outline-none"
			on:click|preventDefault={() => (show = false)}
		/>

		<div
			class="absolute right-4 p-3 mt-1 text-gray-600 bg-white bg-gray-100 rounded shadow-md messages"
		>
			<ul class="space-y-3">
				{#each $center as message}
					<li class="p-3 border rounded flex">
						<p>{message}</p>
						<div class="mt-1 absolute right-2">
							<button
								class="px-2 rounded-sm flex justify-end"
								on:click={() => handleDismiss(message)}
							>
								<img src={Icon} alt="close" />
							</button>
						</div>
					</li>
				{/each}
			</ul>
			<div class="flex justify-end mt-3">
				<button class="px-2 text-sm rounded-sm" on:click={clearAll}>Clear All</button>
			</div>
		</div>
	{/if}
</template>

<style>
	/* unread message count */
	.badge {
		display: inline-block;
		position: absolute;
		top: -10px;
		background-color: #4285f4;
		color: #d7e6fd;
		right: auto;
		border-radius: 9999px;
		font-size: 12px;
		min-width: 18px;
		line-height: 18px;
		min-height: 18px;
		text-align: center;
	}
	/* width for message popup */
	.messages {
		min-width: 400px;
	}
</style>
