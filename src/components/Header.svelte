<script context="module">
	import { goto } from '$app/navigation';
	import { user } from '@src/store';
	import ProfilePicture from '@src/icons/account_circle.svg';
	import Icon from '@src/components/Icon.svelte';
	import Icons from '@src/icons';
	import NotificationCenter from '@src/components/NotificationCentre.svelte';
</script>

<script lang="ts">
	let navItems: [label: string, route: string][] = [
		['Home', '/home'],
		['Find', '/find'],
		['Create', '/create']
	];
	let authItems: [label: string, route: string][] = [
		['Login', '/auth/login'],
		['Register', '/auth/register']
	];
	let _user: App.User | undefined;
	_user = $user;
	user.subscribe((v) => (_user = v));
</script>

<template>
	<div class="navbar bg-base-100">
		<div class="flex-none">
			<button class="btn btn-square btn-ghost">
				<Icon name={Icons.HOME} />
			</button>
		</div>
		<div class="flex-1">
			{#each navItems as item}
				<a class="btn btn-ghost normal-case text-xl" on:click={() => goto(item[1])}>{item[0]}</a>
			{/each}
		</div>
		<div class="flex-none gap-2">
			{#if !!_user}
				<div class="form-control">
					<input type="text" placeholder="Search" class="input input-bordered" />
				</div>
				<div class="dropdown dropdown-end">
					<label tabindex="0" class="btn btn-ghost btn-circle avatar">
						<div class="w-10 rounded-full">
							<img src={ProfilePicture} />
						</div>
					</label>
					<ul
						tabindex="0"
						class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
					>
						<li>
							<a class="justify-between">
								{_user.alias}
								<span class="badge">New</span>
							</a>
						</li>
						<li><a>Settings</a></li>
						<li><a>Logout</a></li>
					</ul>
				</div>
			{:else}
				{#each authItems as item}
					<button class="btn btn-ghost normal-case text-xl" on:click={() => goto(item[1])}
						>{item[0]}</button
					>
				{/each}
			{/if}
		</div>
		<div class="flex-none mr-2">
			<div class="dropdown dropdown-end">
				<label tabindex="0" class="btn btn-square btn-ghost">
					<Icon name={Icons.MORE} />
				</label>
				<ul
					tabindex="0"
					class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
				>
					<li><a>Imprint</a></li>
					<li><a>Legal</a></li>
					<li><a>Privacy Policy</a></li>
				</ul>
			</div>
		</div>
		<div>
			<div class=" mr-8 mt-1">
				<NotificationCenter />
			</div>
		</div>
	</div>
</template>

<style lang="postcss">
</style>
