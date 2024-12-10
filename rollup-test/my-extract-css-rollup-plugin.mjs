/*
 * @Date: 2024-11-25 14:28:21
 * @Description: description
 */
// 这个插件是将所有的css文件合并成一个
const extractArr = [];

export default function myExtractCssRollupPlugin(opts) {
    return {
        name: 'my-extract-css-rollup-plugin',
        transform(code, id) {
            // 找到对应的css后缀的文件，合并成一个文件
            if (!id.endsWith('.css')) return null;
            extractArr.push(code);
            return {
                code: 'export default "迪迦带给我光明"',
                map: { mappings: '' }
            }
        },
        generateBundle(options, bundle) {
            this.emitFile({
                fileName: opts.filename || 'han.css',
                type: 'asset',
                source: extractArr.join('\n/*光光666*/\n'),
            });
        }
    }
}