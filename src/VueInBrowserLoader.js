import Object_hasOwn from 'x/src/Object/hasOwn';

import normalizeComponentURL from './normalizeComponentURL';
import loadComponent from './loadComponent';

const cachedComponents = {};

export default function(url) {
	url = normalizeComponentURL(url);
	return function() {
		if (Object_hasOwn(cachedComponents, url)) {
			return cachedComponents[url];
		}
		return(cachedComponents[url] = loadComponent(url));
	};
}
