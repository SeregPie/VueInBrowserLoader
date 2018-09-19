// refactor me

export default function(delimiter, path, ...otherPaths) {
	otherPaths.forEach(otherPath => {
		if (otherPath.startsWith(delimiter)) {
			otherPath = otherPath.slice(delimiter.length);
		}
		if (!path.endsWith(delimiter)) {
			path += delimiter;
		}
		path += otherPath;
	});
	return path;
}
