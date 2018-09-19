import Http_get from '/utils/Http/get';
import Url_toAbsolute from '/utils/Url/toAbsolute';

export default function(el, url) {
	return (
		el.hasAttribute('src')
			? Http_get(Url_toAbsolute(el.getAttribute('src'), url))
			: Promise.resolve(el.innerHTML)
	);
}
