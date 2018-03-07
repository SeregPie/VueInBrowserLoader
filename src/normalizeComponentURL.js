import Path_join from 'x/src/Path/join';

const extension = '.vue';

export default function(url) {
	let link = document.createElement('a');
	if (url.endsWith(extension)) {
		link.href = url;
	} else {
		link.href = Path_join('/', url, 'index' + extension);
	}
	return link.href;
}
