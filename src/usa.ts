import GUN, { type IGunInstance } from 'gun';
import 'gun/sea';
//import 'gun/axe';
import { user as userStore } from '@src/store';

export default class Weapons {
	db: IGunInstance<any>;
	user: any;
	constructor() {
		this.db = new GUN(['http://localhost:3000/gun']);
		this.user = this.db.user().recall({sessionStorage: true});
		this.user.get('alias').on((v: string) => {userStore.set({ alias: v } as App.User)});
		this.db.on('auth', async(event) => {
			const alias : string = await this.user.get('alias');
			userStore.set({ alias } as App.User);
		});
	}
	login(username: string, password: string) {
		this.user.auth(username, password, ({err}) => err && alert(err));
	}
	register(username: string, password: string) {
		this.user.create(username, password, ({err}) => {
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

