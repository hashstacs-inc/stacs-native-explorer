import common from './common'; // 全局国际化文件
import home from './home'; // 首页国际化文件
import address from './address'; // address详情国际化文件
import block from './block'; // block详情国际化文件
import tx from './tx'; // tx详情国际化文件

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
