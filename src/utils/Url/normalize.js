import Document_createElement from '../Document/createElement';

export default function(href) {
	return Document_createElement('a', null, {href}).href;
}
