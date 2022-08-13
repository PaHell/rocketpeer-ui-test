<script context="module">
	import Icon from './Icon.svelte';
	import Icons from '@src/icons';
</script>

<script lang="ts">
	export let user: App.User | undefined;
	export let square = false;
	export let padded = true;

	function getInitials(): string {
		if (!user?.name) return 'X';
		const split = user?.name.split(' ');
		let initials = split[0][0].toUpperCase();
		if (split.length > 1) initials += split[1][0].toUpperCase();
		else if (split[0].length > 1) initials += split[0][1].toLowerCase();
		return initials ?? '@@';
	}
</script>

<template>
	<div class="user-image" class:square class:padded>
		<div>
			{#if !user}
				<Icon name={Icons.USER} />
			{:else if user.img}
				<img src={user.img} alt="" />
			{:else}
				<p class="sec">{getInitials()}</p>
			{/if}
		</div>
	</div>
</template>

<style global lang="postcss">
	.user-image {
		& > * {
			@apply w-8 h-8;
		}
		& > div {
			@apply flex justify-center items-center
			overflow-hidden
			bg-gray-700 rounded-full;
			& > img {
				@apply w-auto h-full;
			}
			& > p {
				@apply text-center whitespace-nowrap
				text-tri leading-none
				mt-[1.5px];

				&:first-letter {
					@apply text-white;
				}
			}
		}
		&.square > div {
			@apply rounded-sm;
		}
		&.padded > div > img {
			@apply p-[2px];
		}
	}
</style>
