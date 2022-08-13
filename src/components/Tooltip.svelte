<script lang="ts">
	let text: string = '';
	let top: number = 100;
	let left: number = 100;

	function onMouseMove(event: MouseEvent) {
		let elem = document.elementFromPoint(event.pageX, event.pageY);
		if (!elem) return;
		do {
			text = getTooptipText(elem) ?? '';
			if (!text) elem = elem.parentElement;
		} while (elem && !text);
		if (!elem) return;
		const rect = elem.getBoundingClientRect();
		top = rect.top + rect.height;
		left = rect.left + 0.5 * rect.width;
	}

	function getTooptipText(element: Element): string | undefined {
		return element.attributes.getNamedItem('data-tooltip')?.value;
	}
</script>

<svelte:window on:mousemove={onMouseMove} />

<template>
	<div class="_tooltip" class:show={text} style="top: {top}px; left: {left}px;">
		<p>{text}</p>
	</div>
</template>

<style global lang="postcss">
	._tooltip {
		@apply fixed z-50 top-0 left-0
		flex justify-center w-0
		scale-0 origin-top transition-transform
		pointer-events-none;
		& > p {
			@apply bg-gray-900 p-2 pt-[.4rem] rounded shadow
			text-xs text-white text-center leading-none;
		}
		&.show {
			@apply scale-100;
		}
	}
</style>
