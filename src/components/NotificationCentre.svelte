<script lang="ts">
	import Icon from '@src/icons/notification_close.svg';
	let show: Boolean = false;
	import { onMount } from 'svelte';

	// all the Notification Center Stuff happening here :}
	export let center: any;

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

	onMount(() => {});
</script>

<template>
	<div class="absolute right-2 p-3 mt-20 text-gray-600 bg-gray-100 rounded shadow-md messages z-50">
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
