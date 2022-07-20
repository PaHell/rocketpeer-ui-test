<script lang="ts">
	import Button from '@src/components/Button.svelte';
	import Icons from '@src/icons';
	const searchLobby = () => {};
</script>

<template>
	<div class="flex-1 flex justify-center items-center mb-16">
		<div class="w-full max-w-xs">
			<div class="card w-96 bg-base-100 shadow-xl">
				<div class="card-body">
					<div class="form-control">
						<h1 class="my-6 mx-2 text-2xl">Search Lobby</h1>
						<label class="input-group">
							<span class="w-auto">LobbyCode</span>
							<input type="text" placeholder="XY32A9B" class="input input-bordered w-full" />
						</label>
					</div>
					<div class=" flex-1 flex justify-end items-center mt-6">
						<Button
							on:click={searchLobby}
							icon={Icons.CONTINUE}
							text="Search"
							color="primary"
							reverse
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
