<script lang="ts">
	import Button from '@src/components/Button.svelte';
	import Icons from '@src/icons';
	const searchUser = () => {};
</script>

<template>
	<div class="flex-1 flex justify-center items-center mb-16">
		<div class="w-full max-w-xs">
			<div class="card w-96 bg-base-100 shadow-xl">
				<div class="card-body">
					<div class="form-control">
						<h1 class="my-6 mx-2 text-2xl">Search User</h1>
						<label class="input-group">
							<span>Username</span>
							<input type="text" placeholder="Maurice#31111" class="input input-bordered w-full" />
						</label>
					</div>
					<div class=" flex-1 flex justify-end items-center mt-6">
						<Button
							on:click={searchUser}
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
