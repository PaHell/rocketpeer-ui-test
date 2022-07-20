<script context="module" lang="ts">
	import { onMount } from 'svelte';
	import Input from '@src/components/Input.svelte';
	import Button from '@src/components/Button.svelte';
	import Icons from '@src/icons';
	//import GUN from 'gun';
	import Weapons from '@src/usa';

</script>

<script>
	let username = '';
	let password = '';
	const weapons = new Weapons();

	function login() {
		weapons.login(username, password);
	}

	function register() {
		weapons.register(username, password);
	}
</script>

<template>
	<h1 class="text-2xl text-white">Login</h1>
	<Input
		label="Username"
		labelPosition={0}
		placeholder="Maurice"
		color="primary"
		bind:value={username}
		bordered
		focusOnMount
	/>
	<Input
		label="Password"
		placeholder="konigliche_fuße"
		color="secondary"
		bordered
		bind:value={password}
	/>
	<div class="flex justify-end space-x-6">
		<Button on:click={login} icon={Icons.CONTINUE} text="Login" color="primary" reverse />
		<Button on:click={register} icon={Icons.CONTINUE} text="Register" color="secondary" reverse />
	</div>
</template>

<style lang="postcss">
</style>
