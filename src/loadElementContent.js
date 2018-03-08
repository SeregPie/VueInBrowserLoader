import Http_get from 'x/src/Http/get';
import Url_toAbsolute from 'x/src/Url/toAbsolute';

export default function(el, url) {
	return (
		el.hasAttribute('src')
			? Http_get(Url_toAbsolute(el.getAttribute('src'), url))
			: Promise.resolve(el.innerHTML)
	);
}
