/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	type User = {
		id: string;
		img?: string | undefined;
		name: string;
	};
	type Message = {
		content: string;
		user_id: string;
		_user?: App.User;
	};
	type Server = {
		id: string;
		name: string;
		img?: string;
	};
	namespace UI {
		type NavBarItem = {
			icon?: Icons;
			text: string;
			path: string;
		};
		type MainNavItem = {
			icon?: Icons;
			img?: string;
			text: string;
			path?: string;
			css?: string;
			onClick?: () => void;
		};
	}
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}

declare module '*.svg' {
	const content: any;
	export default content;
}

declare module '*.svg?component' {
	const content: any;
	export default content;
}

declare module '*.svg?src' {
	const content: string;
	export default content;
}

declare module '*.svg?url' {
	const content: string;
	export default content;
}
