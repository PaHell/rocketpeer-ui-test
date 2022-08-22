<script lang="ts" context="module">
	import { page } from '$app/stores';
	import { textChannels } from '@src/store';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
</script>

<script lang="ts">
	onMount(() => {
		let channels = $textChannels.filter((s) => s.server_id === $page.params.server_id);
		channels = channels.sort((c) => c.order);
		console.log(`/server/${$page.params.server_id}/${channels[0]?.id}`);
		goto(`/server/${$page.params.server_id}/${channels[0]?.id}`);
	});
</script>
