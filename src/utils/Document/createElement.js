export default function(tag, html, attributes) {
	let element = document.createElement(tag);
	element.innerHTML = html;
	Object.assign(element, attributes);
	return element;
}
