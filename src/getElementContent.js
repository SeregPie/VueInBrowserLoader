import resolveNestedURL from './resolveNestedURL';
import httpGet from './httpGet';

export default function(el, url) {
	if (el.hasAttribute('src')) {
		return httpGet(resolveNestedURL(el.getAttribute('src'), url));
	}
	return Promise.resolve(el.innerHTML);
}
