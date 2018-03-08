import Url_join from 'x/src/Url/join';
import Url_normalize from 'x/src/Url/normalize';

const extension = '.vue';

export default function(url) {
	return Url_normalize(
		url.endsWith(extension)
			? url
			: Url_join(url, 'index' + extension)
	);
}
