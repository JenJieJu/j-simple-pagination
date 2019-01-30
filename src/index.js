// js向下兼容
if (!global || !global._babelPolyfill) {
    require('babel-polyfill')
}

import df from "./this.ts";
export default window.jSimplePagination = df;