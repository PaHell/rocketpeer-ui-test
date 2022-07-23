<script lang="ts">
	import Input from '@src/components/Input.svelte';
	import Button from '@src/components/Button.svelte';
	import Icons from '@src/icons';
	import { user } from '@src/store';
	import { add_classes } from 'svelte/internal';
	let serverName: string = '';
	const placeholder = () => {};
	const userName: string = `${$user?.alias}'s server`;

	let avatar, fileInput;
	const onFileSelected = (e) => {
		let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			avatar = e.target.result;
		};
	};
</script>

<template>
	<div class="flex-1 flex justify-center items-center mb-16">
		<div class="w-full max-w-xs">
			<div class="card w-96 bg-base-100 shadow-xl">
				<div class="card-body">
					<h1 class="text-2xl text-white">Create a Server</h1>

					<div>
						<h2>Upload Image</h2>

						<img
							class="w-16 h-16"
							src={avatar ? avatar : 'https://static.thenounproject.com/png/625182-200.png'}
							alt=""
							on:click={() => fileInput.click()}
						/>
						<div
							on:click={() => {
								fileInput.click();
							}}
						>
							Choose Image
						</div>
						<input
							style="display:none"
							type="file"
							accept=".jpg, .jpeg, .png"
							on:change={(e) => onFileSelected(e)}
							bind:this={fileInput}
						/>
					</div>

					<Input
						label="serverName"
						placeholder={userName}
						color="secondary"
						bordered
						bind:value={serverName}
					/>
					<div class="flex justify-end space-x-6">
						<Button
							on:click={placeholder}
							icon={Icons.CONTINUE}
							text="Next"
							color="primary"
							reverse
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
