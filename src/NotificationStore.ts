import { writable } from 'svelte/store';

const createStore = () => {
	// initialize store with empty list
	const { subscribe, set, update } = writable<string[]>([]);

	// mark messages as read by removing it from list
	const dismiss = (message: string) => update((messages) => messages.filter((m) => m !== message));

	// add message to list
	const add = (message: string) => update((messages) => [...messages, message]);

	return {
		subscribe,
		add,
		init: set,
		dismiss,
		clear: () => set([])
	};
};

const notifCenter = createStore();

export { notifCenter };
