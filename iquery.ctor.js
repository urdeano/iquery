(function ( window ) {

var iQuery = window.iQuery,
    arr = [],
    push = arr.push,
    slice = arr.slice,
    
    div = document.createElement( 'div' ),
    
    rquickExpr = /^\s*<.+>\s*$/; 

var init = iQuery.fn.init = function ( selector ) {
   
    // 处理: I( '' ), I( null ), I( undefiend ) 等
    if ( !selector ) return this;
    
    // 处理: 字符串
    if ( typeof selector == 'string' ) {
        // 处理多种
        //  \s*<.+>\s*
        if ( rquickExpr.test( selector ) ) {
            // HTML 格式的字符串
            push.apply( this, iQuery.parseHTML( selector ) );
        } else {
            // 选择器字符串
            push.apply( this, iQuery.select( selector ) );
        }
        return this;
    }

    // 处理函数
    if ( typeof selector == 'function' ) {

    }

    // 处理 DOM 元素
    if ( selector.nodeType ) {
        this[ 0 ] = selector;
        this.length = 1;
        return this;
    }

    // 处理 iQuery 对象
    if ( selector.type === 'iQuery' ) {
        // return selector;
        // 推荐的处理办法是将 selector 中的所有元素加到 this 中
        push.apply( this, selector );
        return this;
    }

    if ( selector.length >= 0 ) {
        push.apply( this, selector );
    } else {
        this[ 0 ] = selector;
        this.length = 1;
    }
    return this;
};

init.prototype = iQuery.fn;



// iQuery.parseHTML = function ( htmlStr ) {
//     div = document.createElement( 'div' );
//     div.innerHTML = htmlStr; // 转换
//     // 要返回数组 
//     return [].slice.call( div.childNodes );
// };

iQuery.extend({
    parseHTML: function ( htmlStr ) {
        div.innerHTML = htmlStr; // 转换
        // 要返回数组 
        return slice.call( div.childNodes );
    }
});

})( window );
