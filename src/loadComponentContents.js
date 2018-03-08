import Document_createElement from 'x/src/Document/createElement';
import Http_get from 'x/src/Http/get';

import loadElementContent from './loadElementContent';

export default function(url) {
	return Http_get(url).then(content => {
		let sections = Array.from(Document_createElement('div', content).children);
		let templateSections = [];
		let scriptSections = [];
		let styleSections = [];
		sections.forEach(section => {
			switch (section.tagName) {
				case 'TEMPLATE':
					templateSections.push(section);
					break;
				case 'SCRIPT':
					scriptSections.push(section);
					break;
				case 'STYLE':
					styleSections.push(section);
					break;
			}
		});
		let promisedTemplate;
		if (templateSections.length > 0) {
			let templateSection = templateSections.shift();
			promisedTemplate = loadElementContent(templateSection, url);
		}
		let promisedScript;
		if (scriptSections.length > 0) {
			let scriptSection = scriptSections.shift();
			promisedScript = loadElementContent(scriptSection, url);
		}
		let promisedStyles = [];
		let promisedScopedStyles = [];
		styleSections.forEach(styleSection => {
			if (styleSection.hasAttribute('scoped')) {
				promisedScopedStyles.push(loadElementContent(styleSection, url));
			} else {
				promisedStyles.push(loadElementContent(styleSection, url));
			}
		});
		return Promise.all([
			promisedTemplate,
			promisedScript,
			Promise.all(promisedStyles),
			Promise.all(promisedScopedStyles),
		]);
	});
}
