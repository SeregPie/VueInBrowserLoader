export default function(tag, html) {
	let element = document.createElement(tag);
	element.innerHTML = html;
	return element;
}
