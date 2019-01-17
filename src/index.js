// js向下兼容
if (!global || !global._babelPolyfill) {
    require('babel-polyfill')
}

// import VConsole from 'vconsole'
// var vConsole = new VConsole();



import './css.scss';
import { isString, isFunction } from './lib/checkVariable.js'
import watcher from './lib/watcher.js'
import { createElementFromHTML } from './lib/tools.js'
import renderHtml from './lib/renderTreeHtml.js'




export default window.jSimplePagination = class jSimplePagination {
    constructor(id, config = {}) {
        this.$dom = id;
        this.config = config;

        if (isString(id)) {
            this.$dom = document.querySelector(id);
        }

        this.init();
        this.render();
    }

    init() {


        const { onChange, pageSize = 0, pageIndex = 1, pageTotal = 0, pageCount = 5 } = this.config;

        this.pageSize = pageSize;
        this.pageIndex = pageIndex;
        this.pageTotal = pageTotal;
        this.pageCount = pageCount;

        watcher(this, (k, n, o) => {
            if (k == 'pageSize' || k == 'pageIndex' || k == 'pageTotal' || k == 'pageCount') {
                this.render();
            }
            isFunction(onChange) && onChange.call(this, {
                pageSize: this.pageSize,
                pageIndex: this.pageIndex,
                pageTotal: this.pageTotal,
                pageCount: this.pageCount,
            })
        })



    }
    getConfig() {

        const { pageSize, pageIndex, pageTotal, pageCount } = this;

        const pageNumber = Math.floor(pageTotal / pageSize);

        return {
            pageSize,
            pageIndex,
            pageTotal,
            pageNumber,
            pageCount
        }
    }
    setSize(size) {
        this.size = size
    }
    setIndex(index) {
        this.index = index
    }
    setTotal(total) {
        this.total = total
    }

    render() {

        if (this.$container) {
            this.$container.remove();
        }

        const container = this.$container = createElementFromHTML('<div class="jSimplePagination clearfix"></div>');
        const {
            pageSize,
            pageIndex,
            pageTotal,
            pageNumber,
            pageCount
        } = this.getConfig();


        const self = this;

        renderHtml(container, [{
            html: `<div class="jSimplePagination-left">
            					共 ${pageTotal} 条
            			</div>`,
        }, {
            html: '<div class="jSimplePagination-right"></div>',
            child: [{
                html: `<span class="jSimplePagination-button jSimplePagination-button" ${pageIndex == 1?'desabled':''}><i class="icon-zuojiantou iconfont"></i></span>`,
                events: [{
                    type: 'click',
                    event() {
                        if (self.pageIndex != 1) {
                            self.pageIndex--;
                        }
                    }
                }]
            }, {
                html: `<ul class="jSimplePagination-pages"></ul>`,
                child: (() => {

                    const stepNbr = pageCount / 2;

                    let pageBts = [],
                        startIndex = Math.ceil(pageIndex - stepNbr),
                        endIndex = Math.floor(pageIndex + stepNbr);

                    function renderLi(text, i, type = 'push') {
                        pageBts[type]({
                            html: `<li class="jSimplePagination-button ${pageIndex==i?'jSimplePagination-active':''} ${text=='pre'?'jSimplePagination-preMore':''} ${text=='next'?'jSimplePagination-nextMore':''}">
                            					${text!='next'&&text!='pre'?text:`<i class="icon-gengduo iconfont"></i><i class="iconfont j-hover ${text=='next'?'icon-zuoshuangjiantou':'icon-youshuangjiantou'}"></i>`}
                            			</li>`,
                            events: [{
                                type: 'click',
                                event: function() {
                                    if (self.pageIndex != this) {
                                        self.pageIndex = this;
                                    }
                                }.bind(i)
                            }]
                        })
                    }


                    if (startIndex <= 0) {
                        startIndex = 1;
                        endIndex = pageCount;
                    }



                    if (endIndex > pageNumber || endIndex < pageCount) {
                        endIndex = pageNumber;
                        startIndex = endIndex - pageCount + 1;
                    }


                    for (var i = startIndex; i <= endIndex; i++) {
                        renderLi(i, i)
                    };


                    if (endIndex < pageNumber - 1) {
                        let nextPageIndex = Math.floor(endIndex + stepNbr / 2);
                        if (nextPageIndex > pageNumber) {
                            nextPageIndex = pageNumber;
                        }
                        renderLi('pre', nextPageIndex)
                    }

                    if (endIndex + 1 <= pageNumber) {
                        renderLi(pageNumber, pageNumber)
                    }

                    if (startIndex > 1 + 1) {
                        let prePageIndex = Math.floor(startIndex - stepNbr / 2);
                        if (prePageIndex <= 1) {
                            prePageIndex = 1;
                        }
                        renderLi('next', prePageIndex, 'unshift')
                    }

                    if (startIndex > 1) {
                        renderLi(1, 1, 'unshift');
                    }


                    return pageBts;

                })()
            }, {
                html: `<span class="jSimplePagination-button jSimplePagination-button" ${pageIndex == pageNumber?'desabled':''}><i class="icon-youjiantou iconfont"></i></span>`,
                events: [{
                    type: 'click',
                    event() {
                        if (self.pageIndex != pageNumber) {
                            self.pageIndex++;
                        }
                    }
                }]
            }]
        }])


        this.$dom.appendChild(container)

    }
}