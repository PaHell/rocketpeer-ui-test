import GUN, {
	type GunSchema,
	type IGunInstance,
	type IGunInstanceRoot,
	type IGunUserInstance
} from 'gun';
import 'gun/sea';
//import 'gun/axe';
import { user as userStore } from '@src/store';
import { goto } from '$app/navigation';

export default class Weapons {
	db: IGunInstance<Record<string, GunSchema>>;
	user: IGunUserInstance<
		any,
		any,
		Record<string, GunSchema>,
		IGunInstanceRoot<Record<string, GunSchema>, IGunInstance<Record<string, GunSchema>>>
	>;
	constructor() {
		this.db = new GUN<Record<string, GunSchema>>(['http://localhost:3000/gun']);
		this.user = this.db.user();
		this.user.recall({ sessionStorage: true });
		this.user.get('alias').on((v: string) => {
			userStore.set({ alias: v } as App.User);
		});
		this.db.on('auth', async (event) => {
			const alias: string = await this.user.get('alias');
			userStore.set({ alias } as App.User);
		});
	}
	login(username: string, password: string) {
		this.user.auth(username, password, ({ err }) => err && alert(err));
		goto('/home');
	}
	register(username: string, password: string) {
		this.user.create(username, password, ({ err }) => {
			if (err) alert(err);
			else this.login(username, password);
		});
	}
	signout() {
		this.user.leave();
		this.user = undefined;
		userStore.set(undefined);
	}
}
