import { writable } from 'svelte/store';

export const user = (function () {
	const { subscribe, set } = writable<App.User | undefined>();
	return {
		subscribe,
		set
	};
})();
