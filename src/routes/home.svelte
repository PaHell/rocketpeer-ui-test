<script lang="ts">
	let activeContent: string = 'online';

	const handleContentChange = (content: string) => {
		activeContent = content;
	};
</script>

<template>
	<div>
		<div>
			<!-- add friends and inbox for pending invites -->
			<div class="flex p-2 justify-center items-center">
				<h2 class="text-xl m-2 p-2 font-bold">Friends</h2>

				<button
					class="btn btn-square btn-ghost m-2 p-1 w-auto {activeContent === 'online'
						? 'bg-blue-500 text-black'
						: ''}"
					on:click={() => handleContentChange('online')}>Online</button
				>
				<button
					class="btn btn-square btn-ghost m-2 p-1 w-auto {activeContent === 'all'
						? 'bg-blue-500 text-black'
						: ''}"
					on:click={() => handleContentChange('all')}>All</button
				>
				<button
					class="btn btn-square btn-ghost m-2 p-1 w-auto {activeContent === 'pending'
						? 'bg-blue-500 text-black'
						: ''}"
					on:click={() => handleContentChange('pending')}>Pending</button
				>
				<button
					class="btn btn-square btn-ghost m-2 p-1 w-auto {activeContent === 'add'
						? 'bg-blue-500 text-black'
						: ''}"
					on:click={() => handleContentChange('add')}>Add Friend</button
				>
			</div>
		</div>
		<div>
			<!-- search friends input -->
		</div>
		<div>
			<!-- who is online with status -->

			<!-- create component for "playerCard" -->
		</div>
	</div>
</template>
