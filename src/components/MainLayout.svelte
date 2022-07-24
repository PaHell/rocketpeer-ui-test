<script context="module">
</script>

<script lang="ts">
</script>

<template>
	<div class="main-layout">
		<slot/>
	</div>
</template>

<style global lang="postcss">
	.main-layout {
		@apply grid w-full h-full;
		grid-template-areas:
			"headerSidebar headerContent"
			"sidebar        content"
			"footerSidebar content";
		grid-template-rows: 4rem auto 4rem;
		grid-template-columns: 18rem auto;
		& > header,
		& > footer {
			@apply flex items-center
			relative shadow-lg;
		}
		& > header.sidebar {
			grid-area: headerSidebar;
			@apply bg-gray-700;
		}
		& > header:not(.sidebar) {
			grid-area: headerContent;
			@apply bg-gray-600;
		}
		& > aside {
			grid-area: sidebar;
			@apply bg-gray-700;
		}
		& > main {
			grid-area: content;
			@apply bg-gray-600;
		}
		& > footer.sidebar {
			grid-area: footerSidebar;
			@apply bg-gray-800;
		}
	}
</style>
