import Document_createElement from 'x/src/Document/createElement';
import Lang_localEval from 'x/src/Lang/localEval';
import Object_hasOwn from 'x/src/Object/hasOwn';
import Url_join from 'x/src/Url/join';
import Url_normalize from 'x/src/Url/normalize';
import Url_toAbsolute from 'x/src/Url/toAbsolute';

import normalizeComponentUrl from './normalizeComponentUrl';
import loadComponentContents from './loadComponentContents';

const cachedComponents = {};

let VueInBrowserLoader = function(componentUrl) {
	componentUrl = normalizeComponentUrl(componentUrl);
	return function() {
		return (
			Object_hasOwn(cachedComponents, componentUrl)
				? cachedComponents[componentUrl]
				: cachedComponents[componentUrl] = loadComponentContents(componentUrl).then(([template, script, styles, scopedStyles]) => {
					let options = {};
					if (script) {
						let exports = {};
						let module = {exports};
						Lang_localEval(script, exports, {
							module,
							exports,
							__filename: componentUrl,
							__dirname:  Url_normalize(Url_join(componentUrl, '..')),
							VueInBrowserLoader(url, ...args) {
								return VueInBrowserLoader(Url_toAbsolute(url, componentUrl), ...args);
							},
							require(module) {
								return window[module];
							},
						});
						Object.assign(options, module.exports);
					}
					if (template) {
						Object.assign(options, {template});
					}
					styles.forEach(style => {
						document.head.appendChild(Document_createElement('style', style));
					});
					return options;
				})
		);
	};
};

export default VueInBrowserLoader;
