import Url_join from '/utils/Url/join';
import Url_normalize from '/utils/Url/normalize';

let extension = '.vue';

export default function(url) {
	return Url_normalize(
		url.endsWith(extension)
			? url
			: Url_join(url, 'index' + extension)
	);
}
