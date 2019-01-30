// import VConsole from 'vconsole' var vConsole = new VConsole();

import './css.scss';
import { isString, isFunction } from './lib/checkVariable.js'
import watcher from './lib/watcher.js'
import { createElementFromHTML } from './lib/tools.js'
import renderHtml from './lib/renderTreeHtml.js'
/**
 *  构建实体
 * @export
 * @class jSimplePagination
 */
export default class jSimplePagination {

    $dom: any;
    config: {
        onChange: Function,
        pageSize: number,
        pageIndex: number,
        dataTotal: number,
        showCount: number
    };
    pageSize: any;
    pageIndex: any;
    dataTotal: any;
    showCount: any;
    size: any;
    index: any;
    total: any;
    $container: any;

    constructor(id: any, config = { onChange: Function, pageSize: 0, pageIndex: 0, dataTotal: 0, showCount: 0 }) {
        this.$dom = id;
        this.config = config;

        if (isString(id)) {
            this.$dom = document.querySelector(id);
        }

        this.init();
        this.render();
    }

    init() {

        const {
            onChange,
            pageSize = 0,
            pageIndex = 1,
            dataTotal = 0,
            showCount = 5
        } = this.config;

        this.pageSize = pageSize;
        this.pageIndex = pageIndex;
        this.dataTotal = dataTotal;
        this.showCount = showCount;

        watcher(this, (k: string, n: any, o: any) => {
            if (k == 'pageSize' || k == 'pageIndex' || k == 'dataTotal' || k == 'showCount') {
                this.render();
            }
            isFunction(onChange) && onChange.call(this, {
                pageSize: this.pageSize,
                pageIndex: this.pageIndex,
                dataTotal: this.dataTotal,
                showCount: this.showCount
            })
        })

    }
    getConfig() {

        const { pageSize, pageIndex, dataTotal, showCount } = this;

        const pageCount = Math.ceil(dataTotal / pageSize);

        return {
            pageSize,
            pageIndex: pageIndex < pageCount
                ? pageIndex
                : pageCount,
            dataTotal,
            pageCount,
            showCount: showCount < pageCount
                ? showCount
                : pageCount
        }
    }
    setSize(size: any) {
        this.size = size
    }
    setIndex(index: any) {
        this.index = index
    }
    setTotal(total: any) {
        this.total = total
    }

    render() {

        if (this.$container) {
            this
                .$container
                .remove();
        }

        const container = this.$container = createElementFromHTML('<div class="jSimplePagination clearfix"></div>');
        const { pageSize, pageIndex, dataTotal, pageCount, showCount } = this.getConfig();

        const self = this;

        renderHtml(container, [
            {
                html: `<div class="jSimplePagination-left">
                                共 ${dataTotal} 条
                        </div>`
            }, {
                html: '<div class="jSimplePagination-right"></div>',
                child: [
                    {
                        html: `<span class="jSimplePagination-button jSimplePagination-button" ${pageIndex == 1 ? 'desabled' : ''}><i class="icon-zuojiantou iconfont"></i></span>`,
                        events: [
                            {
                                type: 'click',
                                event() {
                                    if (self.pageIndex != 1) {
                                        self.pageIndex--;
                                    }
                                }
                            }
                        ]
                    }, {
                        html: `<ul class="jSimplePagination-pages"></ul>`,
                        child: (() => {

                            const stepNbr = showCount / 2;

                            let pageBts: any[] = [],
                                startIndex = Math.ceil(pageIndex - stepNbr) + 1,
                                endIndex = Math.ceil(pageIndex + stepNbr);

                            function renderLi(text: string | number, i: number, type: any = 'push') {
                                pageBts[type]({
                                    html: `<li class="jSimplePagination-button 
                                        ${
                                        pageIndex == i
                                            ? 'jSimplePagination-active'
                                            : ''
                                        } 
                                        ${
                                        text == 'pre'
                                            ? 'jSimplePagination-preMore'
                                            : ''
                                        } 
                                        ${
                                        text == 'next'
                                            ? 'jSimplePagination-nextMore'
                                            : ''
                                        }
                                        ">
                                            ${
                                        text != 'next' && text != 'pre'
                                            ? text
                                            : `<i class="icon-gengduo iconfont"></i><i class="iconfont j-hover 
                                                ${
                                            text == 'next'
                                                ? 'icon-zuoshuangjiantou'
                                                : 'icon-youshuangjiantou'
                                            }
                                                "></i>`
                                        }
                                        </li>`,
                                    events: [
                                        {
                                            type: 'click',
                                            event: function (i: number) {
                                                if (self.pageIndex != i) {
                                                    self.pageIndex = i;
                                                }
                                            }.bind(null, i)
                                        }
                                    ]
                                })
                            }

                            if (startIndex <= 0) {
                                startIndex = 1;
                                endIndex = showCount;
                            }

                            if (endIndex > pageCount || endIndex < showCount) {
                                endIndex = pageCount;
                                startIndex = endIndex - showCount + 1;
                            }

                            for (var i = startIndex; i <= endIndex; i++) {
                                renderLi(i, i)
                            };

                            if (endIndex < pageCount - 1) {
                                let nextPageIndex = Math.floor(endIndex + stepNbr / 2);
                                if (nextPageIndex > pageCount) {
                                    nextPageIndex = pageCount;
                                }
                                renderLi('pre', nextPageIndex)
                            }

                            if (endIndex + 1 <= pageCount) {
                                renderLi(pageCount, pageCount)
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
                        html: `<span class="jSimplePagination-button jSimplePagination-button" 
                            ${
                            pageIndex == pageCount
                                ? 'desabled'
                                : ''
                            }
                            ><i class="icon-youjiantou iconfont"></i></span>`,
                        events: [
                            {
                                type: 'click',
                                event() {
                                    if (self.pageIndex != pageCount) {
                                        self.pageIndex++;
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        ], {})

        this
            .$dom
            .appendChild(container)

    }
}