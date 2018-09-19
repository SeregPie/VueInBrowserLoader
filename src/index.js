import Document_createElement from '/utils/Document/createElement';
import Lang_localEval from '/utils/Lang/localEval';
import Object_hasOwn from '/utils/Object/hasOwn';
import Url_join from '/utils/Url/join';
import Url_normalize from '/utils/Url/normalize';
import Url_toAbsolute from '/utils/Url/toAbsolute';

import loadComponentContents from './loadComponentContents';
import normalizeComponentUrl from './normalizeComponentUrl';

let cachedComponents = {};

let VueInBrowserLoader = function(componentUrl) {
	componentUrl = normalizeComponentUrl(componentUrl);
	return function() {
		return (
			Object_hasOwn(cachedComponents, componentUrl)
				? cachedComponents[componentUrl]
				: cachedComponents[componentUrl] = loadComponentContents(componentUrl).then(([template, script, styles, /*scopedStyles*/]) => {
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
