import Path_join from 'x/src/Path/join';

export default function(nestedURL, currentURL) {
	if (nestedURL.startsWith('/')) {
		return nestedURL;
	}
	return Path_join('/', currentURL, '..', nestedURL);
}
