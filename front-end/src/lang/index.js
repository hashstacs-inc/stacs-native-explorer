import common from './common'; // Global internationalization file
import home from './home'; // Home internationalization file
import address from './address'; // address internationalization file
import block from './block'; // block internationalization file
import tx from './tx'; // tx internationalization file

function merge(...modules) {
	let result = {}
	if (Array.isArray(modules)) {
		modules.forEach(md => {
			for (let lang in md) {
				result[lang] = Object.assign({}, result[lang], md[lang])
			}
		})
    }
	return result
}

export default merge(common, home, address, block, tx);
