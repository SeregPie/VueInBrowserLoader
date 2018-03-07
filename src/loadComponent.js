import httpGet from './httpGet';
import createElement from './createElement';
import getElementContent from './getElementContent';
import evaluateComponentOptions from './evaluateComponentOptions';

export default function(componentURL) {
	return httpGet(componentURL).then(component => {
		let componentWrapper = createElement('div', component);
		let sections = Array.from(componentWrapper.children);
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
			promisedTemplate = getElementContent(templateSection, componentURL);
		}
		let promisedOptions;
		if (scriptSections.length > 0) {
			let scriptSection = scriptSections.shift();
			promisedOptions = getElementContent(scriptSection, componentURL)
				.then(content => evaluateComponentOptions(content, componentURL));
		}
		let promisedStyles = [];
		let promisedScopedStyles = [];
		styleSections.forEach(styleSection => {
			if (styleSection.hasAttribute('scoped')) {
				promisedScopedStyles.push(getElementContent(styleSection, componentURL));
			} else {
				promisedStyles.push(getElementContent(styleSection, componentURL));
			}
		});
		return Promise
			.all([
				promisedOptions,
				promisedTemplate,
				Promise.all(promisedStyles),
				Promise.all(promisedScopedStyles),
			])
			.then(([options = {}, template, styles, scopedStyles]) => {
				if (template) {
					options.template = template;
				}
				return options;
			});
	});
}
