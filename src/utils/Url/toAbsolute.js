import Url_join from './join';
import Url_pathDelimiter from './pathDelimiter';

export default function(relativeUrl, baseUrl) {
	return (
		relativeUrl.startsWith(Url_pathDelimiter)
			? relativeUrl
			: Url_join(baseUrl, '..', relativeUrl)
	);
}
