import Path_join from '../Path/join';
import Url_pathDelimiter from './pathDelimiter';

export default function(...args) {
	return Path_join(Url_pathDelimiter, ...args);
}
