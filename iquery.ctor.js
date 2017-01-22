(function (window) {

    var iQuery = window.iQuery,
        arr = [],
        push = arr.push,
        slice = arr.slice,

        div = document.createElement('div'),

        rquickExpr = /^\s*<.+>\s*$/;

    var init = iQuery.fn.init = function (selector) {

        // 处理: I( '' ), I( null ), I( undefiend ) 等
        if (!selector) return this;

        // 处理: 字符串
        if (typeof selector == 'string') {
            // 处理多种
            //  \s*<.+>\s*
            if (rquickExpr.test(selector)) {
                // HTML 格式的字符串
                push.apply(this, iQuery.parseHTML(selector));
            } else {
                // 选择器字符串
                push.apply(this, iQuery.select(selector));
            }
            return this;
        }

        // 处理函数
        if (typeof selector == 'function') {

        }

        // 处理 DOM 元素
        if (selector.nodeType) {

        }

        // 处理 iQuery 对象
        if (selector.type === 'iQuery') {

        }
        //处理数组和伪数组
        if (selector.length >= 0) {
            push.apply(this, selector);
        } else {
            this[0] = selector;
            this.length = 1;
        }
        return this; 
    };

    var init = iQuery.fn.init = function (selector){
        //空
        if (!selector) {
            return this;
        }
        //字符串
        else if(typeof selector =="string"){
            //html格式字符串
            if(rquickExpr.test(selector)){
                push.apply(this,iQuery.parseHTML(selector));
            }
            //选择器
            else{
                push.apply(this, iQuery.select(selector));
            }
            return this;
        }
        // DOM元素
        else if (selector.nodeType) {
            this[ 0 ] = selector;
            this.length = 1;
            return this;
        }
        //iQuery对象
        else if(selector.type=="iQuery"){
            push.apply(this, selector);
            return this;
        }
        //数组
        else if(selector.length>=0){
            push.apply(this,selector);
            return this;
        }
        //其他
        else {
            this[0]=selector;
            return this;
        }

    }


    init.prototype = iQuery.fn;






})(window);