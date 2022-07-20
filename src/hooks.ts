import cookie from 'cookie';
import { v4 as uuid } from '@lukeed/uuid';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	event.locals.userid = cookies['userid'] || crypto.randomUUID();

	const response = await resolve(event);

	if (!cookies['userid']) {
		// if this is the first time the user has visited this app,
		// set a cookie so that we recognise them when they return
		response.headers.set(
			'set-cookie',
			cookie.serialize('userid', event.locals.userid, {
				path: '/',
				httpOnly: true
			})
		);
	}

	return response;
};

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(event) {
	return event.locals.user
	  ? {
		  user: {
			// only include properties needed client-side —
			// exclude anything else attached to the user
			// like access tokens etc
			name: event.locals.user.name,
			email: event.locals.user.email,
			avatar: event.locals.user.avatar
		  }
		}
	  : {};
  }

/** @type {import('@sveltejs/kit').ExternalFetch} */
export async function externalFetch(request) {
	if (request.url.startsWith('https://api.yourapp.com/')) {
	  // clone the original request, but change the URL
	  request = new Request(
		request.url.replace('https://api.yourapp.com/', 'http://localhost:9999/'),
		request
	  );
	}
   
	return fetch(request);
  }