<script context="module" lang="ts">
	import Input from '@src/components/Input.svelte';
	import Button from "@src/components/Button.svelte";
	import Icons from '@src/icons';
</script>

<script>
	let username = '';
	let password = '';
</script>

<template>
	<h1 class="text-2xl text-white">Login</h1>
	<Input
		label="Username"
		labelPosition={0}
		placeholder="Maurice"
		bind:value={username}
		focusOnMount />
	<Input
		label="Password"
		placeholder="konigliche_fuße"
		bind:value={password} />
	<div class="flex justify-end">
		<Button
			icon={Icons.CONTINUE}
			text="Login"
			color="primary"
			reverse
			/>
	</div>
</template>

<style lang="postcss">
</style>
