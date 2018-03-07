import Path_join from 'x/src/Path/join';

import resolveNestedURL from './resolveNestedURL';
import VueInBrowserLoader from './VueInBrowserLoader';
import evaluateCode from './evaluateCode';

export default function(code, componentURL) {
	let module = {};
	let exports = {};
	module.exports = exports;
	evaluateCode(code, exports, {
		module,
		exports,
		__filename: componentURL,
		__dirname:  Path_join('/', componentURL, '..'),
		VueInBrowserLoader(url, ...args) {
			return VueInBrowserLoader(resolveNestedURL(url, componentURL), ...args);
		},
		require(module) {
			return window[module];
		},
	});
	return module.exports;
}
